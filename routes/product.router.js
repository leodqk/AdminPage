const productController = require("../controllers/product.controller");
const upload = require("../upload-multer");

module.exports = (app) => {
  // Danh sách danh mục
  app.get("/san-pham", productController.index);
  // Xóa danh mục
  app.get("/xoa-san-pham/:id", productController.delete);

  // Sửa danh mục
  app.get("/sua-san-pham/:id", upload.single("image"), productController.edit);

  app.post(
    "/sua-san-pham/:id",
    upload.single("image"),
    productController.update
  );

  // Thêm danh mục
  app.get("/them-san-pham", productController.create);

  app.post("/them-san-pham", upload.single("image"), productController.store);
};
