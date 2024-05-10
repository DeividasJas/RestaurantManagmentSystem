if (process.env.NODE_ENV === "development") {
  console.log("Running development NODE");
}

import express from "express";
import usersRouter from "./routes/index.mjs";


const app = express();
app.use(express.json());

app.use("/api/v1/restaurant", usersRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001, nauja konfikuracija");
});