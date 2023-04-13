import express from "express";
import { login, adminLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/admin", adminLogin);

export default router;
