const { mongoose } = require("../utils/exportRequires");
const { MONGO_URI } = require("../utils/envExports");
function connectDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = { connectDB };