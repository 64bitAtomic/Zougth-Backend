const Code = require('../model/codeModel');

const addCodeService = async (data, userId) => {
    const code = await Code.create({
        ...data,
        title: data.title.trim(),
        value: data.value.trim(),
        createdBy: userId,
    });
    return code;
};

const getAllCodesService = async (userId, query) => {
    const {
        page = 1,
        limit = 20,
        search,
        category,
        platform,
        sortBy = 'createdAt',
        order = 'desc',
    } = query;

    const filter = { createdBy: userId };

    if (category) filter.category = { $regex: category.trim(), $options: 'i' };
    if (platform) filter.platform = { $regex: platform.trim(), $options: 'i' };
    if (search) {
        filter.$or = [
            { title: { $regex: search.trim(), $options: 'i' } },
            { value: { $regex: search.trim(), $options: 'i' } },
            { platform: { $regex: search.trim(), $options: 'i' } },
        ];
    }

    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [codes, total] = await Promise.all([
        Code.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .select('-__v'),
        Code.countDocuments(filter),
    ]);

    return {
        codes,
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

const getCodeByIdService = async (codeId, userId) => {
    return await Code.findOne({ _id: codeId, createdBy: userId }).select('-__v');
};

const updateCodeService = async (codeId, userId, data) => {
    return await Code.findOneAndUpdate(
        { _id: codeId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    ).select('-__v');
};

const deleteCodeService = async (codeId, userId) => {
    return await Code.findOneAndDelete({ _id: codeId, createdBy: userId });
};

const getCodeCategoriesService = async (userId) => {
    return await Code.distinct('category', { createdBy: userId });
};

module.exports = {
    addCodeService,
    getAllCodesService,
    getCodeByIdService,
    updateCodeService,
    deleteCodeService,
    getCodeCategoriesService,
};