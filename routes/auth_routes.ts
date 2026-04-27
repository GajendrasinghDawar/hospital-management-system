import { Router } from "express";
import {
  Login,
  me,
  Register,
  getUsers,
} from "../controllers/auth_controllers.ts";
import { authMiddleware } from "../middleware/auth_middleware.ts";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/me", authMiddleware, me);
router.get("/users", authMiddleware, getUsers);

export default router;
