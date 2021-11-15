const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors');
require('dotenv').config()

const { SECRET_KEY } = process.env;

const authentication = async (req, _, next) => {
    try {
        const [type, token] = req.headers.authentication.split(' ');
        if (type!=='Bearer') {
            throw new Unauthorized('Not authorized')
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY);
            const user = user.findById({ id });
            if (!user) {
                throw new Unauthorized('Not authorized')
            }
            if(!user.token){
                throw new Unauthorized('Not authorized')
            }
            req.user=user;
            next();
        } catch (error) {
            throw new Unauthorized();
        }
    }
        catch(error){
            next(error)
        }
    }      
     
   

module.exports = authentication;