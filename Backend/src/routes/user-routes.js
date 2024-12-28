import express from 'express'
import {body} from 'express-validator'
import { getProfile, loginUser, registerUser } from '../controllers/user-controllers.js'
import { authmiddleware } from '../middleware/auth-middleware.js'
const routes=express.Router()

routes.post('/register',[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage('Fullname should have more than 3 characters'),
    body('password').isLength({min:6}).withMessage("Password should contain 3 or more characters")
    //Checking the errors
],     registerUser  )
routes.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage('Password should contain 3 or more characters')
],
loginUser
)

routes.get('/profile',authmiddleware,getProfile)


export {routes}