const pool = require('./db/pool');
const jwt = require('jsonwebtoken');

const execute = async (query, params) =>{
    // Execute an SQL query with given parameters
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
    createToken,
    execute
}