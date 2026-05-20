const {
    addMovieService,
    getAllMoviesService,
    getMovieByIdService,
    updateMovieService,
    updateMovieStatusService,
    deleteMovieService,
} = require('../services/movie.service');

const { validateAddMovie, validateUpdateMovie, validateGetMovie } = require('../validators/movie.validator');
const { MOVIE_WATCH_STATUS } = require('../constants/enum');

const addMovie = async (req, res) => {
    const errors = validateAddMovie(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const movie = await addMovieService(req.body, req.userId);
        return res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllMovies = async (req, res) => {
    const errors = validateGetMovie(req.query);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const result = await getAllMoviesService(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await getMovieByIdService(req.params.id, req.userId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        return res.status(200).json({ movie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
    const errors = validateUpdateMovie(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const movie = await updateMovieService(req.params.id, req.userId, req.body);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        return res.status(200).json({ message: 'Movie updated successfully', movie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateMovieStatus = async (req, res) => {
    const { watchStatus } = req.body;
    if (!watchStatus) return res.status(400).json({ message: 'Watch status is required' });
    if (!MOVIE_WATCH_STATUS.includes(watchStatus)) {
        return res.status(400).json({ message: `Watch status must be one of: ${MOVIE_WATCH_STATUS.join(', ')}` });
    }
    try {
        const movie = await updateMovieStatusService(req.params.id, req.userId, watchStatus);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        return res.status(200).json({ message: 'Watch status updated successfully', movie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await deleteMovieService(req.params.id, req.userId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addMovie, getAllMovies, getMovieById, updateMovie, updateMovieStatus, deleteMovie };