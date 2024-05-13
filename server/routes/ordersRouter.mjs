// *************************************************************************************
// KONFIGURACIJA
// *******************************************************************************

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

// Order Service: id, customerId, Items: [menuItemId, quantity]

// Nebūtina:

// Total: The total price of the order. This could be calculated as the sum of the prices of the MenuItems in the order, each multiplied by its quantity.

// Status: The current status of the order. This could be a string with values like 'placed', 'preparing', 'ready', 'served', 'paid',

// Order Time: The time when the order was placed. This could be automatically set to the current time when the order is created.

// Create Order for a User: Uses a POST API to accept order details. The order details, including the user ID and the IDs and quantities of the ordered menu items, are stored in the database.

router.post(
  "/:userId",
  validate(validateOrderUserId),
  ordersController.sendOrder
);

// Read Orders for a User: Uses a GET API to fetch all orders for a specific user. The user ID is provided as a parameter, and the API returns all orders that have this user ID.
// nurodyti order id ir gauti to order userID ir okie menu item jame buvo
// pro user orderiu mapinti

router.get("/:orderId",validate(validateOrderOrderId), ordersController.getOrder);

// Read Order for a User: Uses a GET API to fetch the details of a specific order for a specific user. The user ID and the order ID are provided as parameters, and the API returns the order if it belongs to the user.

// gauti user ID ir order ID, jeigu user uzsisake orderi, grazinti order details.

router.get("/:orderId/users/:userId",validate(validateOrderParams), ordersController.getOrderByUser);

// Delete Order for a User: Uses a DELETE API to remove a specific order for a specific user from the database. The user ID and the order ID are provided as parameters, and the API deletes the order if it belongs to the user.
// istrinti orderi id is userID, jie abu nurodyti kaip params

router.delete("/:orderId/users/:userId",validate(validateOrderParams), ordersController.deleteOrderByUser);

export default router;
