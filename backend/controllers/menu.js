const menu = require('../models/menu');

const getMenu = async (req, res) =>{
    const response = await menu.getMenu();
    if(response){
        res.json(response);
    }
};

module.exports = {
    getMenu
};