import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/db.js"
import cookieParser from "cookie-parser"
import { verifyJWT } from "./middleware/auth.middleware.js"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config({
    path:"./env"
})

const app = express()
const PORT = 5000 || process.env.PORT

app.use(express.json()) //to parse the incoming request with json payload
app.use(cookieParser()) 

app.use("/api/auth",authRoutes)
app.use("/api/messages",verifyJWT ,messageRoutes)
app.use("/api/users",verifyJWT, userRoutes)


app.listen(PORT,()=>{
    connectDb()
    console.log(`Server is running at ${PORT}...`)

})