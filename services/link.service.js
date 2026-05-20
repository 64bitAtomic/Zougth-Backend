const Link = require('../model/linkModel');

const addLinkService = async (data, userId) => {
    const link = await Link.create({
        ...data,
        title: data.title.trim(),
        url: data.url.trim(),
        createdBy: userId,
    });
    return link;
};

const getAllLinksService = async (userId, query) => {
    const {
        page = 1,
        limit = 20,
        search,
        category,
        sortBy = 'createdAt',
        order = 'desc',
    } = query;

    const filter = { createdBy: userId };

    if (category) filter.category = { $regex: category.trim(), $options: 'i' };
    if (search) {
        filter.$or = [
            { title: { $regex: search.trim(), $options: 'i' } },
            { description: { $regex: search.trim(), $options: 'i' } },
            { url: { $regex: search.trim(), $options: 'i' } },
        ];
    }

    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [links, total] = await Promise.all([
        Link.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .select('-__v'),
        Link.countDocuments(filter),
    ]);

    return {
        links,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
            hasNextPage: Number(page) < Math.ceil(total / Number(limit)),
            hasPrevPage: Number(page) > 1,
        },
    };
};

const getLinkByIdService = async (linkId, userId) => {
    return await Link.findOne({ _id: linkId, createdBy: userId }).select('-__v');
};

const updateLinkService = async (linkId, userId, data) => {
    return await Link.findOneAndUpdate(
        { _id: linkId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    ).select('-__v');
};

const deleteLinkService = async (linkId, userId) => {
    return await Link.findOneAndDelete({ _id: linkId, createdBy: userId });
};

// user ke saare unique categories lao — frontend filter ke liye
const getLinkCategoriesService = async (userId) => {
    return await Link.distinct('category', { createdBy: userId });
};

module.exports = {
    addLinkService,
    getAllLinksService,
    getLinkByIdService,
    updateLinkService,
    deleteLinkService,
    getLinkCategoriesService,
};