const { mongoose } = require('../utils/exportRequires');
const { MOVIE_SORT_FIELDS, MOVIE_WATCH_STATUS } = require('../constants/enum');
module.exports = mongoose.model('Movie', new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    releaseYear: {
        type: Number,
        min: 1888,
        max: new Date().getFullYear() + 5,
        default: null,
    },
    language: {
        type: String,
        trim: true,
        default: null,
    },
    genres: {
        type: [String],
        default: [],
    },
    movieImg: {
        type: String,
        default: "https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder1-1024x1024-570x321.png",
    },
    watchStatus: {
        type: String,
        enum: MOVIE_WATCH_STATUS,
        default: 'Watchlist',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true }));