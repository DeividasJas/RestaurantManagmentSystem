import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import users from "../db/users.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

// userController i sita object sukeli visas funkcijas

const usersController = {
    getUsers: (req, res) => {
        try {
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({
            message: "Error  occured while retrieving data from localHost 3001",
          });
          console.error(error);
        }
      },
    createUsers: async (req, res) => {
        try {
          const newUser = {
            ...req.body,
            registered_on: new Date().toISOString().split("T")[0],
            id: users.length + 1
          };
      
          users.push(newUser);
      
          await fs.promises.writeFile(
            path.join(__dirname, "../db/users.json"),
            JSON.stringify(users, null, 2)
          );
          res.status(201).json(newUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({message: "something wrong"})
        }
      },
    userLogin: (req, res) => {
        try {
          //isitraukti is post request body suvesta info:
          const { name, password, email } = req.body;
      
          const user = users.find(
            (user) => user.name === name || user.email === email
          );
      
          if (!user) {
            res.status(404).json({ message: "User not found !" });
          }
      
          if (user.password !== password) {
            res.status(401).json({ message: "Invalid passwrod BROOO !" });
          }
      
          res.status(200).json({ message: "Congratulations, login successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Something wrong" });
        }
      },
      getUser: (req, res) => {
        try {
          // gauni ID kuris buna ivestas i URL
          const id = parseInt(req.params.id);
      
          // Gauti viena partotoja is user list pagal jo ID
          const user = users.find((user) => user.id === id);
      
          // Jeigu user nera turime grazinti kazkokia zinute, catch metodas netinka, nes jis apdoroja tik error. user neegzistavimas nera error.
          if (!user) {
            res.status(404).json({ message: "User not found." });
          }
      
          // Suradus vartotoja grazinama success zinute.
          res.status(200).json({ message: user });
      
          // Error message
        } catch (error) {
          res.status(404).json({ message: "User not found." });
          console.error(error);
        }
      },
      updateUser: async (req, res) => {
        //
        try {
          // Surandi user id pagal URL
          const id = parseInt(req.params.id);
      
          // Nesuprantu sitos eilutes... jau supranti
          // Okey - Sukuri 'updateUser' OBJ, i ji is'spread'ini savo surasyta request.body ir pridedi auksciau gauta ID
          const updateUser = { ...req.body, id };
      
          // Gauti user INDEX, user atnaujinsime pagal jo index (reikia zinoti kur iterpti informacija)
          let userIndex = users.findIndex((user) => user.id === id);
          if (userIndex === -1) {
            res.status(401).json({ message: "User not found" });
            return;
          }
      
          // Surasti user pagal URL ivesta id (params), jeigu tokio nera grazinti 404 result
          const user = users.find((user) => user.id === id);
          if (!user) {
            res.status(404).json({ message: "User not found." });
          }
      
          // Pakeisti surasta vartotoja ******************************************
          // Perlesti regitracijos sukurimo data (nenori jos perasyti)
      
          // updateUser.registered_on = users[userIndex].registered_on
          users.find((user) => {
            if (user.id === id) {
              return (updateUser.registered_on = user.registered_on);
            }
          });
      
          // SITA EILUTE VISIKAI NEAISKI.............
          updateUser.reservations = users[userIndex].reservations;
      
          // Ieškomas user = modifikuotas user (nepakeista data ir ID)
          users[userIndex] = updateUser;
      
          // Irasai gauta informacija is postman put request (todel naudojame AWAIT) i kita file './db/users.json'
          await fs.promises.writeFile(
            path.join(__dirname, "../db/users.json"),
            JSON.stringify(users, null, 2)
          );
      
          res.status(200).json({ message: updateUser });
        } catch (error) {
          res.status(404).json({ message: "User not found." });
          console.error(error);
        }
      },
      deleteUser:  async (req, res) => {
        try {
          // Surandi user id pagal URL
          const id = parseInt(req.params.id);
      
          // Susirasti iskomo userio INDEX
          let userIndex = users.findIndex((user) => user.id === id);
      
          // delete user from array
          users.splice(userIndex, 1);
      
          // Israsyti file pokycius i "./users.json"
          await fs.promises.writeFile(
            path.join(__dirname, "../db/users.json"),
            JSON.stringify(users, null, 2)
          );
      
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
      }

}


export default usersController;