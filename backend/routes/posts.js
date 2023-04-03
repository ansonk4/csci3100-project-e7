import express from "express";
import { getFeedPosts, getUserPosts, likePost , addComment} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/:userId", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
/* UPDATE */
router.patch("/:id/like", likePost);
router.post("/:id/comment", addComment);

export default router;
