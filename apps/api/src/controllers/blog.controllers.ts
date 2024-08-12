import { Request, Response } from "express";
import { createPostInput, updatePostInput } from "@bun-tz/medium";

export const createBlog = async (req: Request, res: Response) => {
  return res.json("hello");
};

export const updateBlog = async (req: Request, res: Response) => {
  return res.json("hello");
};

export const getBlogById = async (req: Request, res: Response) => {
  return res.json("hello");
};

export const getBlogs = async (req: Request, res: Response) => {
  return res.json("hello");
};
