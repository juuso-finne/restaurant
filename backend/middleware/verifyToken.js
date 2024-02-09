const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    req.isAuthorized = false
    if (req.method !== "OPTIONS"){
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (token){
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                req.userData = {userId: decodedToken.id};
            }else{
                throw new Error();
            }
        } catch (error) {
            return res.status(401).json({message: "Authorization failed"});
        }
    }else{
    }

    return next();
}

module.exports = verifyToken;