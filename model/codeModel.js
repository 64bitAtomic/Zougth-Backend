const { mongoose } = require('../utils/exportRequires');

module.exports = mongoose.model('Code', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    value: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        default: 'General',
        index: true,
    },
    platform: {
        type: String,
        trim: true,
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true }));