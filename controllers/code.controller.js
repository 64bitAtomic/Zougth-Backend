const {
    addCodeService,
    getAllCodesService,
    getCodeByIdService,
    updateCodeService,
    deleteCodeService,
    getCodeCategoriesService,
} = require('../services/code.service');

const { validateAddCode, validateUpdateCode, validateGetCodes } = require('../validators/code.validator');

const addCode = async (req, res) => {
    const errors = validateAddCode(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const code = await addCodeService(req.body, req.userId);
        return res.status(201).json({ message: 'Code added successfully', code });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllCodes = async (req, res) => {
    const errors = validateGetCodes(req.query);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const result = await getAllCodesService(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCodeById = async (req, res) => {
    try {
        const code = await getCodeByIdService(req.params.id, req.userId);
        if (!code) return res.status(404).json({ message: 'Code not found' });
        return res.status(200).json({ code });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCode = async (req, res) => {
    const errors = validateUpdateCode(req.body);
    if (errors.length > 0) return res.status(400).json({ message: errors[0], errors });
    try {
        const code = await updateCodeService(req.params.id, req.userId, req.body);
        if (!code) return res.status(404).json({ message: 'Code not found' });
        return res.status(200).json({ message: 'Code updated successfully', code });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCode = async (req, res) => {
    try {
        const code = await deleteCodeService(req.params.id, req.userId);
        if (!code) return res.status(404).json({ message: 'Code not found' });
        return res.status(200).json({ message: 'Code deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCodeCategories = async (req, res) => {
    try {
        const categories = await getCodeCategoriesService(req.userId);
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addCode, getAllCodes, getCodeById, updateCode, deleteCode, getCodeCategories };