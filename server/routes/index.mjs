import express from "express";
import usersRouter from "./usersRouter.mjs";
import menusRouter from "./menusRouter.mjs";
import orderRouter from "./ordersRouter.mjs";

const router = express.Router();


router.use("/users", usersRouter);
router.use("/menus",  menusRouter);
router.use("/orders", orderRouter);

export default router;
