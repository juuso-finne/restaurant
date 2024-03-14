const users = require('../models/users');
const { loginInfoSchema, signUpInfoSchema } = require('../schemas');
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const { createToken } = require('../utilityFunctions/authUtilities');


const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    let hashedPassword;
    let status = 201;
    let returnObject = {};
    let existingUsers = []

    try {
        const { error: valError } = signUpInfoSchema.validate(req.body);
        if (valError) {
            // In case of invalid input
            status = 400;
            returnObject.message = valError.details[0].message;

        } else {
            // Check for duplicate email
            existingUsers = await users.findUserByEmail(email);
            if (existingUsers.length > 0) {
                status = 422;
                returnObject = { message: "User already exists" };
            }
        }

        if (status == 201) {
            // Everything good

            // Hash the password
            hashedPassword = await bcrypt.hash(password, 12);

            const newUser = {
                id: v4(),
                name,
                email,
                password_hash: hashedPassword
            }

            const response = await users.signUpUser(newUser);

            if (response.affectedRows === 0) {
                status = 400
                returnObject.message = "Unable to add user"
            } else {
                const token = createToken(newUser);

                returnObject = {
                    id: newUser.id,
                    name,
                    email,
                    token
                };
            }
        }

    } catch (error) {
        status = 500;
        returnObject = { message: error.message };

    }

    res.status(status).json(returnObject);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let returnObject = {};
    let status = 200;
    let identifiedUser;
    let isValidated = false;
    try {
        const { error: valError } = loginInfoSchema.validate(req.body);

        if (valError) {
            // In case of invalid input
            status = 400;
            returnObject.message = valError.details[0].message;
        } else {
            result = await users.findUserByEmail(email);
            if (result[0]) {
                identifiedUser = result[0];
            }
        }

        if (!identifiedUser && status === 200) {
            status = 401;
            returnObject.message = "Could not identify credentials";
        } else if (status === 200) {
            isValidated = await bcrypt.compare(password, identifiedUser.password_hash);
        }

        if (isValidated) {
            const token = createToken(identifiedUser);

            returnObject = {
                name: identifiedUser.name,
                id: identifiedUser.id,
                email,
                token
            };
        } else if (status === 200) {
            status = 401;
            returnObject.message = "Could not identify credentials";
        }

    } catch (error) {
        status = 500;
        returnObject = { message: error.message };
    }

    res.status(status).json(returnObject);
}

module.exports = {
    loginUser,
    signUpUser,
}