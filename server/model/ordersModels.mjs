import { pool } from "../db/postgresConnection.mjs";

const ordersModels = {
  //   Veikia ++++++++++++++++++++++++++++++++++++++++++++++++++++

  getOrders: async () => {
    try {
      const result = await pool.query("SELECT * FROM orders");
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  //   Veikia ++++++++++++++++++++++++++++++++++++++++++++++++++++

  createOrder: async (userId, menuItemId, quantity) => {
    try {
      const result = await pool.query(
        "INSERT INTO orders (customer_id, menu_item_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [userId, menuItemId, quantity]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getOrderById: async (orderId) => {
    try {
      const result = await pool.query(
        `
        SELECT users.username, menus.name, menus.description, menus.price, menus.category
        FROM orders
        INNER JOIN users ON orders.customer_id = users.id
        INNER JOIN menus ON orders.menu_item_id = menus.id
        WHERE orders.id = $1
        `,
        [orderId]
      );
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getOrdersByUser: async (username) => {
    try {
      const result = await pool.query(
        `SELECT users.username, menus.name, menus.description, menus.price, menus.category
        FROM orders
        INNER JOIN users ON orders.customer_id = users.id
        INNER JOIN menus ON orders.menu_item_id = menus.id
        WHERE users.username = $1
        `,
        [username]
      );
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getOrdersByOrderIdUserId: async (userId, menusId) => {
    try {
      const result = await pool.query(
        `SELECT users.username, menus.name, menus.description, menus.price, menus.category
            FROM orders
            INNER JOIN users ON orders.customer_id = users.id
            INNER JOIN menus ON orders.menu_item_id = menus.id
            WHERE menus.id = $1 AND users.id = $2`,
        [menusId, userId]
      );
      return result.rows
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default ordersModels;

// await client.query('INSERT INTO table_name (column1, column2) VALUES (value1, value2)');

// `
// SELECT users.username, menus.*
// FROM orders
// INNER JOIN users ON orders.customer_id = users.id
// INNER JOIN menus ON orders.menu_item_id = menus.id
// WHERE users.id = 2 AND orders.id = 1
// `
