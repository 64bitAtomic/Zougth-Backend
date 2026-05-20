const {
    addLinkService,
    getAllLinksService,
    getLinkByIdService,
    updateLinkService,
    deleteLinkService,
    getLinkCategoriesService,
} = require('../services/link.service');

const { validateAddLink, validateUpdateLink, validateGetLinks } = require('../validators/link.validator');

const addLink = async (req, res) => {
    const errors = validateAddLink(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const link = await addLinkService(req.body, req.userId);
        return res.status(201).json({ message: 'Link added successfully', link });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllLinks = async (req, res) => {
    const errors = validateGetLinks(req.query);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const result = await getAllLinksService(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getLinkById = async (req, res) => {
    try {
        const link = await getLinkByIdService(req.params.id, req.userId);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        return res.status(200).json({ link });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateLink = async (req, res) => {
    const errors = validateUpdateLink(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const link = await updateLinkService(req.params.id, req.userId, req.body);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        return res.status(200).json({ message: 'Link updated successfully', link });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteLink = async (req, res) => {
    try {
        const link = await deleteLinkService(req.params.id, req.userId);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        return res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getLinkCategories = async (req, res) => {
    try {
        const categories = await getLinkCategoriesService(req.userId);
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addLink, getAllLinks, getLinkById, updateLink, deleteLink, getLinkCategories };