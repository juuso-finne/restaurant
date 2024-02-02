const pool = require('../db/pool');

const menu = {
    getMenuItems: async() =>{
        try {
            const connection = await pool.getConnection();
            const query = 'SELECT * FROM `menu_items`'
            const [results] = await connection.query(query);
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
    },

    updateMenuItem: async(id, item) => {
        try {
            const query = 'UPDATE `menu_items` SET ? WHERE id = ?';
            const connection = await pool.getConnection();
            const [results] = await connection.query(query, [item, id]);
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteMenuItem: async(id) => {
        try {
            const query = 'DELETE FROM `menu_items` WHERE id = ?';
            const connection = await pool.getConnection();
            const [results] = await connection.query(query, id);
            return results;
        } catch(error){
            throw new Error(error);
        }
    }
}

module.exports = menu;