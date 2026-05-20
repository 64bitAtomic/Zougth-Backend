const Series = require('../model/seriesModel');

const addSeriesService = async (data, userId) => {
    const series = await Series.create({
        ...data,
        seriesName: data.seriesName.trim(),
        createdBy: userId,
    });
    return series;
};

const getAllSeriesService = async (userId, query) => {
    const {
        page = 1,
        limit = 12,
        watchStatus,
        search,
        sortBy = 'createdAt',
        order = 'desc',
        language,
        genres,
    } = query;

    const filter = { createdBy: userId };

    if (watchStatus) filter.watchStatus = watchStatus;
    if (language) filter.language = { $regex: language.trim(), $options: 'i' };
    if (genres) filter.genres = { $in: genres.split(',').map(g => g.trim()) };
    if (search) filter.seriesName = { $regex: search.trim(), $options: 'i' };

    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [series, total] = await Promise.all([
        Series.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .select('-__v'),
        Series.countDocuments(filter),
    ]);

    return {
        series,
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

const getSeriesByIdService = async (seriesId, userId) => {
    return await Series.findOne({ _id: seriesId, createdBy: userId }).select('-__v');
};

const updateSeriesService = async (seriesId, userId, data) => {
    return await Series.findOneAndUpdate(
        { _id: seriesId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    ).select('-__v');
};

const updateSeriesStatusService = async (seriesId, userId, watchStatus) => {
    return await Series.findOneAndUpdate(
        { _id: seriesId, createdBy: userId },
        { $set: { watchStatus } },
        { new: true }
    ).select('-__v');
};

const deleteSeriesService = async (seriesId, userId) => {
    return await Series.findOneAndDelete({ _id: seriesId, createdBy: userId });
};

module.exports = {
    addSeriesService,
    getAllSeriesService,
    getSeriesByIdService,
    updateSeriesService,
    updateSeriesStatusService,
    deleteSeriesService,
};