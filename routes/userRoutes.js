import express from "express";
import { checkJwt } from "../config/auth.js";
import { getUser, registerUser } from "../Controllers/userController.js";

const router = express.Router();

router.get("/me", checkJwt, getUser);
router.post("/register", checkJwt, registerUser);

export default router;
