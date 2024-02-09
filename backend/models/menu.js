const pool = require('../db/pool');
const { execute } = require('../utilityFunctions');

const menu = {
    getMenuItems: async() =>{
        try {
            const query = 'SELECT * FROM `menu_items`'
            return execute(query);
        } catch (error) {
            throw new Error(error);
        }
    },

    postMenuItem: async(item) =>{
        try {
            const query = 'CALL InsertMenuItem (?, ?, ?, ?);';
            const params = [item.name, item.price, item.description, item.image];
            return execute(query, params);
        } catch (error) {
            throw new Error(error);
        }
    },

    updateMenuItem: async(id, item) => {
        try {
            const query = 'UPDATE `menu_items` SET ? WHERE id = ?';
            const params = [item, id];
            return execute(query, params);
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteMenuItem: async(id) => {
        try {
            const query = 'DELETE FROM `menu_items` WHERE id = ?';
            return execute(query, id);
        } catch(error){
            throw new Error(error);
        }
    }
}

module.exports = menu;