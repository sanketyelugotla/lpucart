const { userService, tokenService, authService } = require("../services")
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req,res)=>{
    
   const user = await userService.createUser(req.body, res);
   const token = await tokenService.generateAuthToken(user, res);
   res.status(201).send({user,token})
})

const login = catchAsync(async (req,res)=>{
    const {email,password} = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email,password, res);
    const tokens = await tokenService.generateAuthToken(user, res)
    res.send({user,tokens})
})


module.exports = {
    register,
    login
}