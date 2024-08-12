import { Router } from "express";
import {
  createBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controllers";

const router = Router();

router.post("/", createBlog);
router.put("/", updateBlog);
router.get("/:id", getBlogById);
router.get("/bulk", getBlogs);

export default router;
