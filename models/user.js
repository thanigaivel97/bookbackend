const mongoose = require('mongoose');

const schema = mongoose.Schema;

const User = new schema({
    name: {
        type: String,
        required: true
    },
    authorpseudonym: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    booksrelated: [{
        type: schema.Types.ObjectId,
        ref: 'Books'
    }],
});

module.exports = mongoose.model('User', User);