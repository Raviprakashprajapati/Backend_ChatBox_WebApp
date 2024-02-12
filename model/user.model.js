import mongoose,{Schema} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({

    fullName:{
        type:"String",
        required:true
    },
    username:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    gender:{
        type:"String",
        enum:["male", "female"],
        required:true
    },
    profileImage:{
        type:"String" //cludinary
    }

},{timestamps:true})



userSchema.pre("save",async function(next){

    this.password = await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    
    return jwt.sign(
        {
            _id:this._id,
            fullName:this.fullName,
            username:this.username,
        },
        "chatApp-accessToken",
        {
            expiresIn:"7d"
        }

    )

}




export const User = mongoose.model("User",userSchema)