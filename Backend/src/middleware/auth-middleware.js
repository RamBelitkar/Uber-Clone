import { userModel } from "../models/user-model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import jwt from "jsonwebtoken";

export const authmiddleware=async (req,res,next) => {
    try {
        const token=req.cookies.token || req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(400).json({
                message:"Token not found Unauthorized"
            })
        }
    
        const verifyToken=jwt.verify(token,process.env.TOKEN_SECRET)
        const user=await userModel.findById(verifyToken._id).select('-_id -__v')
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        req.user=user
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).
        json({
            message:"Unauthorized"
        })
    }
}