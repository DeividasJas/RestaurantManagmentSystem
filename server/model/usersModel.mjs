import { pool } from "../db/postgresConnection.mjs";

const userModel = {
  getUsers: async () => {
    try {
      const users = await pool.query("SELECT * FROM users");
      return users.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      return user.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createUser: async (newUser) => {
    try {
      const { username, email, password, phone, address, role, registered_on } =
        newUser;
      const user = await pool.query(
        "INSERT INTO users (username, email, password, role, registered_on, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [username, email, password, role, registered_on, phone, address]
      );
      return user.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserByUsername: async (username) => {
    try {
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      return user.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1',[userId])
        return result.rows[0]
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      const { username, email, password, role, phone, address } = updatedUser;
      const user = await pool.query(
        "UPDATE users SET username = $1, email = $2, password = $3, role = $4, phone_number = $5, address = $6 WHERE id = $7 RETURNING *",
        [username, email, password, role, phone, address, id]
      );
      return user.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      const deleteUser = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [userId]
      );
      return deleteUser.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userModel;
