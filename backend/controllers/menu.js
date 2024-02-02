const {menuItemSchema} = require('../schemas');
const menu = require('../models/menu');


const getMenuItems = async (req, res) =>{
    try {
        const response = await menu.getMenuItems();

        if(response.length !== 0){
            res.json(response);
        } else {
            res.status(404).json({message: "No items to show"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

const postMenuItem = async (req, res) =>{
    try {
        let status = 201;
        let resObject = {};

        const { error: valError } = menuItemSchema.validate(req.body);

        if (valError){
            status = 400;
            resObject.message = valError.details[0].message;
        } else{
            const response = await menu.postMenuItem(req.body);
            if (response.affectedRows === 0){
                status = 400
                resObject.message = "Unable to add item"
            } else{
                resObject = req.body;
            }
        }

        res.status(status).json(resObject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateMenuItem = async (req, res) =>{
    try {
        const id = req.params.id;
        const { error: valError } = menuItemSchema.validate(req.body);

        if (valError){
            res.status(400).json({message: valError.details[0].message})
        } else{
            const response = await menu.updateMenuItem(id, req.body);
            if (response.affectedRows === 0){
                res.status(404).json({message: `Item ${id} not found`});
            } else {
                res.json({
                    message: `Item ${id} updated`,
                    updatedItem: req.body
                });
            }

        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await menu.deleteMenuItem(id);
        if (response.affectedRows === 0){
            res.status(404).json({message: `Unable to find item ${id}`});
        } else{
            res.json({message: `Item ${id} deleted`});
        }
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