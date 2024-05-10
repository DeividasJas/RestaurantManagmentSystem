// *************************************************************************************
// KONFIGURACIJA
if (process.env.NODE_ENV === "development") {
  console.log("Running development NODE");
}

import express from "express";
import fs, { appendFile, read } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import menus from "../db/menus.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use(express.json());

// *************************************************************************************
// SHOW FULL MENU
router.get("/", (req, res) => {
  try {
    res.status(200).json({ menus })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not retrieve data" })
  }
})

// *************************************************************************************
// Create Menu Item: Uses a POST API to accept menu item details. The menu item details are stored in the storage.
// Sukurti nauja menu item
router.post("/", async (req, res) => {
  try {
    // Sukurimo data
    const creationDate = new Date().toISOString().split("T")[0];
    // sukurti nauja id
    const id = menus.length + 1;

    // Sukurti nauja menu item
    const newMenuItem = { ...req.body, id, creationDate };

    // Ikeli nauja menu item i menu
    menus.push(newMenuItem);

    // console.log(req.body);
    await fs.promises.writeFile(path.join(__dirname, "../db/menus.json"),
      JSON.stringify(menus, null, 2)
    );

    res.status(200).json({ message: newMenuItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not create new item, talk to developer's team" });
    console.error(error);
  }
});

// *************************************************************************************
// Read Menu Item: Uses a GET API to fetch menu item details based on item ID.

router.get("/:id", (req, res) => {
  try {
    // Gauti ID is URL (param)
    const id = parseInt(req.params.id);

    // Surasti menu item pagal jo ID ir false atsakyma
    const menuItem = menus.find((item) => item.id === id);
    if (!menuItem) {
      res.status(404).json({ message: "Item by Id not found" });
      return;
    }

    // status zinute
    res.status(200).json({ menuItem });
  } catch (error) {
    res.status(404).json({ message: "Id not found" });
    console.error(error);
  }
});

// *************************************************************************************
// Update Menu Item: Uses a PUT API to update menu item details based on item ID.

router.put("/:id", async (req, res) => {
  try {
    // Gauti ID is URL (param)
    const id = parseInt(req.params.id);

    // susirasti menu item kuri atnaujinsime, jeigu nera grazinti error message
    const menuItemIndex = menus.findIndex((item) => item.id === id);
    if (menuItemIndex === -1) {
      res.status(404).json({ message: "Menu item not found" })
    }
    // sukurti menu item nauja informacija
    // const updatedMenuItem = { ...req.body, id };

    // menus[menuItemIndex] = updatedMenuItem;
    // updatedMenuItem.registered_on = menus[menuItemIndex].registered_on;

    // updatedMenuItem.creationDate = menus[menuItemIndex].creationDate

    // menus[menuItemIndex] = updatedMenuItem

    menus[menuItemIndex] = { ...menus[menuItemIndex], ...req.body, id }


    await fs.promises.writeFile(path.join(__dirname, "../db/menus.json"), JSON.stringify(menus, null, 2));

    res.status(201).json({ message: updatedMenuItem });
  } catch (error) {
    res.status(404).json({ message: "Id not found" });
    console.error(error);
  }
});

// *************************************************************************************
// Delete Menu Item: Uses a DELETE API to remove a menu item from the JSON file based on item ID.
// Istrinti vartotoja

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const menuItemIndex = menus.findIndex(item => item.id === id)
    if(menuItemIndex === -1){
      res.status(400).json({message: "Menu item not found"})
      return
    }
    
    menus.splice(menuItemIndex, 1)

    await fs.promises.writeFile(path.join(__dirname, "../db/menus.json"), JSON.stringify(menus, null, 2));

    // res.status(200).json({ message: "Item successfully deleted" })
    res.status(200).json({ message: menuItemIndex })
  } catch (error) {
    res.status(400).json({ message: "Menu item not found" });
    console.error(error);
  }
})


export default router;