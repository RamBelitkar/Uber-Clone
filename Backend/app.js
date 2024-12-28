import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import cors from 'cors'
import cookieparser from 'cookie-parser'
import { routes } from './src/routes/user-routes.js'


const userRoutes=routes
const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
app.use('/user',userRoutes)



export {app} 
