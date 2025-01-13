const usermodel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')


module.exports.authUser = async (req,res,next) => {
    const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(400).json({message:'Unauthorized'})
    }
    const isBlackListedToken = await usermodel.findOne({token:token})
    if(isBlackListedToken){
        res.status(400).json({message:'unauthorized'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);
        if(!user){
            res.status(404).json({message:'No user found'})
        }
        req.user = user;
        
        return next();
    } catch (error) {
        res.status(400).json({message:'Unauthorized'})
    }
}