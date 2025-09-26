import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import voteRoutes from "./routes/voteRoutes.js";

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use("/api/votes", voteRoutes);


app.get("/", (req, res) => {
  res.send("✅ Voting API is running!");
});

export default app;
