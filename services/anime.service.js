const Anime = require('../model/animeModel');

const addAnimeService = async (data, userId) => {
    const anime = await Anime.create({
        ...data,
        animeName: data.animeName.trim(),
        createdBy: userId,
    });
    return anime;
};

const getAllAnimeService = async (userId, query) => {
    const {
        page = 1,
        limit = 10,
        watchStatus,
        type,
        search,
        sortBy = 'createdAt',
        order = 'desc',
        genres,
    } = query;

    const filter = { createdBy: userId };

    // filters
    if (watchStatus) filter.watchStatus = watchStatus;
    if (type) filter.type = type;
    if (genres) filter.genres = { $in: genres.split(',').map(g => g.trim()) };

    // search
    if (search) {
        filter.animeName = { $regex: search.trim(), $options: 'i' };
    }

    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [animes, total] = await Promise.all([
        Anime.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .select('-__v'),
        Anime.countDocuments(filter),
    ]);

    return {
        animes,
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

const getAnimeByIdService = async (animeId, userId) => {
    const anime = await Anime.findOne({ _id: animeId, createdBy: userId }).select('-__v');
    return anime;
};

const updateAnimeService = async (animeId, userId, data) => {
    const anime = await Anime.findOneAndUpdate(
        { _id: animeId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    ).select('-__v');
    return anime;
};

const deleteAnimeService = async (animeId, userId) => {
    const anime = await Anime.findOneAndDelete({ _id: animeId, createdBy: userId });
    return anime;
};

const updateAnimeStatusService = async (animeId, userId, watchStatus) => {
    const anime = await Anime.findOneAndUpdate(
        { _id: animeId, createdBy: userId },
        { $set: { watchStatus } },
        { new: true }
    ).select('-__v');
    return anime;
};

module.exports = {
    addAnimeService,
    getAllAnimeService,
    getAnimeByIdService,
    updateAnimeService,
    deleteAnimeService,
    updateAnimeStatusService
};