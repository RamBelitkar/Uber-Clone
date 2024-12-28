import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const CaptainSchema=new mongoose.schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name should contain 3 or more characters']
        },
        lastname:{
            type:String,
            minlength:[3,'Last name should contain 3 or more characters']
        }
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:[3,'Password should contain 3 or more characters']
    },
    socketId:{
        type:String
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            default:[1,"Capacity should be 1 or more"],
            required:true
        },
        vehicleType:{
            type:String,
            enum:['motorcycle','car','auto'],
            required:true
        }

    },
    status:{
        type:String,
        enum:['inactive','active'],
        default:'inactive'
    }

})
CaptainSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id},process.env.TOKEN_SECRET,{expiresIn:"12h"})
    return token
}
CaptainSchema.pre('save',async function hashPass(next) {
  //This refers to current password 
    //if not modified then go to next function
  if(!this.isModified('password')) return next()
    
    const hashedPass=await bcrypt.hash(this.password,12);
    this.password=hashPass
    next()
})

CaptainModel.methods.checkPassword=async function (password) {
    return await bcrypt.compare(password,this.password)
}



export const CaptainModel=mongoose.model('Captain',CaptainSchema)
