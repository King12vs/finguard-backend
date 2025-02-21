import express from "express";
import { checkJwt } from "../config/auth.js";
import { getTransactions, addTransaction } from "../Controllers/transactionController.js";

const router = express.Router();

router.get("/", checkJwt, getTransactions);
router.post("/", checkJwt, addTransaction);

export default router;
