import express from "express"
import { SignUpUser, loginUser, logoutUser } from "../controllers/auth.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/login",loginUser)
router.post("/sign-up",SignUpUser)
router.post("/logout",verifyJWT,logoutUser)


export default router;