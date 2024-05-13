import fs, { appendFile, read } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import menus from "../db/menus.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const menusController = {
  getMenus: (req, res, next) => {
    try {
        // next()
      res.status(200).json({ menus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Could not retrieve data" });
    }
  },
  sendMenu: async (req, res) => {
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
      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );

      res.status(200).json({ message: newMenuItem });
    } catch (error) {
      res.status(500).json({
        message: "Could not create new item, talk to developer's team",
      });
      console.error(error);
    }
  },
  getMenu: (req, res) => {
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
  },
  updateMenu: async (req, res) => {
    try {
      // Gauti ID is URL (param)
      const id = parseInt(req.params.id);

      // susirasti menu item kuri atnaujinsime, jeigu nera grazinti error message
      const menuItemIndex = menus.findIndex((item) => item.id === id);
      if (menuItemIndex === -1) {
        res.status(404).json({ message: "Menu item not found" });
      }
      // sukurti menu item nauja informacija
      // const updatedMenuItem = { ...req.body, id };

      // menus[menuItemIndex] = updatedMenuItem;
      // updatedMenuItem.registered_on = menus[menuItemIndex].registered_on;

      // updatedMenuItem.creationDate = menus[menuItemIndex].creationDate

      // menus[menuItemIndex] = updatedMenuItem

      menus[menuItemIndex] = { ...menus[menuItemIndex], ...req.body, id };

      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );

      res.status(201).json({ message: updatedMenuItem });
    } catch (error) {
      res.status(404).json({ message: "Id not found" });
      console.error(error);
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const menuItemIndex = menus.findIndex((item) => item.id === id);
      if (menuItemIndex === -1) {
        res.status(400).json({ message: "Menu item not found" });
        return;
      }

      menus.splice(menuItemIndex, 1);

      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );

      // res.status(200).json({ message: "Item successfully deleted" })
      res.status(200).json({ message: menuItemIndex });
    } catch (error) {
      res.status(400).json({ message: "Menu item not found" });
      console.error(error);
    }
  },
};

export default menusController;
