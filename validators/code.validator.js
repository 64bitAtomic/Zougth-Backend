const { SORT_ORDER } = require('../constants/enum');

const CODE_SORT_FIELDS = ['title', 'createdAt', 'category', 'platform'];

const validateAddCode = (data) => {
    const errors = [];
    const { title, value, category, platform } = data;

    if (!title || title.trim() === '') {
        errors.push('Title is required');
    } else if (title.trim().length > 200) {
        errors.push('Title too long (max 200 characters)');
    }

    if (!value || value.trim() === '') {
        errors.push('Code/ID value is required');
    } else if (value.trim().length > 1000) {
        errors.push('Value too long (max 1000 characters)');
    }

    if (category !== undefined && category.trim().length > 50) {
        errors.push('Category too long (max 50 characters)');
    }

    if (platform !== undefined && platform.trim().length > 100) {
        errors.push('Platform too long (max 100 characters)');
    }

    return errors;
};

const validateUpdateCode = (data) => {
    const errors = [];
    const { title, value, category, platform } = data;

    if (title !== undefined) {
        if (title.trim() === '') errors.push('Title cannot be empty');
        else if (title.trim().length > 200) errors.push('Title too long (max 200 characters)');
    }

    if (value !== undefined) {
        if (value.trim() === '') errors.push('Value cannot be empty');
        else if (value.trim().length > 1000) errors.push('Value too long (max 1000 characters)');
    }

    if (category !== undefined && category.trim().length > 50) {
        errors.push('Category too long (max 50 characters)');
    }

    if (platform !== undefined && platform.trim().length > 100) {
        errors.push('Platform too long (max 100 characters)');
    }

    return errors;
};

const validateGetCodes = (query) => {
    const errors = [];
    const { page, limit, sortBy, order } = query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1))
        errors.push('Page must be a positive number');

    if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 50))
        errors.push('Limit must be between 1 and 50');

    if (sortBy !== undefined && !CODE_SORT_FIELDS.includes(sortBy))
        errors.push(`Sort field must be one of: ${CODE_SORT_FIELDS.join(', ')}`);

    if (order !== undefined && !SORT_ORDER.includes(order))
        errors.push('Order must be asc or desc');

    return errors;
};

module.exports = { validateAddCode, validateUpdateCode, validateGetCodes };