require('dotenv').config()
const express = require('express')
const App = express()
const mysql = require('mysql')
const cors = require("cors")
//turso token
//eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTQ4MTUxOTgsImlkIjoiYmYzYmJiMzMtMjNlZi00MDI0LTllNDctM2NlZTQwYzMwNDg3In0.mJjXAjb42mXRyNk9csWjHJD_-ez0CJAouLDRPTW0s9L6C7TNOnocAZ6A9yamtIFpkcaTVLi-jmlKv6XpMy92CQ

App.use(cors())
App.use(express.json())
const PORT= process.env.PORT || 5000
 DB_NAME = "usuarios"
 const db = mysql.createConnection({
    host: process.env.DB_HOST ||"localhost",
    user: process.env.DB_USER ||"root",
    port: process.env.DB_DATABASE ||"3306",
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE ||"usuarios"
})

App.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;

    db.query('INSERT INTO usuarios(nombre,edad,pais,cargo,antiguedad) VALUES (?,?,?,?,?)', [nombre, edad, pais, cargo, antiguedad],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("usuario registrado")
            }
        }
    )
})
App.get("/usuarios", (req, res) => {
    db.query('SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
                }
            }
        )
    }
)
App.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;
    

    db.query('UPDATE usuarios SET nombre=?, edad=? ,pais=?, cargo=?, antiguedad=? WHERE id=?', [nombre, edad, pais, cargo, antiguedad,id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("usuario actualizado")
            }
        }
    )
})

App.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    
    

    db.query('DELETE FROM usuarios WHERE id=?', [id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})


App.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})