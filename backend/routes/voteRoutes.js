
import express from "express";
import { castVote, getResults, resetVotes } from "../controllers/voteController.js";

const router = express.Router();

router.post("/", castVote);      // POST /api/votes
router.get("/", getResults);     // GET  /api/votes
router.delete("/", resetVotes);  // DELETE /api/votes

export default router;
