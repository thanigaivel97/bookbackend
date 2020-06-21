const books = require('../models/book');
const user = require('../models/user');
const book = require('../models/book');


exports.getbooks = (req, res, next) => {
    books.find().then(books => {
        res.status(200).json({ books: books, message: "succesfully loaded" });
    }).catch(err => {
        console.log(err);
    })
}

exports.createbooks = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    let createrofbook;
    const book = new books({
        title: title,
        description: description,
        price: price,
        author: req.userId
    });
    books.save().then(book => {
        return user.findById(req.userId)
    }).then(userone => {
        createrofbook = userone;
        userone.booksrelated.push(book);
        return userone.save();
    }).then(usero => {
        res.status(200).json({
            message: "sucesfully created",
            userId: createrofbook._id,
            book: book
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.updatebook = (req, res, next) => {
    const bookid = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    books.findById(bookid).then(book => {
        if (book.author.toString !== req.userId) {
            res.status(401).json({ message: "not authorized" });
        }
        book.title = title;
        book.description = description;
        book.price = price;
        book.image = image;
        return book.save();

    }).then(book => {
        res.status(200).json({ message: "updated !!", book: book })
    }).catch(err => {
        console.log(err);
    })
}

exports.delete = (req, res, next) => {
    const bookid = req.params.id;
    book.findByIdAndRemove(bookid).then(book => {
        return user.findById(req.userId);
    }).then(user => {
        user.booksrelated.pull(bookid);
        return user.save();
    }).then(user => {
        res.status(200).json({ message: "successfully deleted" });
    }).catch(err => {
        console.log(err);
    })
}