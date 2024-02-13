import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()


router.post("/send/:id",verifyJWT,sendMessage)
router.get("/get-messages/:id",verifyJWT,getMessages)

export default router