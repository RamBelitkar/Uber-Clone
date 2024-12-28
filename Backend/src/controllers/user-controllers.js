import { userModel } from "../models/user-model.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { validationResult } from "express-validator";


//registering the user
export const registerUser=asyncHandler(async (req,res) => {
   
   //Handling the express validator errors
    const validationError=validationResult(req)

    if(!validationError.isEmpty()){
        return res.status(400).json({errors:validationError.array()})
    }
    
    const {
      fullname,
        email,
        password
    }=req.body
    if( !fullname.firstname  || !email  ||!password){
        throw new Error("All fields are required")
    }


    const existedUser=await userModel.findOne({email})
    if(existedUser){
    return res.json({
            message:"User already exists",
            User:existedUser
        })
    }//Handling the existed-user case

    
    const newUser=await userModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password
    })
    const token=newUser.generateAuthToken()
    
    if(newUser){
        return res.status(200)
            .json({
                message:"New user created",
                Newuser:newUser,
                token:token
            })
    }

})

export const loginUser=asyncHandler(async (req,res) => {
        const validationError=validationResult(req)
        if(!validationError.isEmpty()){
            return res.status(400)
            .json({
                error:validationError.array()
            })
        }

        const {email,password}=req.body
        if(!email|| !password){
            throw new Error('All fields are required')
        }
        const user=await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(400)
            .json({
                message:"User not found"
            })
        }
        const checkPassword=await user.checkPassword(password)
        if(!checkPassword){
            return res.status(400)
            .json({
                message:"Password is incorrect"
            })
        }

        const token=user.generateAuthToken()

        return res.status(200)
        .json({
            message:"Login successfully",
            token:token,
        })

})


export const getProfile=asyncHandler(async (req,res) => {
    const user=req.user
    return res.status(200).json({
        message:"User found",
        user:user
    })
})