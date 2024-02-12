import mongoose from "mongoose"

const connectDb = async () =>{
    try {
        await mongoose.connect("mongodb+srv://raviprakashprajapati445:NUPguFu5t4xwOY7d@cluster0.zevbpeq.mongodb.net/?retryWrites=true&w=majority")
        
    } catch (error) {
        console.log("Error in Database ", error)
    }
}

export default connectDb