import express from "express";
import {retweet, getFeedPosts, getUserPosts, likePost, dislikePost, addComment} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/:userId", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
/* UPDATE */
router.post("/:id/retweet", retweet);
router.patch("/:id/like", likePost);
router.patch("/:id/dislike", dislikePost);
router.post("/:id/comment", addComment);

export default router;
