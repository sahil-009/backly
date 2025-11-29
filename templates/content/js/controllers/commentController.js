const Comment = require('../models/Comment');

exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.postId, approved: true })
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: { comments } });
    } catch (error) {
        next(error);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({
            post: req.params.postId,
            author: req.user.id,
            content: req.body.content
        });
        res.status(201).json({ success: true, data: { comment } });
    } catch (error) {
        next(error);
    }
};

exports.approveComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.json({ success: true, data: { comment } });
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.json({ success: true, message: 'Comment deleted' });
    } catch (error) {
        next(error);
    }
};
