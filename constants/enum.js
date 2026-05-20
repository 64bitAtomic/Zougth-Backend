// ANIME 
const ANIME_TYPE = ['TV', 'OVA', 'ONA', 'Movie', 'Special'];
const ANIME_WATCH_STATUS = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Planned'];
const ANIME_SORT_FIELDS = ['animeName', 'createdAt', 'updatedAt', 'watchStatus', 'type'];

// Movie
const MOVIE_WATCH_STATUS = ['Watched', 'Watchlist', 'Dropped'];
const MOVIE_SORT_FIELDS = ['movieName', 'createdAt', 'releaseYear', 'watchStatus', 'language'];

// Web Series
const SERIES_WATCH_STATUS = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Planned'];
const SERIES_SORT_FIELDS = ['seriesName', 'createdAt', 'releaseYear', 'watchStatus', 'language'];

const SORT_ORDER = ['asc', 'desc'];

module.exports = { ANIME_TYPE, ANIME_WATCH_STATUS, ANIME_SORT_FIELDS, SORT_ORDER, MOVIE_WATCH_STATUS, MOVIE_SORT_FIELDS, SERIES_WATCH_STATUS, SERIES_SORT_FIELDS };