const express = require("express");
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.listen(process.env.PORT || 3000, () => {

        console.log("Server started (http://localhost:3000/) !");
});


app.use(express.static(__dirname + '../public'));

app.get("/", (req, res) => {
        //     res.send("Hello world...");
        res.render("index");
});
app.get("/about", (req, res) => {
        res.render("about");
});
app.get("/data", (req, res) => {
        const test = {
                title: "Test",
                items: ["one", "two", "three"]
        };
        res.render("data", { model: test });
});

DATABASE_URL = "postgres://gzrfjjxbhbirgr:c74369623d45fb5b953bde89c90e5eb605ab9801a269b6bfa7154e854d50f1c2@ec2-54-224-120-186.compute-1.amazonaws.com:5432/dadrkechdha7i9";
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.get("/books", (req, res) => {
        const sql = "SELECT * FROM Books"
        pool.query(sql, [], (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          res.render("books", { model: result.rows });
        });
      });