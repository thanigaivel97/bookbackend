const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookmodel = new schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps });

module.exports = mongoose.model('Book', bookmodel);