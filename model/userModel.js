const { mongoose } = require('../utils/exportRequires');

module.exports = mongoose.model('User', new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashPassword: {
        type: String,
        required: true,
    }
}, { timestamps: true, }));