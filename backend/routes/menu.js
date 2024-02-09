const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const {
    getMenuItems,
    postMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menu');


const router = express.Router();

router.get('/', getMenuItems);
router.use(verifyToken);
router.post('/', postMenuItem);
router.put('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem);

module.exports = router;