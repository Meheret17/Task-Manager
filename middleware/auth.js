const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log('Decoded token:', decoded);
        req.user = decoded
        next()
    } catch(error){
        console.error('Token verification error:', error);
        return res.status(401).json({ error: 'Invalid token.' });
    }
}

module.exports = authenticate;

