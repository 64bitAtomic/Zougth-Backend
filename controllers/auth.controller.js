const User = require("../model/userModel");
const RefreshToken = require("../model/refreshModel");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/tokenUtils");
const { NODE_ENV } = require("../utils/envExports");
const signup = async (req,res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    if(email.length < 5 || !email.includes('@')) {
        return res.status(400).json({message: "Invalid email format"});
    }
    if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    try {
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ user: username, email, hashPassword: hashedPassword });
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await RefreshToken.create({ refreshToken, userId: user._id });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: NODE_ENV === 'production', sameSite: NODE_ENV === 'production' ? 'None' : 'Strict' });
        return res.status(200).json({message: "Signup successful", token: accessToken});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const login = async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"});
    }
    if(email.length < 5 || !email.includes('@')) {
        return res.status(400).json({message: "Invalid email format"});
    }
    if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await comparePassword(password, user.hashPassword);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await RefreshToken.findOneAndUpdate({ userId: user._id }, { refreshToken }, { upsert: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: NODE_ENV === 'production', sameSite: NODE_ENV === 'production' ? 'None' : 'Strict' });
        return res.status(200).json({message: "Login successful", token: accessToken});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const refresh = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({message: "Refresh token is required"});
    }
    try {
        const tokenDoc = await RefreshToken.findOne({ refreshToken });
        if (!tokenDoc) {
            return res.status(401).json({message: "Invalid refresh token"});
        }
        const user = await User.findOne({ _id: tokenDoc.userId });
        if (!user) {
            return res.status(401).json({message: "Invalid refresh token"});
        }
        const accessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);
        await RefreshToken.findOneAndUpdate({ userId: user._id }, { refreshToken: newRefreshToken }, { upsert: true });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: NODE_ENV === 'production', sameSite: NODE_ENV === 'production' ? 'None' : 'Strict' });
        return res.status(200).json({message: "Refresh successful", token: accessToken});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: error.message});
    }
}

module.exports = { signup, login, refresh };