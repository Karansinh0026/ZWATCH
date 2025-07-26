import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(registerUser)

export default router // by doing export default we can name it as want when we import for example in app.js we import router as userrouter