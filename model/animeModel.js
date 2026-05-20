const { mongoose } = require('../utils/exportRequires');
const { ANIME_TYPE, ANIME_WATCH_STATUS } = require('../constants/enum');

module.exports = mongoose.model('Anime', new mongoose.Schema({
    animeName: { type: String, required: true, trim: true, index: true },
    totalEpisodes: { type: Number, min: 0, default: null },
    totalSeasons: { type: Number, min: 0, default: null },
    genres: { type: [String], default: [] },
    animeImg: { type: String, default: "https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder1-1024x1024-570x321.png"},
    type: { type: String, enum: ANIME_TYPE, required: true },
    watchStatus: { type: String, enum: ANIME_WATCH_STATUS, default: 'Planned' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
}, { timestamps: true }));