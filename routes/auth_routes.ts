import { Router } from "express";
import { Login, me, Register } from "../controllers/auth_controllers.ts";
import { authMiddleware } from "../middleware/auth_middleware.ts";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/me", authMiddleware, me);

export default router;
