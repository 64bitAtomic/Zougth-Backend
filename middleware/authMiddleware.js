const { verifyAccessToken } = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: "Authorization header missing or malformed"});
    }
    try{
        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token);
        if (!decoded) return res.status(401).json({message: "Invalid or expired token"})
        req.userId = decoded.id;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token expired"});
        }
        return res.status(500).json({message: error.message});
    }
}

module.exports = {authMiddleware};