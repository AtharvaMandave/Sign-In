const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true, // Ensure the token field is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
        expires: 86400, // Token document will be removed after 1 day (TTL index)
    },
});

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);
