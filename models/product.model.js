const connect = require("../connect-mysql");
const util = require("node:util");
const Category = require("./category.model");

const query = util.promisify(connect.query).bind(connect);

const getAllProducts = async (_name, _start, _limit) => {
  let sql =
    "SELECT p.*, c.name as cname FROM product p JOIN category c ON p.category_id = c.id";
  if (_name) {
    sql += " WHERE name like '%" + _name + "%'";
  }
  sql += " order by id DESC LIMIT " + _start + "," + _limit;
  return await query(sql);
};

const getTotalCount = async (_name) => {
  let sql = "SELECT count(*) as total FROM product";
  if (_name) {
    sql += " WHERE name like '%" + _name + "%'";
  }
  const rowData = await query(sql);
  return rowData[0].total;
};

const deleteProduct = async (id) => {
  let sql = "DELETE FROM product WHERE id = ?";
  return await query(sql, [id]);
};

const createProduct = async (categoryData) => {
  let sql = "INSERT INTO product SET ?";
  return await query(sql, categoryData);
};

const getProductById = async (id) => {
  let sql = "SELECT * FROM product WHERE id = ?";
  const rows = await query(sql, [id]);
  return rows[0];
};

const updateProduct = async (id, productData) => {
  let sql = "UPDATE product SET ? WHERE id = ?";
  return await query(sql, [productData, id]);
};

module.exports = {
  getAllProducts,
  getTotalCount,
  deleteProduct,
  createProduct,
  getProductById,
  updateProduct,
};
