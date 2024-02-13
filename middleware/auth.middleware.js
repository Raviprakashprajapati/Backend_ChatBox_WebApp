import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req,res,next)=>{

    try {

        const token = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

 
        if(!token) throw new ApiError(401,"Token missing")

        const decodedToken = jwt.verify(token,"chatApp-accessToken")

        
        const user = await User.findById(decodedToken?._id)
        if(!user) throw new ApiError(401,"Invalid Access Token")



        req.user = user;
        next();


        
    } catch (error) {
        new ApiError(401,"Error while verifying JWT")
    }

})