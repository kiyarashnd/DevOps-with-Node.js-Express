const express = require('express');
const multer = require('multer');
const minioClient = require('../services/minioClient');
const protect = require('../middleware/authMiddleware');
const config = require('../config/config');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }
    
    const fileName = `${Date.now()}-${req.file.originalname}`;
    
    await minioClient.putObject(
      config.MINIO_BUCKET,
      fileName,
      req.file.buffer,
      req.file.size,
      req.file.mimetype
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        fileName,
        fileUrl: `/api/v1/files/${fileName}`
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: 'fail',
      message: 'Error uploading file'
    });
  }
});

router.get('/:fileName', async (req, res) => {
  try {
    const fileStream = await minioClient.getObject(config.MINIO_BUCKET, req.params.fileName);
    
    fileStream.on('error', (err) => {
      console.error(err);
      return res.status(404).json({
        status: 'fail',
        message: 'File not found'
      });
    });
    
    res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName}`);
    
    fileStream.pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: 'fail',
      message: 'Error retrieving file'
    });
  }
});

module.exports = router;
