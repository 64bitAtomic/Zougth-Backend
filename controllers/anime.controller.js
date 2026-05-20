const { addAnimeService, getAllAnimeService, getAnimeByIdService, updateAnimeService, deleteAnimeService, updateAnimeStatusService } = require('../services/anime.service');
const { validateAddAnime, validateUpdateAnime, validateGetAnime } = require('../validators/anime.validator');
const { ANIME_WATCH_STATUS } = require('../constants/enum');

// POST /anime
const addAnime = async (req, res) => {
    const errors = validateAddAnime(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors[0], errors });
    }
    try {
        const anime = await addAnimeService(req.body, req.userId);
        return res.status(201).json({ message: 'Anime added successfully', anime });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET /anime
const getAllAnime = async (req, res) => {
    const errors = validateGetAnime(req.query);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors[0], errors });
    }
    try {
        const result = await getAllAnimeService(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET /anime/:id
const getAnimeById = async (req, res) => {
    try {
        const anime = await getAnimeByIdService(req.params.id, req.userId);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
        return res.status(200).json({ anime });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PATCH /anime/:id
const updateAnime = async (req, res) => {
    const errors = validateUpdateAnime(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors[0], errors });
    }
    try {
        const anime = await updateAnimeService(req.params.id, req.userId, req.body);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
        return res.status(200).json({ message: 'Anime updated successfully', anime });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PATCH /anime/:id/status
const updateAnimeStatus = async (req, res) => {
    const { watchStatus } = req.body;
    if (!watchStatus) {
        return res.status(400).json({ message: 'Watch status is required' });
    }
    if (!ANIME_WATCH_STATUS.includes(watchStatus)) {
        return res.status(400).json({ message: `Watch status must be one of: ${ANIME_WATCH_STATUS.join(', ')}` });
    }
    try {
        const anime = await updateAnimeStatusService(req.params.id, req.userId, watchStatus);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
        return res.status(200).json({ message: 'Watch status updated successfully', anime });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE /anime/:id
const deleteAnime = async (req, res) => {
    try {
        const anime = await deleteAnimeService(req.params.id, req.userId);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
        return res.status(200).json({ message: 'Anime deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addAnime,
    getAllAnime,
    getAnimeById,
    updateAnime,
    updateAnimeStatus,
    deleteAnime,
};