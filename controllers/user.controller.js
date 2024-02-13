import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUsersForSideBar = asyncHandler(async(req,res)=>{

    const loggedInUser = req.user?._id
    if(!loggedInUser) throw new ApiError(401,"LoggedInUser Id required")
    
    const allUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password -username")

    if(!allUsers) throw new ApiError(501,"Error while getting users")

    return res.status(200).json(
        new ApiResponse(200,allUsers,"All users fetched successfully")
    )


})



export{
    getUsersForSideBar,
}