const {
    addSeriesService,
    getAllSeriesService,
    getSeriesByIdService,
    updateSeriesService,
    updateSeriesStatusService,
    deleteSeriesService,
} = require('../services/series.service');

const { validateAddSeries, validateUpdateSeries, validateGetSeries } = require('../validators/series.validator');
const { SERIES_WATCH_STATUS } = require('../constants/enum');

const addSeries = async (req, res) => {
    const errors = validateAddSeries(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const series = await addSeriesService(req.body, req.userId);
        return res.status(201).json({ message: 'Series added successfully', series });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllSeries = async (req, res) => {
    const errors = validateGetSeries(req.query);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const result = await getAllSeriesService(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSeriesById = async (req, res) => {
    try {
        const series = await getSeriesByIdService(req.params.id, req.userId);
        if (!series) return res.status(404).json({ message: 'Series not found' });
        return res.status(200).json({ series });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSeries = async (req, res) => {
    const errors = validateUpdateSeries(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const series = await updateSeriesService(req.params.id, req.userId, req.body);
        if (!series) return res.status(404).json({ message: 'Series not found' });
        return res.status(200).json({ message: 'Series updated successfully', series });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSeriesStatus = async (req, res) => {
    const { watchStatus } = req.body;
    if (!watchStatus) return res.status(400).json({ message: 'Watch status is required' });
    if (!SERIES_WATCH_STATUS.includes(watchStatus)) {
        return res.status(400).json({ message: `Watch status must be one of: ${SERIES_WATCH_STATUS.join(', ')}` });
    }
    try {
        const series = await updateSeriesStatusService(req.params.id, req.userId, watchStatus);
        if (!series) return res.status(404).json({ message: 'Series not found' });
        return res.status(200).json({ message: 'Watch status updated successfully', series });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteSeries = async (req, res) => {
    try {
        const series = await deleteSeriesService(req.params.id, req.userId);
        if (!series) return res.status(404).json({ message: 'Series not found' });
        return res.status(200).json({ message: 'Series deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addSeries, getAllSeries, getSeriesById, updateSeries, updateSeriesStatus, deleteSeries };