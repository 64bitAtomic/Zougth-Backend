const { mongoose } = require('../utils/exportRequires');

module.exports = mongoose.model('Link', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: null,
    },
    category: {
        type: String,
        trim: true,
        default: 'General',
        index: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true }));