const { SERIES_SORT_FIELDS, SERIES_WATCH_STATUS, SORT_ORDER } = require("../constants/enum");

const validateAddSeries = (data) => {
    const errors = [];
    const { seriesName, totalEpisodes, totalSeasons, releaseYear, language, genres, seriesImg } = data;

    if (!seriesName || seriesName.trim() === '') {
        errors.push('Series name is required');
    } else if (seriesName.trim().length > 200) {
        errors.push('Series name too long (max 200 characters)');
    }

    if (totalEpisodes !== undefined && totalEpisodes !== null) {
        if (!Number.isInteger(Number(totalEpisodes)) || Number(totalEpisodes) < 0)
            errors.push('Total episodes must be a positive number');
    }

    if (totalSeasons !== undefined && totalSeasons !== null) {
        if (!Number.isInteger(Number(totalSeasons)) || Number(totalSeasons) < 0)
            errors.push('Total seasons must be a positive number');
    }

    if (releaseYear !== undefined && releaseYear !== null) {
        const year = Number(releaseYear);
        if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 5)
            errors.push('Invalid release year');
    }

    if (language !== undefined && typeof language !== 'string') {
        errors.push('Language must be a string');
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) errors.push('Genres must be an array');
        else if (genres.some(g => typeof g !== 'string')) errors.push('Each genre must be a string');
    }

    if (seriesImg !== undefined && seriesImg !== '') {
        try { new URL(seriesImg); } catch { errors.push('Series image must be a valid URL'); }
    }

    return errors;
};

const validateUpdateSeries = (data) => {
    const errors = [];
    const { seriesName, totalEpisodes, totalSeasons, releaseYear, language, genres, seriesImg } = data;

    if (seriesName !== undefined) {
        if (seriesName.trim() === '') errors.push('Series name cannot be empty');
        else if (seriesName.trim().length > 200) errors.push('Series name too long (max 200 characters)');
    }

    if (totalEpisodes !== undefined && totalEpisodes !== null) {
        if (!Number.isInteger(Number(totalEpisodes)) || Number(totalEpisodes) < 0)
            errors.push('Total episodes must be a positive number');
    }

    if (totalSeasons !== undefined && totalSeasons !== null) {
        if (!Number.isInteger(Number(totalSeasons)) || Number(totalSeasons) < 0)
            errors.push('Total seasons must be a positive number');
    }

    if (releaseYear !== undefined && releaseYear !== null) {
        const year = Number(releaseYear);
        if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 5)
            errors.push('Invalid release year');
    }

    if (language !== undefined && typeof language !== 'string') {
        errors.push('Language must be a string');
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) errors.push('Genres must be an array');
        else if (genres.some(g => typeof g !== 'string')) errors.push('Each genre must be a string');
    }

    if (seriesImg !== undefined && seriesImg !== '') {
        try { new URL(seriesImg); } catch { errors.push('Series image must be a valid URL'); }
    }

    return errors;
};

const validateGetSeries = (query) => {
    const errors = [];
    const { page, limit, watchStatus, sortBy, order } = query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1))
        errors.push('Page must be a positive number');

    if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 50))
        errors.push('Limit must be between 1 and 50');

    if (watchStatus !== undefined && !SERIES_WATCH_STATUS.includes(watchStatus))
        errors.push('Invalid watch status');

    if (sortBy !== undefined && !SERIES_SORT_FIELDS.includes(sortBy))
        errors.push(`Sort field must be one of: ${SERIES_SORT_FIELDS.join(', ')}`);

    if (order !== undefined && !SORT_ORDER.includes(order))
        errors.push('Order must be asc or desc');

    return errors;
};

module.exports = { validateAddSeries, validateUpdateSeries, validateGetSeries };