const pool = require('../db/pool');

const menu = {
    getMenu: async() =>{
        try {
            const connection = await pool.getConnection();
            const [results] = await connection.query(
                'SELECT * FROM `menu_items`'
            );
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = menu;