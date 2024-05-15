// *************************************************************************************
// KONFIGURACIJA

import express from "express";
import menusController from "../controller/menusController.mjs";
import {
  meniuValidationSchema,
  validateMenuIdSchema,
} from "../validator/menusSchemaValidation.mjs";
import { validate } from "../middleware/schemaValidation.mjs";

const router = express.Router();

router.use(express.json());

// *************************************************************************************
// SHOW FULL MENU
router.get("/", menusController.getMenus);

// *************************************************************************************
// Create Menu Item: Uses a POST API to accept menu item details. The menu item details are stored in the storage.
// Sukurti nauja menu item
router.post("/", validate(meniuValidationSchema), menusController.createMenusItem);

// *************************************************************************************
// Read Menu Item: Uses a GET API to fetch menu item details based on item ID.

router.get("/:id", validate(validateMenuIdSchema), menusController.getMenusItemById);

// *************************************************************************************
// gauti menu item pagal jo name
router.get("/name/:name", menusController.getMenusItemName)

// *************************************************************************************
// Update Menu Item: Uses a PUT API to update menu item details based on item ID.

router.put(
  "/:id",
  validate(validateMenuIdSchema, meniuValidationSchema),
  menusController.updateMenusItem
);

// *************************************************************************************
// Delete Menu Item: Uses a DELETE API to remove a menu item from the JSON file based on item ID.
// Istrinti vartotoja

router.delete("/:id",validate(validateMenuIdSchema), menusController.deleteMenu);

export default router;
 