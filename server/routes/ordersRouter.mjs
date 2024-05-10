// *************************************************************************************
// KONFIGURACIJA
// *******************************************************************************
if (process.env.NODE_ENV === "development") {
  console.log("Running development NODE");
}

import express from "express";
import fs, { appendFile, read } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import orders from "../db/orders.json" assert { type: "json" };
import users from "../db/users.json" assert { type: "json" };
import menus from "../db/menus.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  try {
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
  }
});

// Order Service: id, customerId, Items: [menuItemId, quantity]

// Nebūtina:

// Total: The total price of the order. This could be calculated as the sum of the prices of the MenuItems in the order, each multiplied by its quantity.

// Status: The current status of the order. This could be a string with values like 'placed', 'preparing', 'ready', 'served', 'paid',

// Order Time: The time when the order was placed. This could be automatically set to the current time when the order is created.

// Create Order for a User: Uses a POST API to accept order details. The order details, including the user ID and the IDs and quantities of the ordered menu items, are stored in the database.

router.post("/:userId", async (req, res) => {
  try {
    // All params and query's values
    const userId = Number(req.params.userId);
    const orderBody = [...req.body.items];

    const orderId = orders.length + 1;

    //  change orders
    // add +1 to object key
    // const orderItems = [...orderBody]
    // Object.keys(orderBody).forEach((key) => {
    //   const newKeyValue = parseInt(key) +1
    //   orderItems[newKeyValue.toString()] = orderBody[key]
    // })

    // change order
    const order = { orderId, userId, orderBody };
    orders.push(order);

    // change user
    const user = users.find((user) => user.id === userId);
    user.orders.push(orderId);

    await fs.promises.writeFile(
      path.join(__dirname, "../db/users.json"),
      JSON.stringify(users, null, 2)
    );
    await fs.promises.writeFile(
      path.join(__dirname, "../db/orders.json"),
      JSON.stringify(orders, null, 2)
    );

    res.status(200).json({ message: "order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "could not create order" });
    console.error(error);
  }
});

// Read Orders for a User: Uses a GET API to fetch all orders for a specific user. The user ID is provided as a parameter, and the API returns all orders that have this user ID.
// nurodyti order id ir gauti to order userID ir okie menu item jame buvo
// pro user orderiu mapinti

router.get("/:orderId", async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);

    const order = orders[orderId - 1];
    const userId = order.orderId;

    // item content
    // const items = [
    //   {menuItemId: order.orderBody.menuItemId}

    // ]
    const items = order.orderBody.map((item) => {
      return item;
    });

    const orderItemsInfo = [];

    for (let i = 0; i < items.length; i++) {
      orderItemsInfo.push({
        menuItemId: items[i].menuItemId,
        quantity: items[i].quantity,
        item: menus[items[i].menuItemId],
      });
    }

    const orderInfo = { orderId, userId, orderItemsInfo };

    console.log(orderInfo);
    res.status(200).json(orderInfo);
  } catch (error) {
    res.status(500).json({ message: "could not get order details" });
    console.error(error);
  }
});

// Read Order for a User: Uses a GET API to fetch the details of a specific order for a specific user. The user ID and the order ID are provided as parameters, and the API returns the order if it belongs to the user.

// gauti user ID ir order ID, jeigu user uzsisake orderi, grazinti order details.

router.get("/:orderId/users/:userId", (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const userId = parseInt(req.params.userId);

    const order = orders.find((order) => order.orderId === orderId);

    const user = users.find((user) => user.id === userId);

    if (!user || !order) {
      res.status(404).json({ message: "user or order id's not found" });
      return;
    }

    const items = order.orderBody.map((item) => {
      const menuItems = menus.find(
        (menuItem) => menuItem.id === item.menuItemId
      );
      return {
        ...item,
        name: menuItems.name,
      };
    });

    // const orderInfo = user.orders.map()
    // const answer = {
    //   userid: users[user].id,
    //   orderid: orderId,
    //   // orderContent:
    // };

    const orderInfo = {
      orderId,
      userId,
      Items: items,
    };

    console.log(orderInfo);

    res.status(200).json(orderInfo);
  } catch (error) {
    res.status(500).json({ message: "could not get specific order details" });
    console.error(error);
  }
});

// Delete Order for a User: Uses a DELETE API to remove a specific order for a specific user from the database. The user ID and the order ID are provided as parameters, and the API deletes the order if it belongs to the user.

export default router;
