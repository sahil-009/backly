const slugify = require('slugify');

exports.generateSlug = (text) => {
    return slugify(text, { lower: true, strict: true });
};

exports.paginate = (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return { skip, limit: parseInt(limit) };
};
