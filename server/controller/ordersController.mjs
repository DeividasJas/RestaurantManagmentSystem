import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import orders from "../db/orders.json" assert { type: "json" };
import users from "../db/users.json" assert { type: "json" };
import menus from "../db/menus.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

// userController i sita object sukeli visas funkcijas

const ordersController = {
  getOrders: (req, res) => {
    try {
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
    }
  },
  sendOrder: async (req, res) => {
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

      console.log(user);
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
  },
  getOrder: async (req, res) => {
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
  },
  getOrderByUser: (req, res) => {
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
  },
  deleteOrderByUser: async (req, res) => {
    try {
      let { orderId, userId } = req.params;
      orderId = parseInt(orderId);
      userId = parseInt(userId);
      const user = users.find((user) => user.id === userId);
      const orderIndex = user.orders.findIndex(
        (orderNum) => orderNum === orderId
      );
      // error check
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      if (orderIndex === -1) {
        res.status(404).json({ message: "order within user not found" });
        return;
      }

      // good response
      if (user.orders.includes(orderId)) {
        user.orders.splice(orderIndex, 1);
        console.log(user.orders);
        await fs.promises.writeFile(
          path.join(__dirname, "../db/users.json"),
          JSON.stringify(users, null, 2)
        );
        res
          .status(200)
          .json({ message: "order successfully removed from user" });
        return;
      }

      // await fs.promises.writeFile(path.join(__dirname, "../db/users.json"), JSON.stringify(users, null, 2));

      console.log(orderIndex);
      // res.status(200).json({ message: 'orde' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "could not find specific order" });
    }
  },
};

// exportas
export default ordersController;
