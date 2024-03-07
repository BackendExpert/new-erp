const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 8081

//file  upload
const stroge = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename:(req, file, cb) =>{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:stroge
})



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


// Login Endpoint
app.post('/login', (req, res) => {
    const {email, password} = req.body;

    //find email for database
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, result) => {
            if(error) throw error;
            
            if(result.length > 0){

                //compare the Password
                bcrypt.compare(password, result[0].password, (err, passMatch) => {
                    if(err) throw error;

                    if(passMatch) {
                        // generate JWT Token
                        const token = jwt.sign(
                            {email: result[0].email, role: result[0].role },
                            'your-secret-key',
                            {expiresIn: '1h' }
                        );
                        res.json({ token:token, Msg:"success", CheckRole:result });
                    }
                    else {
                        res.status(401).send("Invalid Credentials");
                    }
                });
            }
            else{
                res.status(401).send("Invalid Credentials");
            }
        }
    );
});


// Count Admins Roles
app.get('/AdminCount', (req, res) => {
    const sql = "SELECT COUNT(UserId) AS count FROM users WHERE role = 'Admin'";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ count: results[0].count }); // Send count in JSON format
    });
});


//---------------------------- LIBRARY Start ---------------------------------------------------------

// Count Books 
app.get('/BookCount', (req, res) => {
    const sql = "SELECT COUNT(BookID) AS book FROM books";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ book: results[0].book }); // Send count in JSON format
    });
});

// add book

app.post('/addBook', (req, res) => {
    const sql = "INSERT INTO books(isbn, title, category, status, publisher, pyear, author1, author2, author3, author4, value, create_at, update_at) VALUES (?)";
    const status = "Available";
    const createTime = new Date();
    const updateTime = new Date();
    
    const values = [
        req.body.isbn,
        req.body.title,
        req.body.category,
        status,
        req.body.publisher,
        req.body.pyear,
        req.body.author1,
        req.body.author2,
        req.body.author3,
        req.body.author4,
        req.body.value,
        createTime,
        updateTime        
    ]
    connection.query(sql, [values], (err, result) => {
        if(err){
            return res.json({Error: "ERROR in Data Processing"})
        }
        else{
            return res.json({Status: "Success"})
        }
    });
})

// Read all books

app.get('/ReadBooks', (req, res) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error : "Error in Query Processing"});
        }
        else{
            return res.json(result);
        }
    });
})


//---------------------------- LIBRARY END ---------------------------------------------------------


//------------------------------------ Employee ----------------------------------------------------

// app.post('/AddEmployee', upload.single('image'), async (req, res) => {
//     const passNew = await bcrypt.hash(req.body.password, 10);
//     const sql = "INSERT INTO employee VALUES (?)";

//     const dataValue = [
//         req.body.eid,
//         req.body.initial,
//         req.body.surname,
//         req.body.address,
//         req.body.phone,
//         req.body.email,
//         passNew,
//         req.body.salary,
//         req.file.filename,
//         req.body.category,
//         req.body.destination,
//         req.body.nic,
//         req.body.dob,
//         req.body.emgcontact,
//         req.body.civilstatus,
//         req.body.gender,
//         req.body.relig,
//         '0',
//         '0'
//     ]

//     connection.query(sql, [dataValue], (err, result) => {
//         if(err){
//             return res.json({Error: "ERROR in Data Processing"})
//         }
//         else{
//             return res.json({Status: "Success"})
//         }
//     });
// })

app.post('/createEmp', upload.single('image'), async (req, res) => 
{
   const hash = await bcrypt.hash(req.body.password, 10);
   const sql = "INSERT INTO employee VALUES (?)";
   const createTime = new Date();
   const updateTime = new Date();
   
   const values = [
    req.body.eid,
    req.body.initial,
    req.body.surname,
    req.body.address,
    req.body.phone,
    req.body.email,
    hash, 
    req.body.salary, 
    req.file.filename,
    req.body.category, 
    req.body.designation,
    req.body.nic,
    req.body.dob,
    req.body.emgcontact,
    req.body.type,
    req.body.civilstatus,
    req.body.gender,
    req.body.relig,
    createTime,
    updateTime
   ]

   connection.query(sql, [values], (err, result) => {
        if(err){
            return res.json({Error: "ERROR in Data Processing"})
        }
        else{
            return res.json({Status: "Success"})
        }
    });
});


// ------------------------------------ Employee End ---------------------------------------------------
//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));