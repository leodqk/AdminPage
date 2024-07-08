const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.index = async (req, res) => {
  let _name = req.query.name;
  let _page = req.query.page ? parseInt(req.query.page) : 1;
  let _limit = 5;

  const totalRow = await Product.getTotalCount(_name);
  const totalPage = Math.ceil(totalRow / _limit);

  _page = Math.max(1, Math.min(_page, totalPage));
  const _start = (_page - 1) * _limit;

  const products = await Product.getAllProducts(_name, _start, _limit);

  res.render("product.ejs", {
    data: products,
    title: "Quản lý sản phẩm",
    totalPage,
    _page,
    _name,
  });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.deleteProduct(id);
  res.redirect("/san-pham");
};

exports.create = (req, res) => {
  Category.dataCombobox((err, data) => {
    console.log(data),
      res.render("product-add", {
        items: data,
      });
  });
};

exports.store = async (req, res) => {
  let bodyData = req.body;
  bodyData.image = req.file.filename;
  console.log(bodyData);

  await Product.createProduct(req.body);
  res.redirect("/san-pham");
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.getProductById(id);
  console.log("product", product);
  Category.dataCombobox((err, data) => {
    console.log(data),
      res.render("product-edit", {
        items: data,
        product: product,
      });
  });
  // res.render("product-edit", {
  //   item: category,
  // });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  if (req.file) {
    req.body.image = req.file.originalname;
  }
  await Product.updateProduct(id, req.body);
  res.redirect("/san-pham");
};
