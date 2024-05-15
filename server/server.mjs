if (process.env.NODE_ENV === "development") {
  console.log("Running development NODE");
}

import express from "express";
import usersRouter from "./routes/index.mjs";
import menusRouter from "./routes/index.mjs"

import { connectDB } from "./db/postgresConnection.mjs";

const app = express();

const startServer = async () => {
  try {
    const message = await connectDB();
    console.log(message);


    app.use(express.json());
    app.use("/api/v1/restaurant", usersRouter, menusRouter);
    app.listen(3001, () => {
      console.log("Server is running on port 3001, nauja konfikuracija");
    });

  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
}

startServer()


// app.get("/", (req, res, next) => {
//   console.log("laba diena");
//   setTimeout(() => {
//     res.send("labas");
//     next();
//   }, 1000);
// });

// app.post(
  // "/test",
  // blogas budas !!!!!!!!!!!!!!!!!!!!!!!!!
  // [body("name").not().isEmpty().withMessage("Name is required")],
  // (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   res.send("User registration correct");
  // }
// );

