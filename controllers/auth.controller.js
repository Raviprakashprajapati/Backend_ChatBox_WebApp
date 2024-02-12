import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../model/user.model.js"

const loginUser = asyncHandler(async(req,res)=>{

    const {username,password}=req.body
    if(!(username || password)) throw new ApiError(401,"username and password must be required")

    const userExisted = await User.findOne({username})
    if(!userExisted) throw new ApiError(401,"Error while getting user ")

    const isPasswordValid = await userExisted.isPasswordCorrect(password)

    if(!isPasswordValid) throw new ApiError(401,"Invalid Password")

    const options={
        https:true,
        secure:true
    }

    const accessToken = await userExisted.generateAccessToken()

    return res.status(200)
            .cookie("accessToken", accessToken)
            .json( 
                new ApiResponse(
                200,
                {user:userExisted,accessToken},
                "User is login")
                )



    

})

const SignUpUser =asyncHandler(async(req,res)=>{

        
    const {fullName,username,password,gender} = req.body

    if(!(fullName || username || password || gender)) throw new ApiError(401,"All fields must be required")

    const existedUsername = await User.findOne({username})
    console.log(existedUsername)
    if(existedUsername) throw new ApiError(401,"User with username already exists")

    const boyProfileImage = "https://avatar.iran.liara.run/public/boy"
    const girlProfileImage = "https://avatar.iran.liara.run/public/girl"
    
    const newUser = await User.create({
        fullName,
        username,
        password,
        gender,
        profileImage: gender==="male"?boyProfileImage:girlProfileImage
    })

    if(!newUser) throw new ApiError(501,"Error while creating new user")

    return res.status(200).json(
            new ApiResponse(200,newUser,"user created successfully")
    )


})


const logoutUser = asyncHandler(async(req,res)=>{

    const options = {
        https:true,
        secure:true
    }

    return res.status(200)
            .clearCookie("accessToken",options)
            .json(
                new ApiResponse(200,{},"User logOut successfully")
            )


})


export {
    loginUser,
    SignUpUser,
    logoutUser,
}