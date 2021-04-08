import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const headers = req.headers;
    if(!headers.authorization){
        return res.status(401).json({
            errors: ["Authorization Bearer string not set"]
        })
    }
    let token;
    try{
        token = headers.authorization.split(" ")[1];
    } catch(err){
        return res.status(401).json({
            errors: ["Authorization Bearer string not valid"]
        })
    }
    require('dotenv').config()
    let payload;
    try{
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err){
        return res.status(401).json({
            errors: ["Authorization Bearer string expired or invalid"]
        })
    }
    
    if(payload.id){
        req.user = {
            id: payload.id
        }
        next()   
    } else {
        return res.status(401).json({
            errors: ["Authorization Bearer string not valid"]
        })
    }
     
}