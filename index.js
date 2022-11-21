const express = require("express");
const fileUpload = require("express-fileupload");

// const { connect } = require('http2');
const knex = require("knex");
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const db = knex.default({
  client: "mysql2",
  connection: {
    user: "root",
    password: "kitsanapong",
    host: "127.0.0.1",
    port: 3306,
    database: "dbsour20",
  },
});

// const multer  = require('multer')
// const upload = multer();

const fs = require("fs");
const { Blob } = require("buffer");

const mysql = require(`mysql-await`);
//create database connection
const conn = mysql.createConnection({
  host: "mysql-sour20.alwaysdata.net",
  user: "sour20",
  password: "kitsanapong",
  database: "sour20_stocker",
});

const cors = require("cors");
const app = express();

app.use("/static", express.static("static"));

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));
app.use(cors());

const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.render("home");
});

conn.connect((err) => {
  console.log(err);
  if (err) throw err;
  console.log("Mysql Connected...");
});

// INSERT INTO `test` (`id`, `file`) VALUES (NULL,?);
// app.post("/",  async (req, res) => {
//   const file = req.files.product_img.data;

//   console.log(file);

//   const results = [];

//   try {
//     results = await db
//       .insert({
//         file
//       })
//       .into("test");

      
//   } catch (err) {
//     console.error(err);
//     console.log(results);

//   }

// });

app.post("/",  async (req, res) => {
    const file = req.files.product_img.data;
  
    console.log(file);
  
    const results = [];
  
    try {
        let sql = "INSERT INTO `test` (`id`, `file`) VALUES (NULL,?)";
        let results = await conn.awaitQuery(sql, file);
        return JSON.stringify({ "status": 200, "error": null, "response": results });
    } catch (err) {
        return JSON.stringify({ "status": 500, "error": err, "response": results });
    }


  });

app.listen(3002, () => {
  console.log("start");
  console.log("http://localhost:3002/");
});
