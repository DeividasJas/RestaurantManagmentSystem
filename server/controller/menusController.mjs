import menusModel from "../model/menusModels.mjs";

const menusController = {
  getMenus: async (req, res) => {
    try {
      const menus = await menusModel.getMenus();
      res.status(200).json(menus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Could not retrieve data" });
    }
  },
  // *******************************************************************
  // sukurti nauja menus items
  createMenusItem: async (req, res) => {
    try {
      // reikia sukurti toki item body:
      // "id": 1,
      // "name": "cepelinai",
      // "description": "su mesa",
      // "price": "10.00",
      // "category": "appetizer"

      const menusItemBody = req.body;
      const menusItem = await menusModel.createMenusItem(menusItemBody);

      res.status(200).json(menusItem);
    } catch (error) {
      res.status(500).json({
        message: "Could not create new item, talk to developer's team",
      });
      console.error(error);
    }
  },

  // *******************************************************************
  // *******************************************************************
  // *******************************************************************
  // surasti menus item pagal jo ID

  getMenusItemById: async (req, res) => {
    try {
      // Gauti ID is URL (param)
      const id = req.params.id;
      console.log(id);
      // Surasti menu item pagal jo ID ir false atsakyma
      const menuItem = await menusModel.getMenusItemById(id);
      if (!menuItem) {
        res.status(404).json({ message: "Item by Id not found" });
        return;
      }

      // status zinute
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(404).json({ message: "Id not found" });
      console.error(error);
    }
  },
  // *******************************************************************
  // surasti menus item pagal jo pavadinima,
  getMenusItemName: async (req, res) => {
    try {
      const itemName = req.params.name;
      const menuItem = await menusModel.getMenusItemName(itemName);

      console.log(itemName, menuItem);
      if (!menuItem) {
        res.status(404).json({ message: "Item by name not found" });
      }

      res.status(200).json(menuItem);
    } catch (error) {
      res.status(404).json({ message: "name not found" });
      console.error(error);
    }
  },

  updateMenusItem: async (req, res) => {
    try {
      // Gauti ID is URL (param)
      const id = req.params.id;
      const itemBody = req.body;

      // ikelti id ir itembody i menusModel, jis naudodamas query irasys nauja data i musu lentele
      const menuItem = await menusModel.updateMenusItem(id, itemBody);

      if (!menuItem) {
        res.status(404).json({ message: "menu item not found" });
        return;
      }

      // patikrinima naujus duomenis
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(404).json({ message: "Id not found" });
      console.error(error);
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const id = req.params.id;

      const deletedItem = await menusModel.deleteMenuItem(id)
      // if (menuItemIndex === -1) {
      //   res.status(400).json({ message: "Menu item not found" });
      //   return;
      // }

      res.status(200).json(deletedItem);
    } catch (error) {
      res.status(400).json({ message: "Menu item not found" });
      console.error(error);
    }
  },
};

export default menusController;
