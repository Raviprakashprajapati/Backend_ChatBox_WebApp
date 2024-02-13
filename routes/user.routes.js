import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getUsersForSideBar } from '../controllers/user.controller.js';
const router = express.Router()

router.get("/",verifyJWT,getUsersForSideBar)


export default router;