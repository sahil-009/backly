const Follow = require('../models/Follow');

exports.followUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (userId === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
        }

        const existingFollow = await Follow.findOne({ follower: req.user.id, following: userId });
        if (existingFollow) {
            return res.status(400).json({ success: false, message: 'Already following' });
        }

        const follow = await Follow.create({ follower: req.user.id, following: userId });
        res.status(201).json({ success: true, data: { follow } });
    } catch (error) {
        next(error);
    }
};

exports.unfollowUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const follow = await Follow.findOneAndDelete({ follower: req.user.id, following: userId });
        if (!follow) {
            return res.status(404).json({ success: false, message: 'Not following this user' });
        }
        res.json({ success: true, message: 'Unfollowed successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getFollowers = async (req, res, next) => {
    try {
        const followers = await Follow.find({ following: req.params.userId })
            .populate('follower', 'name')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: { followers, count: followers.length } });
    } catch (error) {
        next(error);
    }
};

exports.getFollowing = async (req, res, next) => {
    try {
        const following = await Follow.find({ follower: req.params.userId })
            .populate('following', 'name')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: { following, count: following.length } });
    } catch (error) {
        next(error);
    }
};
