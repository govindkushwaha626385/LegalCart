const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const lawShop = require("../model/lawshop");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});


exports.isLawyer = catchAsyncErrors(async(req,res,next) => {
    const {lawyer_token} = req.cookies;
    if(!lawyer_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(lawyer_token, process.env.JWT_SECRET_KEY);

    req.lawyer = await lawShop.findById(decoded.id);

    next();
});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}