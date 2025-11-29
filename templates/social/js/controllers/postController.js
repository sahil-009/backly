const Post = require('../models/Post');

exports.getFeed = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Post.countDocuments();
        res.json({ success: true, data: { posts, total, page: Number(page), totalPages: Math.ceil(total / limit) } });
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create({ ...req.body, author: req.user.id });
        await post.populate('author', 'name');
        res.status(201).json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        res.json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        await post.deleteOne();
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        next(error);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        const likeIndex = post.likes.indexOf(req.user.id);
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
            post.likesCount -= 1;
        } else {
            post.likes.push(req.user.id);
            post.likesCount += 1;
        }

        await post.save();
        res.json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};
