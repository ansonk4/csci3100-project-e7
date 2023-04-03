import express from "express";
import {
  searchUser,
  getUser,
  getUserFriends,
  addRemoveFriend
} from "../controllers/users.js";

const router = express.Router();

router.get("/search", searchUser);
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:id/:friendId", addRemoveFriend);

export default router;
