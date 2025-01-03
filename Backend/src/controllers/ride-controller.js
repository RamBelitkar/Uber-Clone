import { RideModel } from "../models/ride-schema.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { calcFare, generateOtp } from "../utils/RideServices.js";
import { validationResult } from "express-validator";
export const createRide=asyncHandler(async (req,res) => {
   const  validationErr=validationResult(req)
   if(!validationErr.isEmpty()){
    res.status(400) 
    .json({
        error:validationErr.array()
    })
   }
   
    const {
        pickUp,
        drop,
        vehicleType
    }=req.body
    const user=req.user
    if(!pickUp || !drop ||!user|| !vehicleType){
        throw new Error('Provide all information')
    }
  
    const fareDetails = await calcFare(pickUp, drop);
    const { fares } = fareDetails; // Ensure fares is used (not fare directly)
    const{ distanceInKm}=fareDetails 
    const {durationInMins}=fareDetails
    const otp=generateOtp(6)




    const newRide = await RideModel.create({
        User: req.user._id,
        pickup: pickUp,
        destination: drop,
        vehicleType,
        duration:durationInMins,
        distance:distanceInKm,
        otp:otp,
        fare: fares[vehicleType], // Note: Use `fares` instead of `fare` here
    });

    return res.status(200).json(
        {
            message:"Ride Created",
            newRide,
        }
    )
})




//Controller to getFare of each type of vehicle
export const getFare=asyncHandler(async (req,res) => {
    const {pickup,drop}= req.body
    if(!pickup || !drop){
        return res.status(400)
        .json({
            "message":"Missing pickup or drop"
        })
    }

    const validationErr=validationResult(req)
    if(!validationErr.isEmpty()){
     return   res.status(400).
        json({
            error:validationErr.array()
        })
    }

    const fareDetails = await calcFare(pickup, drop);
    const { fares } = fareDetails; // destructing the fare
 
    const {distanceInKm,durationInMins}=fareDetails
    return res.status(200)
    .json({
        fares,
        estimatedTime:durationInMins,
        distance:distanceInKm

    })
})