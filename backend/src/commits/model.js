const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['none', 'read', 'later'],
        default: 'none',
    },
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Commit', commitSchema);

