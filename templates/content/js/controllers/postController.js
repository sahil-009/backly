const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
    try {
        const { category, tag, search, published, page = 1, limit = 10 } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (tag) filter.tags = tag;
        if (search) filter.$text = { $search: search };
        if (published !== undefined) filter.published = published === 'true';

        const skip = (page - 1) * limit;
        const posts = await Post.find(filter)
            .populate('author', 'name email')
            .populate('category')
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Post.countDocuments(filter);
        res.json({ success: true, data: { posts, total, page: Number(page), totalPages: Math.ceil(total / limit) } });
    } catch (error) {
        next(error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
            .populate('author', 'name email')
            .populate('category');
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        post.views += 1;
        await post.save();

        res.json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create({ ...req.body, author: req.user.id });
        res.status(201).json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, runValidators: true });
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        res.json({ success: true, data: { post } });
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        next(error);
    }
};
