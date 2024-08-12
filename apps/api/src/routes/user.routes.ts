import { Router } from "express";
import { signin, signup } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", signup);
router.post("/signin",signin);

export default router;
