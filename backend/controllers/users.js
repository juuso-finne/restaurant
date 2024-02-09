const users = require ('../models/users');

const signUpUser = async (req, res) => {
    const response = await users.signUpUser();
    res.json({message: response});
};

module.exports = {
    signUpUser
}