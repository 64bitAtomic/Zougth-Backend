const User = require("../model/userModel");
const protected = async (req,res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: `Hello ${user.user}, you have accessed a protected route!`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { protected };