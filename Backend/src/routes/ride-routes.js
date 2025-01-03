import e from "express";
import { body,query } from "express-validator";
import { createRide, getFare } from "../controllers/ride-controller.js";
import { authmiddlewareUser } from "../middleware/auth-middleware.js";

const rideRoute=e.Router()

rideRoute.post('/create-ride',
    authmiddlewareUser,
    [
        body('pickUp').isString().isLength({min:3}),
        body('drop').isString().isLength({min:3}),
        body('vehicleType').isIn(['car','motorcycle','auto'])
    ],
   
    createRide
)

rideRoute.post('/getFares',authmiddlewareUser,
    [
        body('pickup').isString().isLength({min:3}),
        body('drop').isString().isLength({min:3}),
    ],
    getFare
)

export default rideRoute