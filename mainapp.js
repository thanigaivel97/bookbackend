const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const feedbook = require('./routes/feedbook');
const authroute = require('./routes/auth');

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feedbook', feedbook);
app.use('/auth', authroute);


mongoose.connect('mongodb+srv://hello:hello@cluster0-acgtj.mongodb.net/hello?retryWrites=true&w=majority').then(res => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
});