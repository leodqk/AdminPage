const connect = require("../connect-mysql");
const util = require("node:util");

const query = util.promisify(connect.query).bind(connect);

const getAllCategories = async (_name, _start, _limit) => {
  let sql = "SELECT * FROM category";
  if (_name) {
    sql += " WHERE name like '%" + _name + "%'";
  }
  sql += " order by id DESC LIMIT " + _start + "," + _limit;
  return await query(sql);
};

const dataCombobox = (myFun) => {
  connect.query(
    "SELECT id, name FROM category ORDER BY name ASC",
    function (err, data) {
      myFun(err, data);
    }
  );
};

const getTotalCount = async (_name) => {
  let sql = "SELECT count(*) as total FROM category";
  if (_name) {
    sql += " WHERE name like '%" + _name + "%'";
  }
  const rowData = await query(sql);
  return rowData[0].total;
};

const deleteCategory = async (id) => {
  let sql = "DELETE FROM category WHERE id = ?";
  return await query(sql, [id]);
};

const createCategory = async (categoryData) => {
  let sql = "INSERT INTO category SET ?";
  return await query(sql, categoryData);
};

const getCategoryById = async (id) => {
  let sql = "SELECT * FROM category WHERE id = ?";
  const rows = await query(sql, [id]);
  return rows[0];
};

const updateCategory = async (id, categoryData) => {
  let sql = "UPDATE category SET ? WHERE id = ?";
  return await query(sql, [categoryData, id]);
};

module.exports = {
  getAllCategories,
  getTotalCount,
  deleteCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  dataCombobox,
};
