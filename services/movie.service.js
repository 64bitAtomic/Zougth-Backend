const Movie = require('../model/movieModel');

const addMovieService = async (data, userId) => {
    const movie = await Movie.create({
        ...data,
        movieName: data.movieName.trim(),
        createdBy: userId,
    });
    return movie;
};

const getAllMoviesService = async (userId, query) => {
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
    if (search) filter.movieName = { $regex: search.trim(), $options: 'i' };

    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [movies, total] = await Promise.all([
        Movie.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .select('-__v'),
        Movie.countDocuments(filter),
    ]);

    return {
        movies,
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

const getMovieByIdService = async (movieId, userId) => {
    return await Movie.findOne({ _id: movieId, createdBy: userId }).select('-__v');
};

const updateMovieService = async (movieId, userId, data) => {
    return await Movie.findOneAndUpdate(
        { _id: movieId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    ).select('-__v');
};

const updateMovieStatusService = async (movieId, userId, watchStatus) => {
    return await Movie.findOneAndUpdate(
        { _id: movieId, createdBy: userId },
        { $set: { watchStatus } },
        { new: true }
    ).select('-__v');
};

const deleteMovieService = async (movieId, userId) => {
    return await Movie.findOneAndDelete({ _id: movieId, createdBy: userId });
};

module.exports = {
    addMovieService,
    getAllMoviesService,
    getMovieByIdService,
    updateMovieService,
    updateMovieStatusService,
    deleteMovieService,
};