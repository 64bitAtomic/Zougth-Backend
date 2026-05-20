const Anime = require('../model/animeModel');
const Movie = require('../model/movieModel');
const Series = require('../model/seriesModel');
const Link = require('../model/linkModel');
const Code = require('../model/codeModel');

const getDashboardService = async (userId) => {
    const [
        animeCount, movieCount, seriesCount, linkCount, codeCount,
        recentAnime, recentMovies, recentSeries, recentLinks, recentCodes,
    ] = await Promise.all([
        Anime.countDocuments({ createdBy: userId }),
        Movie.countDocuments({ createdBy: userId }),
        Series.countDocuments({ createdBy: userId }),
        Link.countDocuments({ createdBy: userId }),
        Code.countDocuments({ createdBy: userId }),
        Anime.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(3).select('animeName watchStatus animeImg type'),
        Movie.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(3).select('movieName watchStatus movieImg releaseYear'),
        Series.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(3).select('seriesName watchStatus seriesImg releaseYear'),
        Link.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(3).select('title url category'),
        Code.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(3).select('title value platform category'),
    ]);

    return {
        stats: {
            anime: animeCount,
            movies: movieCount,
            series: seriesCount,
            links: linkCount,
            codes: codeCount,
            total: animeCount + movieCount + seriesCount + linkCount + codeCount,
        },
        recent: {
            anime: recentAnime,
            movies: recentMovies,
            series: recentSeries,
            links: recentLinks,
            codes: recentCodes,
        },
    };
};

module.exports = { getDashboardService };