const usermodel = require('../models/user.model')
const {validationResult} = require('express-validator')

const userservice = require('../services/user.service');
const blackListTokenModel = require('../models/blackListToken.model');
module.exports.registerUser = async (req,res,next) => {
      const errors  = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
      }

      const {fullName,email,password} = req.body;
      const hashPassword = await usermodel.hashPassword(password)

      const user  = await userservice.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashPassword
      })
      const token = user.genrateAuthToken();
      res.status(200).json({token,user})
      
}

module.exports.loginUser = async (req,res,next) =>{
    const errors  = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
      }

      const {email,password} = req.body;

      const user  = await usermodel.findOne({email}).select('+password');
      if(!user){
        return res.status(401).json({message:'Invalid email or password'})

      }
      const isMatch = await user.comparePassword(password);
      if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
      }
      const token = user.genrateAuthToken();
      res.cookie('token',token)
      res.status(200).json({token,user})
}


module.exports.getUserProfile = async (req,res,next) =>{
     res.status(200).json(req.user)
}
module.exports.logOutUser = async (req, res) => {
  try {
    res.clearCookie('token');

    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    await blackListTokenModel.create({ token });

    return res.status(200).json({ message: 'Logged Out' });
  } catch (error) {
    console.error('Error in logOutUser:', error);
    return res.status(500).json({ message: 'Server error during logout', error });
  }
};


