const { bycrypt } = require("./exportRequires");

function hashPassword(password) {
    const saltRounds = 10;
    return bycrypt.hash(password, saltRounds);
}

function comparePassword(password, hashedPassword) {
    return bycrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};