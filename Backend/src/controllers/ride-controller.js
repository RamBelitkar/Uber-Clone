import { RideModel } from "../models/ride-schema.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { sendMessage } from "../utils/GlobalSocket.js";
import { getLatLng } from "../utils/MapServices.js";
import { calcFare, generateOtp, getNearbyCaptains } from "../utils/RideServices.js";
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
    if(!pickUp || !drop || !vehicleType){
        throw new Error('Provide all information')
    }
  
    const fareDetails = await calcFare(pickUp, drop);
    const { fares } = fareDetails; // Ensure fares is used (not fare directly)
    const{ distanceInKm}=fareDetails 
    const {durationInMins}=fareDetails
    const otp=generateOtp(6)
  
  
  
    //FIrst getting the latitudes and longitudes from pickup 
    const getPickup=await getLatLng(pickUp)
   
    const nearbyCaptains=await getNearbyCaptains(getPickup.latitude,getPickup.longitude,2)

 


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
    const newRidewithUser=await RideModel.findOne({_id:newRide._id}).populate('User')
    newRide.otp=""
    nearbyCaptains.map(captain=>
        sendMessage(captain.socketId,{
            event:'new-ride',
            data:newRidewithUser
        })   
    )
    return res.status(200).json(
        {
            message:"Ride Created",
            newRidewithUser,
            nearbyCaptains
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
        distance:distanceInKm,

    })
})



export const confirmRide=asyncHandler(async (req,res) => {
    const {rideId}=req.body
    const captain=req.captain
    if(!rideId){
        throw new Error('Ride id not found')
    }


    await RideModel.findOneAndUpdate(
        { _id: rideId }, // Filter
        { 
          status: 'accepted', 
          Captain: captain._id 
        }, // Update
        { new: true } // Options
      );

    const ride=await RideModel.findOne({_id:rideId}).populate('User').populate('Captain')

      sendMessage(ride.User.socketId,{
        event:"accept-ride",
        data:ride,

      })


      return res.status(200)
      .json({
        ride    
      })
})


//THis controller will start the ride for the captain and fire the socket for user
export const startRide=asyncHandler(async (req,res) => {
    const validationErr=validationResult(req)

    if(!validationErr.isEmpty()){
        res.status(400).
        json({
            error:validationErr.array()
        })
    }
    const {rideId,otp}=req.body

    if(!rideId || !otp){
        res.status(404).
        json({
            message:'Body Data missing'
        })
    }

    const ride=await RideModel.findOne({_id:rideId}).populate('User').populate('Captain')

    if(!ride){
        throw new Error("Ride not found")
    }
    if(!ride.otp===otp){
        throw new Error("Error Otp invalid")
    }

    ride.status='ongoing'
    await ride.save({
        validateBeforeSave:false,
      })

      const user=ride.User
      sendMessage(user.socketId,{
        event:'start-ride',
        data:ride
      })

      return res.status(200)
      .json({
        message:"Ride Accepted and started",
        ride
      })


})


export const endRide=asyncHandler(async (req,res) => {
    const validationErr=validationResult(req)

    if(!validationErr.isEmpty()){
        res.status(400).
        json({
            error:validationErr.array()
        })
    }
    const {rideId}=req.body

    if(!rideId){
        res.status(404).
        json({
            message:'Ride id missing'
        })
    }
    const ride=await RideModel.findOne({_id:rideId}).populate('User').populate('Captain')
    if(!ride){
        res.status(400)
        .json({
            message:"Ride Id not found"
        })
    }

    if(ride.status!=='ongoing'){
    throw new Error('Ride not ongoing')
    }

    await RideModel.findByIdAndUpdate({_id:rideId},{
        status:'completed'
    })

    const user=ride.User
    sendMessage(user.socketId,{
      event:'make-payment',
      data:ride
    })    
    return res.status(200).json({
        ride,
        message:"Ride Completed"
    })

})
export const makePayment=asyncHandler(async (req,res) => {
    const validationErr=validationResult(req)

    if(!validationErr.isEmpty()){
        res.status(400).
        json({
            error:validationErr.array()
        })
    }
    const {rideId,fare,paymentType}=req.body

    if(!rideId || !fare || !paymentType){
        res.status(404).
        json({
            message:'Ride id missing or fare missing'
        })
    }
    const ride=await RideModel.findOne({_id:rideId}).populate('User').populate('Captain')
    if(!ride){
        res.status(400)
        .json({
            message:"Ride Id not found"
        })
    }

    if(ride.status!=='completed'){
    throw new Error('Ride not completed')
    }

    if(ride.fare===fare)
    await RideModel.findByIdAndUpdate({_id:rideId},{
        status:'completed',
        paymentType:paymentType
    })

    return res.status(200).json({
        ride,
        message:"Ride Completed and payment done"
    })

})


// const makePayment