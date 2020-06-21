const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.signup = (req, res, next) => {
    const name = req.body.name;
    const authorpseudonym = req.body.authorpseudonym;
    const emailid = req.body.emailid;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashpwd => {
        const newuser = new user({
            name: name,
            authorpseudonym: authorpseudonym,
            emailid: emailid,
            password: password,
        });
        return newuser.save();
    }).then(user => {
        res.status(200).json({ message: "user created ", userid: user._id });

    }).catch(err => {
        console.log(err);
    })

}

exports.login = (req, res, next) => {
    const emailid = req.body.emailid;
    const password = req.body.password;
    const loadeduser;
    user.find({ emailid: emailid }).then(user => {
        if (!user) {
            res.status(401).json({ message: "user not found" });
        }
        loadeduser = user;
        return user.password;
    }).then(pass => {
        return bcrypt.compare(pass, password)
    }).then(isequal => {
        if (!isequal) {
            res.status(401).json({ message: "password mismatch" });
        }
        const token = jwt.sign({ emailid: loadeduser.emailid, userId: loadeduser._id },
            'secretthanigai', {
                expiresIn: '1h'
            }
        );
        res.status(200).json({ message: "succesfully logged in ", token: token, userid: loadeduser._id.toString() });
    }).catch(err => {
        console.log(err);
    })
}