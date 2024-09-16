import express from "express"
import bodyParser from "body-parser"
import response from "./response.js"
import db from "./db.js"

const port = 4000
const app = express()

app.use(bodyParser.json({ type: "application/json" }))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa"

  db.query(sql, (error, fields) => {
    if (error) throw error
    response(200, fields, "Berhasil mengambil data mahasiswa", res)
  })
})

app.get("/mahasiswa/find", (req, res) => {
  const nim = req.query.nim.toString()
  const sql = `SELECT * FROM mahasiswa WHERE nim=${nim}`

  db.query(sql, (error, fields) => {
    if (error) throw error
    response(200, fields, "Berhasil mengambil data mahasiswa", res)
  })
})

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`
  db.query(sql, (error, fields) => {
    if (error) return response(400, null, "Masukan data dengan valid !", res)
    console.log(error)

    if (fields.affectedRows == 1) {
      response(201, null, "Berhasil meng-input user", res)
    }
  })
})

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body
  const sql = `UPDATE mahasiswa SET nama_lengkap='${namaLengkap}', kelas='${kelas}', alamat='${alamat}' WHERE nim=${nim}`

  db.query(sql, (error, fields) => {
    if (error) response(500, null, "kesalahan", res)
    console.log({ errorUpdate: error })

    const data = {
      isSuccess: fields.affectedRows,
      message: fields.info
    }

    if (fields.affectedRows == 1) {
      response(200, data, "Berhasil meng-update mahasiswa", res)
    } else {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.info
      }
      response(404, data, "Mahasiswa tidak ditemukan", res)
    }
  })
})

app.delete("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim
  const sql = `DELETE FROM mahasiswa WHERE nim='${nim}'`

  db.query(sql, (error, fields) => {
    if (error)
      return response(500, null, "kesalahan, silakan hubungi admin", res)
    console.log({ error })

    if (fields.affectedRows == 1) {
      const data = {
        isSuccess: fields.affectedRows
      }

      response(200, data, "Berhasil menghapus mahasiswa", res)
    } else {
      const data = { isSuccess: fields.affectedRows }
      response(404, data, "Mahasiswa tidak ditemukan", res)
    }
  })
})

app.listen(port, "0.0.0.0", () => {
  console.log(`
     SERVER BACKEND TELAH BERJALAN !
     PORT -> ${port}
  `)
})
