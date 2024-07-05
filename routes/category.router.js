const categoryController = require("../controllers/category.controller");

module.exports = (app) => {
  // Danh sách danh mục
  app.get("/danh-muc", categoryController.index);
  // Xóa danh mục
  app.get("/xoa-danh-muc/:id", categoryController.delete);

  // Sửa danh mục
  app.get("/sua-danh-muc/:id", categoryController.edit);

  app.post("/sua-danh-muc/:id", categoryController.update);

  // Thêm danh mục
  app.get("/them-danh-muc", categoryController.create);

  app.post("/them-danh-muc", categoryController.store);
};
