const { mongoose } = require('../utils/exportRequires');

module.exports = mongoose.model('refresh', new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true,}));