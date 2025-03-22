const Minio = require('minio');
const config = require('../config/config');

const minioClient = new Minio.Client({
  endPoint: config.MINIO_ENDPOINT,
  port: parseInt(config.MINIO_PORT),
  useSSL: config.MINIO_USE_SSL,
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
  pathStyle: true
});

const initializeMinio = async () => {
  try {
    const bucketExists = await minioClient.bucketExists(config.MINIO_BUCKET);
    if (!bucketExists) {
      await minioClient.makeBucket(config.MINIO_BUCKET, 'us-east-1');
      console.log(`Created "${config.MINIO_BUCKET}" bucket in MinIO`);
    }
    console.log('Successfully connected to MinIO');
  } catch (err) {
    console.error('Error initializing MinIO:', err);
    setTimeout(initializeMinio, 5000);
  }
};

initializeMinio();

module.exports = minioClient;
