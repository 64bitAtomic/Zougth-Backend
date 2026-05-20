const { MOVIE_WATCH_STATUS, MOVIE_SORT_FIELDS, SORT_ORDER } = require('../constants/enum');

const validateAddMovie = (data) => {
    const errors = [];
    const { movieName, releaseYear, language, genres, movieImg } = data;

    if (!movieName || movieName.trim() === '') {
        errors.push('Movie name is required');
    } else if (movieName.trim().length > 200) {
        errors.push('Movie name too long (max 200 characters)');
    }

    if (releaseYear !== undefined && releaseYear !== null) {
        const year = Number(releaseYear);
        if (!Number.isInteger(year) || year < 1888 || year > new Date().getFullYear() + 5) {
            errors.push('Invalid release year');
        }
    }

    if (language !== undefined && typeof language !== 'string') {
        errors.push('Language must be a string');
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) errors.push('Genres must be an array');
        else if (genres.some(g => typeof g !== 'string')) errors.push('Each genre must be a string');
    }

    if (movieImg !== undefined && movieImg !== '') {
        try { new URL(movieImg); } catch { errors.push('Movie image must be a valid URL'); }
    }

    return errors;
};

const validateUpdateMovie = (data) => {
    const errors = [];
    const { movieName, releaseYear, language, genres, movieImg } = data;

    if (movieName !== undefined) {
        if (movieName.trim() === '') errors.push('Movie name cannot be empty');
        else if (movieName.trim().length > 200) errors.push('Movie name too long (max 200 characters)');
    }

    if (releaseYear !== undefined && releaseYear !== null) {
        const year = Number(releaseYear);
        if (!Number.isInteger(year) || year < 1888 || year > new Date().getFullYear() + 5) {
            errors.push('Invalid release year');
        }
    }

    if (language !== undefined && typeof language !== 'string') {
        errors.push('Language must be a string');
    }

    if (genres !== undefined) {
        if (!Array.isArray(genres)) errors.push('Genres must be an array');
        else if (genres.some(g => typeof g !== 'string')) errors.push('Each genre must be a string');
    }

    if (movieImg !== undefined && movieImg !== '') {
        try { new URL(movieImg); } catch { errors.push('Movie image must be a valid URL'); }
    }

    return errors;
};

const validateGetMovie = (query) => {
    const errors = [];
    const { page, limit, watchStatus, sortBy, order } = query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
        errors.push('Page must be a positive number');
    }

    if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 50)) {
        errors.push('Limit must be between 1 and 50');
    }

    if (watchStatus !== undefined && !MOVIE_WATCH_STATUS.includes(watchStatus)) {
        errors.push('Invalid watch status');
    }

    if (sortBy !== undefined && !MOVIE_SORT_FIELDS.includes(sortBy)) {
        errors.push(`Sort field must be one of: ${MOVIE_SORT_FIELDS.join(', ')}`);
    }

    if (order !== undefined && !SORT_ORDER.includes(order)) {
        errors.push('Order must be asc or desc');
    }

    return errors;
};

module.exports = { validateAddMovie, validateUpdateMovie, validateGetMovie };