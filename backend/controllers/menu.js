const {menuItemSchema} = require('../schemas');
const menu = require('../models/menu');


const getMenuItems = async (req, res) =>{
    try {
        const response = await menu.getMenuItems();

        if(response.length !== 0){
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
        const { error: valError } = menuItemSchema.validate(req.body);
        console.log(menuItemSchema.validate(req.body));
        if (valError){
            res.status(400).json({message: valError.details[0].message})
        } else{
            const response = await menu.postMenuItem(req.body);
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateMenuItem = async (req, res) =>{
    try {
        const { error: valError } = menuItemSchema.validate(req.body);

        if (valError){
            res.status(400).json({message: valError.details[0].message})
        } else{
            const response = await menu.updateMenuItem(req.params.id, req.body);
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const response = await menu.deleteMenuItem(req.params.id);
        res.json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getMenuItems,
    postMenuItem,
    updateMenuItem,
    deleteMenuItem
};