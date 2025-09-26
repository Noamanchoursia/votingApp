// server/controllers/voteController.js
import Vote from "../models/voteModel.js"

export const castVote = async (req, res) => {
  try {
    const { username, choice } = req.body;

    if (!username || !choice)
      return res.status(400).json({ error: "Username & choice required" });


    const existing = await Vote.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "User already voted" });
    }


    const vote = await Vote.create({ username, choice });

  
    const io = req.app.get("io");
    io.emit("voteUpdate");

    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $group: { _id: "$choice", count: { $sum: 1 } } },
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const resetVotes = async (req, res) => {
  try {
    await Vote.deleteMany({});
    const io = req.app.get("io");
    io.emit("voteUpdate");
    res.json({ message: "Votes reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

