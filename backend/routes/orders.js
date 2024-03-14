const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const postOrder = require('../controllers/orders');

const router = express.Router();
router.use(verifyToken);
router.post('/', postOrder);

module.exports = router;