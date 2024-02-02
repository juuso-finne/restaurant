const pool = require('../db/pool');

const menu = {
    getMenuItems: async() =>{
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
    },

    postMenuItem: async(item) =>{
        try {
            const query = 'CALL InsertMenuItem (?, ?, ?, ?);';
            const connection = await pool.getConnection();
            const [results] = await connection.query(query, [item.name, item.price, item.description, item.image]);
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = menu;