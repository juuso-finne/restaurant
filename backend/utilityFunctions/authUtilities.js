const jwt = require('jsonwebtoken');

const createToken = (userData, lifetime = "2h") => {
    // Generate a JWT token for a given user data
    return jwt.sign(
        {
        id: userData.id,
        email: userData.email
        },
        process.env.JWT_KEY,
        {expiresIn: lifetime}
    );
}

module.exports = {
    createToken
}