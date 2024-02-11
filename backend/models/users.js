const { execute } = require('../utilityFunctions/dbUtilities');

const users = {
    signUpUser: async (userObject) =>{
        try {
            const query = 'INSERT INTO `users` SET ?';
            return  execute(query, userObject);
        } catch (error) {
            throw new Error(error);
        }
    },

    findUserByEmail: async (email) =>{
        try {
            const query = 'SELECT * FROM `users` WHERE `email` = ?';
            return execute(query, email);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = users;