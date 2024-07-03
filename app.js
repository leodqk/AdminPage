const express = require("express");
const app = express();

// Kết nối database
const connect = require("./connect-mysql");

// Sử dụng module util
const util = require("node:util");

// Sử dụng body-parser
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Sử dụng ejs
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

// Sử dụng module util để chuyển connect.query thành promise
const query = util.promisify(connect.query).bind(connect);

// Sử dụng file tĩnh
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/danh-muc", async (req, res) => {
  let _name = req.query.name;
  let sql = "SELECT * FROM category";

  // Lấy trang hiện tại
  let _page = req.query.page ? req.query.page : 1;

  // Truy vấn lấy tổng số dòng
  let _sql_total = "SELECT count(*) as total FROM category";
  if (_name) {
    _sql_total += " WHERE name like '%" + _name + "%'";
  }

  // Cách 2: Dùng async await
  let rowData = await query(_sql_total);
  let totalRow = rowData[0].total;
  let _limit = 5;

  // Tính tổng số trang
  totalPage = Math.ceil(totalRow / _limit);

  // Xử lí logic trang phía server
  _page = _page > 0 ? Math.floor(_page) : 1;
  _page = _page <= totalPage ? Math.floor(_page) : totalPage;

  // Tính vị trí bắt đầu
  let _start = (_page - 1) * _limit;
  if (_name) {
    sql += " WHERE name like '%" + _name + "%'";
  }
  sql += " order by id DESC LIMIT " + _start + "," + _limit;

  console.log(sql);

  // Cách 1: Dùng trực tiếp query
  connect.query(sql, (err, data) => {
    res.render("category", {
      data: data ? data : [],
      title: "Quản lý danh mục",
      totalPage: totalPage,
      _page: _page,
      _name: _name,
    });
  });
});

// Xóa danh mục
app.get("/xoa-danh-muc/:id", (req, res) => {
  let id = req.params.id;
  let sql_delete = "DELETE FROM category WHERE id = ?";
  connect.query(sql_delete, [id], (err, data) => {
    res.redirect("/danh-muc");
  });
});

// Sửa danh mục
app.get("/sua-danh-muc/:id", (req, res) => {
  let id = req.params.id;
  connect.query("SELECT * FROM category WHERE id = ?", [id], (err, data) => {
    console.log(data);
    res.render("category-edit", {
      item: data.lenght ? data[0] : {},
    });
  });
});

app.get("/them-danh-muc", (req, res) => {
  res.render("category-add");
});

// Thêm danh mục
app.post("/them-danh-muc", (req, res) => {
  // Tránh SQL Injection
  let sql = `INSERT INTO category SET ?`;

  // MySQL sẽ tự động chuyển đổi dữ liệu từ form thành object
  // INSERT INTO category SET name = 'xe tăng', status = 1;
  connect.query(sql, req.body, (err, data) => {
    res.redirect("/danh-muc");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
