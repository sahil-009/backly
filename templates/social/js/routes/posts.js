const express = require('express');
const router = express.Router();
const { getFeed, createPost, getPost, deletePost, likePost } = require('../controllers/postController');

router.get('/feed', getFeed);
router.post('/', createPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);

module.exports = router;
