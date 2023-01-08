const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors');
// const /{ urlencoded } = require('body-parser');
const dataexp = require('json2csv').Parser;
const app = express()
app.use(express.json())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors())
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'details(crud)',
});

// app.get('/', (req, res) => {
//     const sqli = "INSERT INTO details (id,name,email,DOB,address,country) VALUES ('q','a','w','e','r');"
//     db.query(sqli, (err, result) => {
//         res.send(err)
//     });
//     // res.send('helo world121');
// })


app.get('/api/get', (req, res) => {
    const sqlInsert = "SELECT * FROM details"
    // [detname, detemail, detdob, detaddress, detcountry]/,
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.delete('/api/delete/:detname', (req, res) => {
    const name = req.params.detname
    const sqldelete = "DELETE FROM details WHERE name=?";
    // [detname, detemail, detdob, detaddress, detcountry]/,
    db.query(sqldelete, [name], (err, result) => {
        if (err) console.log(err)
    })
})

app.put('/api/update', (req, res) => {
    const name = req.params.detname
    const detemail = req.body.detemail
    const detdob = req.body.detdob
    const detaddress = req.body.detaddress
    const detcountry = req.body.detcountry
    const sqlupdate = "UPDATE SET details email=?,DOB=?,address=?,country=? WHERE name=?";
    // [detname, detemail, detdob, detaddress, detcountry]/,
    db.query(sqlupdate, [detemail, detdob, detaddress, detcountry, name], (err, result) => {
        if (err) console.log(err)
    })
})


app.post('/api/insert', (req, res) => {

    const detname = req.body.detname
    const detemail = req.body.detemail
    const detdob = req.body.detdob
    const detaddress = req.body.detaddress
    const detcountry = req.body.detcountry
    const sqlInsert = "INSERT INTO details (name,email,DOB,address,country) VALUES (?,?,?,?,?)"
    // [detname, detemail, detdob, detaddress, detcountry]/,
    db.query(sqlInsert, [detname, detemail, detdob, detaddress, detcountry], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('inserted')
        }

    })
    // console.log('post');
})

app.listen(3001, (req, res) => {
    console.log('server running 3001')
})