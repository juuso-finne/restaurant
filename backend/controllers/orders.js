const { orderInfoSchema } = require('../schemas');

const postOrder = async (req, res) => {
    try {
        let status = 201;
        let resObject = {};

        const { error: valError } = orderInfoSchema.validate(req.body);

        if (valError) {
            status = 400;
            resObject.message = valError.details[0].message;
        } else {
            resObject = { ...req.body };
        }

        res.status(status).json(resObject);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = postOrder;