import userModel from "../model/usersModel.mjs";
// userController i sita object sukeli visas funkcijas

const usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Error  occured while retrieving data from localHost 3001",
      });
      console.error(error);
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        repeatPassword,
        role = "user",
        phone,
        address,
      } = req.body;
      // const email =

      const exsitingUser = await userModel.getUserByEmail(email);
      if (exsitingUser) {
        res.status(400).json({ message: "user with this email already exist" });
      }

      if (password !== repeatPassword) {
        res.status(400).json({ message: "password does not match" });
      }
      const newUser = {
        username,
        email,
        password,
        phone,
        address,
        registered_on: new Date().toISOString().split("T")[0],
        role,
      };
      const createdUser = await userModel.createUser(newUser);

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "something wrong" });
    }
  },
  getUserByUsername: async (req, res) => {
    try {
      const username = req.params.username;
      const user = await userModel.getUserByUsername(username);
      if (user.length === 0) {
        res.status(404).json({ message: "user by username not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "cannot reach server" });
    }
  },
  getUserById: async (req, res) => {
    try {
      // extract id from params
      const id = req.params.id;

      const userById = await userModel.getUserById(id);

      res.status(200).json(userById);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "cannot reach server" });
    }
  },
  // userLogin: (req, res) => {
  //     try {
  //         //isitraukti is post request body suvesta info:
  //         const { name, password, email } = req.body;

  //         const user = users.find(
  //             (user) => user.name === name || user.email === email
  //         );

  //         if (!user) {
  //             res.status(404).json({ message: "User not found !" });
  //         }

  //         if (user.password !== password) {
  //             res.status(401).json({ message: "Invalid passwrod BROOO !" });
  //         }

  //         res.status(200).json({ message: "Congratulations, login successfully" });
  //     } catch (error) {
  //         console.error(error);
  //         res.status(500).json({ message: "Something wrong" });
  //     }
  // },
  // getUser: (req, res) => {
  //     try {
  //         // gauni ID kuris buna ivestas i URL
  //         const id = parseInt(req.params.id);

  //         // Gauti viena partotoja is user list pagal jo ID
  //         const user = users.find((user) => user.id === id);

  //         // Jeigu user nera turime grazinti kazkokia zinute, catch metodas netinka, nes jis apdoroja tik error. user neegzistavimas nera error.
  //         if (!user) {
  //             res.status(404).json({ message: "User not found." });
  //         }

  //         // Suradus vartotoja grazinama success zinute.
  //         res.status(200).json({ message: user });

  //         // Error message
  //     } catch (error) {
  //         res.status(404).json({ message: "User not found." });
  //         console.error(error);
  //     }
  // },
  updateUser: async (req, res) => {
    try {
      // Surandi user id pagal URL
      const id = req.params.id;
      const { email } = req.body;
      const updatedUser = req.body;

      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "email already exist" });
        return;
      }

      const updateUser = await userModel.updateUser(id, updatedUser);
      if (!updateUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(updateUser);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Error occured while updating the user." });
      console.error(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      // Surandi user id pagal URL
      const id = req.params.id;
      const deletedUser = await userModel.deleteUser(id);
      // grazinti request status. 200/400
      res
        .status(200)
        .json({ message: `User with ID: ${id} was successfully deleted` });
      // res.status(200).json({ message: userIndex });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Cannot delete the user, problem ocured." });
      console.error(error);
    }
  },
};

export default usersController;
