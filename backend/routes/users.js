import express from "express";
import {
  searchUser,
  getUser,
  getUserFriends,
  addRemoveFriend,
  deleteUser
} from "../controllers/users.js";

const router = express.Router();

router.get("/search", searchUser);
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:id/:friendId", addRemoveFriend);
router.delete("/delete/:id", deleteUser);

export default router;
