const { mongoose } = require('../utils/exportRequires');
const { SERIES_WATCH_STATUS } = require('../constants/enum');

module.exports = mongoose.model('Series', new mongoose.Schema({
    seriesName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    totalEpisodes: {
        type: Number,
        min: 0,
        default: null,
    },
    totalSeasons: {
        type: Number,
        min: 0,
        default: null,
    },
    releaseYear: {
        type: Number,
        min: 1900,
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
    seriesImg: {
        type: String,
        default: "https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder1-1024x1024-570x321.png",
    },
    watchStatus: {
        type: String,
        enum: SERIES_WATCH_STATUS,
        default: 'Planned',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true }));
