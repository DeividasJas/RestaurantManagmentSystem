// if (process.env.NODE_ENV === "development") {
//   console.log("Running development NODE");
// }

import express from "express";
import usersController from "../controller/usersController.mjs";
import { validate } from "../middleware/schemaValidation.mjs";
import {
  userValidationSchema,
  loginValidationSchema,
  updateUserValidationSchema,
  validateReservationParams,
  validateUserIdSchema,
} from "../validator/usersSchemaValidation.mjs";

const router = express.Router();

router.use(express.json());

// router.get("/", (req, res) => {
//   res.send("Restorano konfiguracija");
//   // res.json({ user: "tj" });
//   // res.status(404).send("not found");

//   // const filePath = path.join(__dirname, "haha.txt");
//   // res.download(filePath);
// });

// **********************************************************************
// 1. gavau visus USERS

router.get("/", usersController.getUsers);

// ********************************************************************
// 2. ikelti naujus user i sistema

router.post("/",validate(userValidationSchema), usersController.createUsers);

// ****************************************************************************
// 3. prisijungti /Login User: Uses a POST API to log in the user.

router.post("/login",validate(loginValidationSchema), usersController.userLogin);

//  ************************************************************************
// Read User: Uses a GET API to fetch user details based on user ID.
// 4. Gauti viena user pagal jo ID

router.get("/:id",validate(validateUserIdSchema, validateUserIdSchema), usersController.getUser);

// ************************************************************************
// Update User: Uses a PUT API to update user details based on user ID.

router.put("/update/:id",validate(validateUserIdSchema, userValidationSchema), usersController.updateUser);

// ***************************************************************************
// Delete User: Uses a DELETE API to remove a user from the storage based on user ID.
// Istrinti vartotoja pagal URL nurodyta ID

router.delete("/delete/:id",validate(validateUserIdSchema), usersController.deleteUser);

export default router;
