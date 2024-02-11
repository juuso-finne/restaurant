const pool = require('../db/pool');

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

module.exports = {
    execute
}