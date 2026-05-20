const { ANIME_TYPE, ANIME_WATCH_STATUS, ANIME_SORT_FIELDS, SORT_ORDER } = require('../constants/enum');

const validateAddAnime = (data) => {
    const errors = [];
    const { animeName, type, watchStatus, totalEpisodes, totalSeasons, genres, animeImg } = data;

    if (!animeName || animeName.trim() === '') {
        errors.push('Anime name is required');
    } else if (animeName.trim().length > 200) {
        errors.push('Anime name too long (max 200 characters)');
    }

    if (!type) {
        errors.push('Type is required');
    } else if (!ANIME_TYPE.includes(type)) {
        errors.push(`Type must be one of: ${ANIME_TYPE.join(', ')}`);
    }

    if (watchStatus && !ANIME_WATCH_STATUS.includes(watchStatus)) {
        errors.push(`Watch status must be one of: ${ANIME_WATCH_STATUS.join(', ')}`);
    }

    if (totalEpisodes !== undefined && totalEpisodes !== null) {
        if (!Number.isInteger(Number(totalEpisodes)) || Number(totalEpisodes) < 0) {
            errors.push('Total episodes must be a positive number');
        }
    }

    if (totalSeasons !== undefined && totalSeasons !== null) {
        if (!Number.isInteger(Number(totalSeasons)) || Number(totalSeasons) < 0) {
            errors.push('Total seasons must be a positive number');
        }
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) {
            errors.push('Genres must be an array');
        } else if (genres.some(g => typeof g !== 'string')) {
            errors.push('Each genre must be a string');
        }
    }

    if (animeImg !== undefined && animeImg !== '') {
        try { new URL(animeImg); } catch { errors.push('Anime image must be a valid URL'); }
    }

    return errors;
};

const validateUpdateAnime = (data) => {
    const errors = [];
    const { animeName, type, watchStatus, totalEpisodes, totalSeasons, genres, animeImg } = data;

    if (animeName !== undefined) {
        if (animeName.trim() === '') errors.push('Anime name cannot be empty');
        else if (animeName.trim().length > 200) errors.push('Anime name too long (max 200 characters)');
    }

    if (type !== undefined && !ANIME_TYPE.includes(type)) {
        errors.push(`Type must be one of: ${ANIME_TYPE.join(', ')}`);
    }

    if (watchStatus !== undefined && !ANIME_WATCH_STATUS.includes(watchStatus)) {
        errors.push(`Watch status must be one of: ${ANIME_WATCH_STATUS.join(', ')}`);
    }

    if (totalEpisodes !== undefined && totalEpisodes !== null) {
        if (!Number.isInteger(Number(totalEpisodes)) || Number(totalEpisodes) < 0) {
            errors.push('Total episodes must be a positive number');
        }
    }

    if (totalSeasons !== undefined && totalSeasons !== null) {
        if (!Number.isInteger(Number(totalSeasons)) || Number(totalSeasons) < 0) {
            errors.push('Total seasons must be a positive number');
        }
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) errors.push('Genres must be an array');
        else if (genres.some(g => typeof g !== 'string')) errors.push('Each genre must be a string');
    }

    if (animeImg !== undefined && animeImg !== '') {
        try { new URL(animeImg); } catch { errors.push('Anime image must be a valid URL'); }
    }

    return errors;
};

const validateGetAnime = (query) => {
    const errors = [];
    const { page, limit, watchStatus, type, sortBy, order } = query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
        errors.push('Page must be a positive number');
    }

    if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 50)) {
        errors.push('Limit must be between 1 and 50');
    }

    if (watchStatus !== undefined && !ANIME_WATCH_STATUS.includes(watchStatus)) {
        errors.push('Invalid watch status');
    }

    if (type !== undefined && !ANIME_TYPE.includes(type)) {
        errors.push('Invalid anime type');
    }

    if (sortBy !== undefined && !ANIME_SORT_FIELDS.includes(sortBy)) {
        errors.push(`Sort field must be one of: ${ANIME_SORT_FIELDS.join(', ')}`);
    }

    if (order !== undefined && !SORT_ORDER.includes(order)) {
        errors.push('Order must be asc or desc');
    }

    return errors;
};

module.exports = { validateAddAnime, validateUpdateAnime, validateGetAnime };