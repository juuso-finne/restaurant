const pool = require('./db/pool');
const jwt = require('jsonwebtoken');

const execute = async (query, params) =>{
    try {
        const connection = await pool.getConnection()
        const [results] = await connection.query(query, params);
        connection.release();
        return results;
    } catch (error) {
        throw error;
    }
}

const createToken = (userData, lifetime = "2h") => {
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
    createToken,
    execute
}