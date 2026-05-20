const LINK_SORT_FIELDS = ['title', 'createdAt', 'category'];
const { SORT_ORDER } = require('../constants/enum');

const validateAddLink = (data) => {
    const errors = [];
    const { title, url, description, category } = data;

    if (!title || title.trim() === '') {
        errors.push('Title is required');
    } else if (title.trim().length > 200) {
        errors.push('Title too long (max 200 characters)');
    }

    if (!url || url.trim() === '') {
        errors.push('URL is required');
    } else {
        try { new URL(url); } catch { errors.push('Invalid URL format'); }
    }

    if (description !== undefined && description.length > 500) {
        errors.push('Description too long (max 500 characters)');
    }

    if (category !== undefined && category.trim().length > 50) {
        errors.push('Category too long (max 50 characters)');
    }

    return errors;
};

const validateUpdateLink = (data) => {
    const errors = [];
    const { title, url, description, category } = data;

    if (title !== undefined) {
        if (title.trim() === '') errors.push('Title cannot be empty');
        else if (title.trim().length > 200) errors.push('Title too long (max 200 characters)');
    }

    if (url !== undefined) {
        try { new URL(url); } catch { errors.push('Invalid URL format'); }
    }

    if (description !== undefined && description.length > 500) {
        errors.push('Description too long (max 500 characters)');
    }

    if (category !== undefined && category.trim().length > 50) {
        errors.push('Category too long (max 50 characters)');
    }

    return errors;
};

const validateGetLinks = (query) => {
    const errors = [];
    const { page, limit, sortBy, order } = query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1))
        errors.push('Page must be a positive number');

    if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 50))
        errors.push('Limit must be between 1 and 50');

    if (sortBy !== undefined && !LINK_SORT_FIELDS.includes(sortBy))
        errors.push(`Sort field must be one of: ${LINK_SORT_FIELDS.join(', ')}`);

    if (order !== undefined && !SORT_ORDER.includes(order))
        errors.push('Order must be asc or desc');

    return errors;
};

module.exports = { validateAddLink, validateUpdateLink, validateGetLinks };