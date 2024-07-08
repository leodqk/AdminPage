const Category = require("../models/category.model");

exports.index = async (req, res) => {
  let _name = req.query.name;
  let _page = req.query.page ? parseInt(req.query.page) : 1;
  let _limit = 5;

  const totalRow = await Category.getTotalCount(_name);
  const totalPage = Math.ceil(totalRow / _limit);

  _page = Math.max(1, Math.min(_page, totalPage));
  const _start = (_page - 1) * _limit;

  const categories = await Category.getAllCategories(_name, _start, _limit);

  res.render("category", {
    data: categories,
    title: "Quản lý danh mục",
    totalPage,
    _page,
    _name,
  });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Category.deleteCategory(id);
  res.redirect("/danh-muc");
};

exports.create = (req, res) => {
  res.render("category-add");
};

exports.store = async (req, res) => {
  await Category.createCategory(req.body);
  res.redirect("/danh-muc");
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  const category = await Category.getCategoryById(id);
  res.render("category-edit", {
    items: category,
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Category.updateCategory(id, req.body);
  res.redirect("/danh-muc");
};
