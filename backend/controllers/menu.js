const menu = require('../models/menu');

const getMenuItems = async (req, res) =>{
    const response = await menu.getMenuItems();
    try {
        if(response.length > 0){
            res.json(response);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

const postMenuItem = async (req, res) =>{
    try {
        const response = await menu.postMenuItem(req.body);
        if (response){
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getMenuItems,
    postMenuItem
};