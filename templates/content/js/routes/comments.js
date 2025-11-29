const express = require('express');
const router = express.Router();
const { getComments, createComment, approveComment, deleteComment } = require('../controllers/commentController');

router.get('/post/:postId', getComments);
router.post('/post/:postId', createComment);
router.put('/:id/approve', approveComment);
router.delete('/:id', deleteComment);

module.exports = router;
