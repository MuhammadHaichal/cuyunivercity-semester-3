import mysql from "mysql2"

const connectionDB = mysql.createConnection({ 
    host: "localhost",
    user: "root",
    password: "root",
    database: "cuyunivercity"
})

export default connectionDB