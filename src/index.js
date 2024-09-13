import express from "express"

import connectionDB from "./db.js"
import response from "./response.js"

const app = express()
const port = 4000

app.get("/", (req, res) => {
  res.send("selamat datang di api aku")
})

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa"

  connectionDB.query(sql, (error, data) => {
    response(200, data, "successfuly get data", res)
  })
})

// cari mahasiswa berdasarkan nip
app.get("/mahasiswa/find", (req, res) => {
  const data_nim = req.query.nim.toString()
  const sql = `SELECT * FROM mahasiswa WHERE nim=${data_nim}`

  connectionDB.query(sql, (error, data) => {
    response(200, data, "successfuly get data", res)
  })
})

app.listen(port, () => {
  console.log(`
     SERVER BACKEND TELAH BERJALAN !
     HOST -> localhost
     PORT -> ${port}
  `)
})
