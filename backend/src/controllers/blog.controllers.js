import { User } from "../models/user.model.js";

const createBlog = async (req, res) => {
  const { title, body, author } = req.body;
  await User.create({
    title,
    body,
    author,
  });
  res.send("ok");
};

export { createBlog };
