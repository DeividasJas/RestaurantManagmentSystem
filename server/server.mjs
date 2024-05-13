if (process.env.NODE_ENV === "development") {
  console.log("Running development NODE");
}

import express from "express";
import usersRouter from "./routes/index.mjs";
// import { body, ExpressValidator, validationResult } from "express-validator";

const app = express();
app.use(express.json());

app.use("/api/v1/restaurant", usersRouter);

// app.get("/", (req, res, next) => {
//   console.log("laba diena");
//   setTimeout(() => {
//     res.send("labas");
//     next();
//   }, 1000);
// });

app.post(
  "/test",
  // blogas budas !!!!!!!!!!!!!!!!!!!!!!!!!
  // [body("name").not().isEmpty().withMessage("Name is required")],
  // (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   res.send("User registration correct");
  // }
);

app.listen(3001, () => {
  console.log("Server is running on port 3001, nauja konfikuracija");
});
