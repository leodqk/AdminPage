const homeController = require("../controllers/home.controller");

module.exports = (app) => {
  app.get("/", homeController.home);
  app.get("/about", homeController.about);
  app.get("/contact", homeController.contact);
};
