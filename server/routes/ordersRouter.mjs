// *************************************************************************************
// KONFIGURACIJA

import express from "express";
import ordersController from "../controller/ordersController.mjs";
import {
  validateOrderParams,
  validateOrderUserId,
  validateOrderOrderId,
} from "../validator/ordersSchemaValidation.mjs";
import { validate } from "../middleware/schemaValidation.mjs";

const router = express.Router();

router.use(express.json());

router.get("/", ordersController.getOrders);

router.post(
  "/:userId/menuItem/:menuId",
  validate(validateOrderUserId),
  ordersController.createOrder
);

// Read Orders for a User: Uses a GET API to fetch all orders for a specific user. The user ID is provided as a parameter, and the API returns all orders that have this user ID.
// nurodyti order id ir gauti to order userID ir okie menu item jame buvo
// pro user orderiu mapinti

router.get(
  "/:orderId",
  validate(validateOrderOrderId),
  ordersController.getOrderById
);

// Read Order for a User: Uses a GET API to fetch the details of a specific order for a specific user. The user ID and the order ID are provided as parameters, and the API returns the order if it belongs to the user.

// gauti user ID ir order ID, jeigu user uzsisake orderi, grazinti order details.
router.get("/username/:username", ordersController.getOrdersByUser);

router.get("/user/:userId/order/:orderId", ordersController.getOrdersByOrderIdUserId)

// Delete Order for a User: Uses a DELETE API to remove a specific order for a specific user from the database. The user ID and the order ID are provided as parameters, and the API deletes the order if it belongs to the user.
// istrinti orderi id is userID, jie abu nurodyti kaip params

router.delete(
  "/:orderId/users/:userId",
  validate(validateOrderParams),
  ordersController.deleteOrderByUser
);

export default router;
