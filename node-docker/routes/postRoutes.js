const express = require('express');

const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

//localhost:3000/
router
  .route('/')
  .get(protect, postController.getAllPosts)
  //when user hits this post endpoint we gonna run our middleware function
  //middleware function is going to verify that if user is logged in call the next method (createPost)
  .post(protect, postController.createPost);

router
  .route('/:id')
  .get(protect, postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
