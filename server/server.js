const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8081

//make connection between dbsever and node app

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db_erp"
})

// middleware
app.use(express.json())
app.use(cors())

// register EndPoint
app.post('/register', (req, res) => {
    const {username, email, password, role} = req.body;

    // hash passwrd
    bcrypt.hash(password, 10, (err, hashPass) => {
        if(err) throw err;

        // save the user to database

        // get current time
        var createTime = new Date();
        var updateTime = new Date();

        connection.query(
            'INSERT INTO users(username, email, role, password, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, role, hashPass, createTime, updateTime],
            (error, result) => {
                if(error) throw error;
                res.status(201).send("User registered Successfully");
            }
        );
    });
});

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));