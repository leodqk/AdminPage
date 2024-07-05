const express = require("express");
const app = express();

// Sử dụng body-parser
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Sử dụng ejs
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

// Sử dụng file tĩnh
app.use(express.static("public"));

// Sử dụng router
const homeRouter = require("./routes/home.router");
homeRouter(app);
const categoryRouter = require("./routes/category.router");
categoryRouter(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
