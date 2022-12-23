const http = require('http');
const ejs = require("ejs")
const express = require("express")
const app = express()
const mysql = require("mysql");
const BodyParser = require("body-parser")


app.use(BodyParser.urlencoded({ extended: true }))

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mahasiswa"
})

app.set("view engine", "ejs")

con.connect((err) => {

  if (err) throw err;
  console.log("Connected")

  // untuk mengambil data dari database ke HTML
  app.get("/", (req, res) => {
    // res.render(result)
    list = "SELECT * FROM murid"
    con.query(list, (err, result) => {
      if (err) throw err;
      console.log("LIst Mahasiswa")
      // console.log(murid)
      murid = JSON.parse(JSON.stringify(result))
      res.render("pages/index", { users: murid, title: "List Murid" })
    })

  })

  // untuk insert data
  app.post("/tambah", (req, res) => {
    const insertSQL = `INSERT INTO murid (nama, umur, jurusan) VALUES ("${req.body.nama}", "${req.body.umur}", "${req.body.jurusan}")`
    con.query(insertSQL, (err, result) => {
      if (err) throw err;
      res.redirect("/")
  
    })
  })

})

app.listen(8080, () => {
  console.log("Terhubung ke file HTML")
})