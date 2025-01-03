
import mongoose, { mongo } from "mongoose";


const rideSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    duration:{
        type:Number
    },// In Minutes
    distance:{
        type:Number
    },//In Km
    paymentId:{
        type:String
    },
    signature:{
        type:String
    },
    orderId:{
        type:String
    },
    status:{
        type:'String',
        enum:['pending','accepted','completed','cancelled'],
        default:'pending'
    },
    otp:{
        type:String,
        required:true
    }
})





export const RideModel=mongoose.model('Rides',rideSchema)

