import { pool } from "../db/postgresConnection.mjs";
const menusModel = {
  getMenus: async () => {
    try {
      const result = await pool.query("SELECT * FROM menus");
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMenusItemById: async (menuId) => {
    try {
      const result = await pool.query("SELECT * FROM menus WHERE id = $1", [
        menuId,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMenusItemName: async (itemName) => {
    try {
      console.log(itemName);
      const result = await pool.query("SELECT * FROM menus WHERE name = $1", [
        itemName,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createMenusItem: async (itemBody) => {
    try {
      const { name, description, price, category } = itemBody;
      const result = await pool.query(
        "INSERT INTO menus (name , description, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, category]
      );
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // await client.query('UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition');

  updateMenusItem: async (itemId, itemBody) => {
    // query update
    try {
      const { name, description, price, category } = itemBody;
      const result = await pool.query(
        "UPDATE menus SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *",
        [name, description, price, category, itemId]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // await client.query('DELETE FROM table_name WHERE condition');
  deleteMenuItem: async (itemId) => {
    try {
      const result = await pool.query("DELETE FROM menus WHERE id = $1 RETURNING *",[itemId]);
      return result.rows[0]
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default menusModel;
// column1, column2) VALUES (value1, value2)
