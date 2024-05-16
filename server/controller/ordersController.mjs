import ordersModels from "../model/ordersModels.mjs";
import menusModel from "../model/menusModels.mjs";
import usersModel from "../model/usersModel.mjs";

// userController i sita object sukeli visas funkcijas

const ordersController = {
  //   Veikia ++++++++++++++++++++++++++++++++++++++++++++++++++++
  getOrders: async (req, res) => {
    try {
      const allOrders = await ordersModels.getOrders();
      res.status(200).json(allOrders);
    } catch (error) {
      console.error(error);
    }
  },

  //   Veikia ++++++++++++++++++++++++++++++++++++++++++++++++++++
  createOrder: async (req, res) => {
    try {
      // All params and query's values
      const userId = req.params.userId;
      const menuItemId = req.params.menuId;
      const { quantity } = req.body;

      //   const order = { orderId, userId, orderBody };

      const user = await usersModel.getUserById(userId);
      const menuItem = await menusModel.getMenusItemById(menuItemId);

      console.log(user);

      const orderItem = await ordersModels.createOrder(
        user.id,
        menuItem.id,
        quantity
      );

      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "could not create order" });
      console.error(error);
    }
  },
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const orderById = await ordersModels.getOrderById(orderId);

      //   //   zinai ka uzsisake
      //   const menuItem = await menusModel.getMenusItemById(
      //     orderById.menu_item_id
      //   );

      res.status(200).json(orderById);
    } catch (error) {
      res.status(500).json({ message: "could not get order details" });
      console.error(error);
    }
  },
  getOrdersByUser: async (req, res) => {
    try {
      const username = req.params.username;
      // console.log(username);
      const allUserOrders = await ordersModels.getOrdersByUser(username);
      console.log(allUserOrders);

      res.status(200).json(allUserOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "could not get specific order details" });
    }
},

getOrdersByOrderIdUserId: async () => {
    try {
        const userId = req.params.userId
        const orderId = req.params.orderId
        
        const ordersByOrderIdAndUserId = await ordersModels.getOrdersByOrderIdUserId()
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "could not get specific order details" });
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
