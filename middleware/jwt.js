const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authheader = req.get('Authorization');
    if (!authheader) {
        res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decodedtoken = jwt(authheader, 'secretthanigai');
    } catch {
        res.status(500).json({ message: "error occured" });
    }

    if (!decodedtoken) {
        res.status(401).json({ message: "unauthozied" });

    }
    req.userId = decodedtoken.userId;
    next();
}