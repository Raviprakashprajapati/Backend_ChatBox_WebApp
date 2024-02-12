import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async(req,res)=>{

    // const {id} = req.params
    // if(!id) throw new ApiError(401,"Receiver Id is required")
    // const senderId



})


export{
    sendMessage,
}