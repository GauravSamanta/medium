import { Router } from "express";
import { createBlog } from "../controllers/blog.controllers.js";

const router = Router();

router.post("/create", createBlog);

export default router;
