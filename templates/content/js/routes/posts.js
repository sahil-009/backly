const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', createPost);
router.put('/:slug', updatePost);
router.delete('/:slug', deletePost);

module.exports = router;
