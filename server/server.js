const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const path = require('path')

const resourceLimits = require('worker_threads');
const e = require('express');
const { stat } = require('fs');


const app = express();
const PORT = process.env.PORT || 8081

//file  upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    }, 
    filename:(req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
  
const upload = multer({
    storage:storage
})


//make connection between dbsever and node app

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db_erp"
})
//email Sending - Nodemailer transporter

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});


// middleware
app.use(express.json())
app.use(cors())
app.use(express.static('public')); 

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
        const is_active = 1;
        const userRole = "User"

        const checkSql = "SELECT * FROM users WHERE email = ?"
        connection.query(checkSql, [req.body.email], (err, result) => {
            if(err) throw err

            if(result.length > 0){
                return res.json({Error: "Email Already exsist"})
            }
            else{
                const checkEmp = "SELECT * FROM employee WHERE email = ?"
                connection.query(checkEmp, [req.body.email], (err, result) => {
                    if(err) throw err

                    if(result.length == 0){
                        return res.json({Error: "You Cannot Register, Because You are not an Employee"})
                    }
                    else{
                        connection.query(
                            'INSERT INTO users(username, email, role, password, create_at, update_at, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [username, email, userRole, hashPass, createTime, updateTime, is_active],
                            (error, result) => {
                                if(err){
                                    return res.json({Error: "ERROR on SERVER"})
                                }
                                else{
                                    return res.json({Status: "Success"})
                                }
                            }
                        );
                    }
                })
            }
        })
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
                            {email: result[0].email, role: result[0].role, is_active: result[0].is_active },
                            'your-secret-key',
                            {expiresIn: '1h' }
                        );
                        res.json({ token:token, Msg:"success", CheckRole:result });
                        console.log(result)
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

// ForgetPass
app.post('/ForgetPass', (req, res) => {
    const min = 100000;
    const max = 999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(randomNumber);
    
    const StringOTP = randomNumber.toString()
    // console.log(StringOTP)

    bcrypt.hash(StringOTP, 10, (err, hashOtp) => {
        if(err) throw err;

        const checkEmail = "SELECT * FROM users WHERE email = ?"
        connection.query(checkEmail, [req.body.email], (err, result) => {
            if(err) throw err
    
            if(result.length == 0){
                return res.json({Error: "Email not Found...!"})
            }
            else{
                const checkotp = "SELECT * FROM pass_otp WHERE email = ?"
                connection.query(checkotp, [req.body.email], (err, result) => {
                    if(result.length > 0){
                        return res.json({Error: "Your OTP already send to Email"})
                    }
                    else{
                        const sql = "INSERT INTO pass_otp(email, otp, change_at) VALUES (?)"
                        const change_at = new Date()
                        const value = [
                            req.body.email,
                            hashOtp,
                            change_at
                        ]
                        // console.log(value)

                        connection.query(sql, [value], (err, result) => {
                            if(err){
                                return res.json({Error: "Error on Server"})
                            }
                            else{
                                var mailOptions = {
                                    from: process.env.EMAIL_USER,
                                    to: req.body.email,
                                    subject: 'Password Reset OTP of ERP NIFS',
                                    text: 'Your Password Reset OTP is: '+ randomNumber, 
                                };
    
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                      return res.json({Status: "Success"})
                                    }
                                });
                            }
                        })
                    }
                })
            }
        })
    })
})

// CheckOTP

app.post('/CheckOTP', (req, res) => {
    const checkotp = "SELECT * FROM pass_otp WHERE email = ?"
    connection.query(checkotp, [req.body.Token1], (err, result) => {
        console.log(req.body)
        if(err) throw err

        if(result.length == 0){
            return res.json({Error: "No Email Found"})
        }
        else{
            const otpNo = req.body.OTPCheck.otp;
            bcrypt.compare(otpNo, result[0].otp, (err, OtpMatch) => {
                if(err) throw err

                if(OtpMatch) {
                    // generate JWT Token
                    const token = jwt.sign(
                        {email: result[0].email},
                        'your-secret-key',
                        {expiresIn: '5m' }
                    );
                    return res.json({Status: "Success", token:token, CheckEmail:result})
                    console.log(result)
                }
                else {
                    return res.json({Error: "Access cannot be Continue"});
                }
            })
        }
    })
})

// UpdatePassword
app.post('/UpdatePassword', (req, res) => {
    console.log(req.body)
    const checkOTP = "SELECT * FROM pass_otp WHERE email = ?"

    connection.query(checkOTP, [req.body.Token1], (err, result) => {
        if(err) throw err

        if(result.length > 0){
            bcrypt.compare(req.body.Token3.otp, result[0].otp, (err, OTPCheck) => {
                if(err) throw err

                if(OTPCheck){
                    if(req.body.UpdatePass.email === result[0].email){
                        if(req.body.UpdatePass.npass === req.body.UpdatePass.npass2){
                            bcrypt.hash(req.body.UpdatePass.npass, 10, (err, hashPass) => {
                                if(err) throw err

                                const checkUser = "SELECT * FROM users WHERE email = ?"
                                connection.query(checkUser, [req.body.UpdatePass.email], (err, result) => {
                                    if(err) throw err

                                    if(result.length > 0){                                                                                
                                        const sql = "UPDATE users SET password = ?, update_at = ? WHERE email = ?"
                                        const  user_pass = hashPass
                                        const update_at = new Date()
                                        connection.query(sql, [user_pass, update_at, req.body.UpdatePass.email], (err, result) => {
                                            if(err){
                                                return res.json({Error: "Error on Server"})
                                            }
                                            else{
                                                const deleteOTP = "DELETE FROM pass_otp WHERE email = ?"
                                                connection.query(deleteOTP, [req.body.UpdatePass.email], (err, result) => {
                                                    if(err){
                                                        return res.json({Error: "Error Deleting OTP"})
                                                    }
                                                    else{
                                                        return res.json({Status: "Success"})
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                        }
                        else{
                            return res.json({Error: "Error on server"})
                        }
                    }
                }
            })
        }
    })
})

//UserRoleRequest
/*
    This end point design for when someone register using register route 
    that user cannot access to the system while the administation accept the request
*/

app.post('/UserRoleRequest/:id', (req, res) => {
    const userEmail = req.params.id;
     console.log(userEmail)

    const checksql = "SELECT * FROM request_role WHERE email = ?"
    connection.query(checksql, [userEmail], (err, result) =>{
        if(err) throw err

        else if(result.length > 0){
            return res.json({Error: "You Already Request"})
        }
        else{
            const empcheck = "SELECT * FROM employee WHERE eid = ? && category = ? && email = ?"
            connection.query(empcheck, [req.body.empID, req.body.userRole , userEmail], (err, result) => {
                if (err) throw err

                if (result.length == 0){
                    return res.json({Error: "Request Cannot be Continue, The Added Employee ID and Email not exists in System or You Request As a other User"})
                }
                else{
                    const userRole = req.body.userRole
                    const request_at = new Date()
                    const request_status = "Request"
                    const sql = "INSERT INTO request_role(email, status, request_date, role, eid) VALUE (?)"
                
                    const value = [
                        userEmail,
                        request_status,
                        request_at,
                        userRole,
                        req.body.empID
                    ]
        
                    console.log(value)
        
                    connection.query(sql, [value], (err, result) => {
                        if(err){
                            return res.json({Error: "Error On Server"})
                        }
                        else{
                            return res.json({Status: "Success"})
                        }
                    })
                }
            })
        }
    })
})

// ViewUserRoleAccept
app.get('/ViewUserRoleAccept', (req, res) =>{
    const sql = "SELECT * FROM request_role WHERE status = ?"
    const status = "Accept"

    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// RequestAcceptRole
app.post('/RequestAcceptRole/:id', (req, res) => {
    const AcceptID = req.params.id
    const sql = "UPDATE request_role SET status = ? WHERE ID = ?"
    const Rolestatus = "Accept"

    connection.query(sql, [Rolestatus, AcceptID], (err, result) =>{
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// RequestRejectRole
app.post('/RequestRejectRole/:id', (req, res) => {
    const RejectID = req.params.id
    const sql = "UPDATE request_role SET status = ? WHERE ID = ?"
    const Rolestatus = "Reject"

    connection.query(sql, [Rolestatus, RejectID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// ViewUserRoleData
app.get('/ViewUserRoleData', (req, res) =>{
    const sql = "SELECT * FROM request_role WHERE status = ?"
    const status = "Request"

    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//ViewPendingUsers
app.get('/ViewPendingUsers', (req, res) => {
    const sql = "SELECT * FROM request_role WHERE status = ?"
    const status = "Request"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//RoleViewReject
app.get('/RoleViewReject/:id', (req, res) => {
    const userEmail = req.params.id;
    console.log(userEmail)

    const sql = "SELECT * FROM request_role WHERE email = ? && status = ?"
    const status = "Reject"
    connection.query(sql, [userEmail, status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Result: result})
        }
    })
})

//DeleteRequest
app.delete('/DeleteRequest/:id', (req, res) => {
    const DeleteID = req.params.id;
    const sql = "DELETE FROM request_role WHERE email = ?"

    connection.query(sql, [DeleteID], (err, result) => {
        if(err){
            return res.json({Error: "Error IN server"})
        }
        else{
            const usersql = "DELETE FROM users WHERE email = ?"
            connection.query(usersql, [DeleteID], (err, result) => {
                if(err){
                    return res.json({Error: "ERROR on SERVER"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })
})

//ViewRequstUser
app.get('/ViewRequstUser/:id', (req, res) => {
    const userEmail = req.params.id
    const sql = "SELECT * FROM request_role WHERE email = ?"

    connection.query(sql, [userEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            return res.json({Status: "Success", Result: result})
        }
    })
})

//AcceptUserRole
app.post('/AcceptUserRole/:id', (req, res) => {
    const UserID = req.params.id
    const sql = "UPDATE request_role SET status = ? WHERE email = ?"
    const status = "Accept"
    console.log(req.body)

    connection.query(sql, [status, UserID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            const usersSql = "UPDATE users SET role = ? WHERE email = ?"
            const role = req.body.role
            console.log(role)
            connection.query(usersSql, [role, UserID], (err, result) => {
                if(err){
                    return res.json({Error: "ERROR in SERVER"})
                }
                else{
                    const checkemp = "SELECT * FROM employee WHERE email = ? && eid = ?"
                    connection.query(checkemp, [UserID, req.body.empID], (err, result) => {
                        if(err) throw err

                        if(result.length == 0){
                            return res.json({Error: "This User cannot be accept, The user not exists in System"})
                        }
                        else{                            
                            const updateSql = "UPDATE employee SET category = ? WHERE eid = ? && email = ?"
                            connection.query(updateSql, [role, req.body.empID, UserID], (err, result) => {
                                if(err){
                                    return res.json({Error: "ERROR on Server"})
                                }
                                else{
                                    if(role === "Driver"){
                                        const DriverSql = "INSERT INTO drivers(DEmail, Status, add_at) VALUES (?)"
                                        const add_at = new Date()
                                        const value = [
                                            UserID,
                                            "Off Duty",
                                            add_at
                                        ]
    
                                        connection.query(DriverSql, [value], (err, result) => {})
                                    }

                                    return res.json({Status: "Success"})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

//RejectUserRole
app.post('/RejectUserRole/:id', (req, res) => {
    const UserID = req.params.id
    const sql = "UPDATE request_role SET status = ? WHERE email = ?"
    const status = "Reject"

    connection.query(sql, [status, UserID], (err, result) => {
        if(err){
            return res.json({Error: "Error On Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

//unAccess
app.post('/UnAccess', (req, res) => {
    const userEmail = req.body.email;
    const userRole = req.body.role;
    console.log("Email is :", userEmail);
    console.log("Role is :", userRole);

    const updateUser = "UPDATE users SET is_active = ? WHERE email = ?";
    const is_active = 0;
    connection.query(updateUser, [is_active, userEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERRROR in SERVER"})
        }   
        else{
            // res.json({ message: 'Email received successfully' });
            const checksql = "SELECT * FROM unauthorized WHERE email = ? ";
            connection.query(checksql, [userEmail], (err, result) => {
                if(result.length == 0) {
                    const sql = "INSERT INTO unauthorized(email, role, access_time) VALUES (?, ?, ?)";
                    var unaccessTime = new Date();
                    connection.query(sql, [userEmail, userRole, unaccessTime], (err, result) => {
                        if(err){
                            return res.json({Error: "ERRROR in SERVER"})
                        }
                        else{
                            return res.json({ message: 'UnAccess Reported, The account has been suspended' });
                            // const mailOptions = {
                            //     from: process.env.EMAIL_USER,
                            //     to: userEmail,
                            //     subject: "Your Account has been suspended",
                            //     text: "Your Account has been suspended due to unauthorized access"
                            // };


                            // transporter.sendMail(mailOptions, function(error, info){
                            //     if (error) {
                            //       console.log(error);
                            //     } else {
                            //       console.log('Email sent: ' + info.response);
                            //     }
                            //   });
                        }
                    })
                }
                else{
                    return false;
                }
            })
        }
    }) 
})

// View unAccess Users
app.get('/ViewUnAccessUsers', (req, res) => {
    const sql = "SELECT * FROM unauthorized";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/UnAccessUser/:id', (req, res) => {
    const UnAccessID = req.params.id
    const sql = "SELECT * FROM unauthorized WHERE ID = ? ";

    connection.query(sql, [UnAccessID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success", Result: result})
        }
    })
})

//ViewAccounts End point
app.get('/ViewAccounts', (req, res) =>{ 
    const sql = "SELECT * FROM users" 
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//ViewUserData
app.get('/ViewUserData/:id', (req, res) =>{
    const AccountID = req.params.id
    const sql = "SELECT * FROM users WHERE UserID = ?"

    connection.query(sql, [AccountID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success", Result: result})
        }
    })
})

//DeavtiveAccount
app.post('/DeavtiveAccount/:id', (req, res) => {
    const DeactiveID = req.params.id
    const sql = "UPDATE users SET is_active = ?, update_at = ? WHERE UserID = ?"
    const update_at = new Date();
    const deactive = 0;

    connection.query(sql, [deactive, update_at, DeactiveID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})
//ReactiveAccount
app.post('/ReactiveAccount/:id', (req, res) => {
    const ReactiveID = req.params.id
    const sql = "UPDATE users SET is_active = ?, update_at = ? WHERE UserID = ?"
    const update_at = new Date()
    const reactive = 1

    connection.query(sql, [reactive, update_at, ReactiveID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})



// Count Admins Roles
app.get('/UserRolesCount', (req, res) => {
    const sql = "SELECT COUNT(Code) AS userRole FROM designation";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ userRole: results[0].userRole }); // Send count in JSON format
    });
});


//accout reactivation
app.put('/ReactiveAccount/:id', (req, res) => {
    const AccountID = req.params.id;
    console.log(req.body);

    const sql = "DELETE FROM unauthorized WHERE email = ?";
    connection.query(sql, [req.body.email], (err, result) => {
        if(err){
            return res.json({Error: "Error in Server"})
        }
        else{
            const updateUser = "UPDATE users SET is_active = ? WHERE email = ?";
            const is_active = 1;

            connection.query(updateUser, [is_active, req.body.email], (err, result) => {
                if(err){
                    return res.json({Error: "ERROR on Server"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })

})

// ViewProfile
app.get('/ViewProfile/:id', (req, res) => {
    const Email = req.params.id
    console.log(Email)

    const sql = "SELECT * FROM users WHERE email = ?"
    connection.query(sql, [Email], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// MyEmpDataView
app.get('/MyEmpDataView/:id', (req, res) => {
    const myEmail = req.params.id;

    const sql = "SELECT * FROM employee WHERE email = ?"

    connection.query(sql, [myEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// AddSuperAdmin
app.post('/AddSuperAdmin', (req, res) => {
    console.log(req.body)

    bcrypt.hash(req.body.password, 10, (err, hashPass) => {
        if(err) throw err;

        // save the user to database

        // get current time
        var createTime = new Date();
        var updateTime = new Date();
        const is_active = 1;


                const sql = "INSERT INTO users(username, email, role, password, create_at, update_at, is_active) VALUES (?)"
                const values = [
                    req.body.username,
                    req.body.email,
                    req.body.role,
                    hashPass,
                    createTime,
                    updateTime,
                    is_active
                ]
                connection.query(sql, [values], (err, result) => {
                    if(err){
                        return res.json({Error: "Error on Server"})
                    }
                    else{
                        return res.json({Status: "Success"})
                    }
                })    
    })      
})

//---------------------------- LIBRARY Start ---------------------------------------------------------

// Count Books 
// app.get('/BookCount', (req, res) => {
//     const sql = "SELECT COUNT(BookID) AS book FROM books";
  
//     connection.query(sql, (error, results) => {
//       if (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send({ message: 'Error fetching data' });
//         return;
//       }
  
//       res.json({ book: results[0].book }); // Send count in JSON format
//     });
// });
app.get('/BookCount', (req, res) => {
    const sql = "SELECT COUNT(BookID) AS bk FROM books";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ bk: results[0].bk }); // Send count in JSON format
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

// AddJournal

app.post('/AddJournal', (req, res) => {
    const sql = "INSERT INTO journal(title, category, publisher, pyear, impact, IStatus, create_at, update_at) VALUES (?)";
    const createTime = new Date();
    const updateTime = new Date();
    const value = [
        req.body.title,
        req.body.category,
        req.body.publisher,
        req.body.pyear,
        req.body.impact,
        req.body.IStatus,
        createTime,
        updateTime
    ]

    connection.query(sql, [value], (err, result) => {
        if(err){
            return res.json({Error: "Error On Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

app.get('/ViewJournal', (req, res) => {
    const sql = "SELECT * FROM journal";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error On Server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.delete('/DeleteJournal/:id', (req, res) =>{
    const DeleteID = req.params.id;
    console.log(DeleteID)
    const sql = "DELETE FROM journal WHERE JID = ?"

    connection.query(sql, [DeleteID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

//CountJournal

app.get('/CountJournal', (req, res) => {
    const sql = "SELECT COUNT(JID) AS jour FROM journal";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ jour: results[0].jour }); // Send count in JSON format
    });
});

//AddThesis
app.post('/AddThesis', (req, res) => {
    console.log(req.body)
    if(req.body.degree === ""){
        return res.json({Error: "Please Select the Any Degree"})
    }
    else{
        const sql = "INSERT INTO thesis(title, author, pyear, subject, degree, create_at, update_at) VALUES(?)";
        const createTime = new Date();
        const updateTime = new Date();

        const value = [
            req.body.title,
            req.body.author,
            req.body.pyear,
            req.body.subject,
            req.body.degree,
            createTime,
            updateTime            
        ]

        connection.query(sql, [value], (err, result) => {
            if(err){
                return res.json({Error: "Error On Server"})
            }
            else{
                return res.json({Status: "Success"})
            }
        })
    }
})

//ViewThesis

app.get('/ViewThesis', (req, res) => {
    const sql = "SELECT * FROM thesis";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

//DeleteThesis

app.delete('/DeleteThesis/:id', (req, res) =>{
    const DeleteId = req.params.id;
    const sql = "DELETE FROM thesis WHERE Tid = ?";

    connection.query(sql, [DeleteId], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

//CountThesis

app.get('/CountThesis', (req, res) => {
    const sql = "SELECT COUNT(Tid) AS t FROM thesis";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ t: results[0].t }); // Send count in JSON format
    });
});

//AddMagazine
app.post('/AddMagazine', (req, res) => {
    const sql = "INSERT INTO magazine(title, publisher, pyear, create_at, update_at) VALUES (?)";
    const createTime = new Date();
    const updateTime = new Date();

    const value = [
        req.body.title,
        req.body.publisher,
        req.body.pyear,
        createTime,
        updateTime
    ]

    connection.query(sql, [value], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

app.get('/ViewMagazine', (req, res) => {
    const sql = "SELECT * FROM magazine";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

app.delete('/DeleteMagazine/:id', (req, res) =>{
    const DeleleID = req.params.id;
    const sql = "DELETE FROM magazine WHERE Mid = ?";

    connection.query(sql, [DeleleID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})


//CountMagazine

app.get('/CountMagazine', (req, res) => {
    const sql = "SELECT COUNT(Mid) AS maga FROM magazine";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ maga: results[0].maga }); // Send count in JSON format
    });
});


//AddArticle
app.post('/AddArticle', (req, res) => {
    if(req.body.category === ""){
        return res.json({Error: "Please Select Any Category"})
    }
    else{
        const sql = "INSERT INTO articles(title, category, journal, pyear, author1, author2, pages, create_at, update_at) VALUES (?)";
        const createTime = new Date();
        const updateTime = new Date();

        const value = [
            req.body.title,
            req.body.category,
            req.body.journal,
            req.body.pyear,
            req.body.author1,
            req.body.author2,
            req.body.pages,
            createTime,
            updateTime           
        ]

        connection.query(sql, [value], (err, result) => {
            if(err){
                return res.json({Error: "ERROR on Server"})
            }
            else{
                return res.json({Status: "Success"})
            }
        })
    }
})

//ViewArticle

app.get('/ViewArticle', (req, res) =>{
    const sql = "SELECT * FROM articles";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

//DeleteArticle

app.delete('/DeleteArticle/:id', (req, res) => {
    const DeleteId = req.params.id;
    const sql = "DELETE FROM articles WHERE Aid = ?";

    connection.query(sql, [DeleteId], (err, result) =>{
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})


//CountArticles

app.get('/CountArticles', (req, res) => {
    const sql = "SELECT COUNT(Aid) AS art FROM articles";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ art: results[0].art }); // Send count in JSON format
    });
});


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
   const checksql = "SELECT * FROM employee WHERE eid = ? || email = ?";
   connection.query(checksql, [req.body.eid, req.body.email], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Employee Already Exists...!"});
        }
        else{
            const addSalary = "SELECT * FROM designation WHERE DName = ?"
            connection.query(addSalary, [req.body.category], (err, result) => {
                if(err) throw err

                if(result.length == 0){
                    return res.json({Error: " Designation not in Database"})
                }
                else{
                    const sql = "INSERT INTO employee (eid, initial, surname, address, phone, email, salary, image, category, designation, nic, dob, emgcontact, type, civilstatus, gender, relig, dno, create_at, update_at) VALUES (?)";
                    //    const sql = "INSERT INTO employee VALUES (?)"
                       const create_at = new Date();
                       const update_at = new Date();
           
                       // console.log(req.body)
                       const dNo = req.body.dno
                       const salary = parseInt(result[0].Basic_Salary) + parseInt(result[0].increment);
           
                       const values = [
                           req.body.eid,
                           req.body.initial,
                           req.body.surname,
                           req.body.address,
                           req.body.phone,
                           req.body.email,
                           salary, 
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
                           dNo,
                           create_at,
                           update_at
                       ]

                       console.log(values)
                       console.log(dNo)
                       connection.query(sql, [values], (err, result) => {
                            if(err){
                                // return res.json({Error: "ERROR in Data Processing"});
                                console.log(err)
                            }
                            else{
                                var mailOptions = {
                                    from: process.env.EMAIL_USER,
                                    to: req.body.email,
                                    subject: 'Your Approvel Email',
                                    text: 'Now You can Register to the ERP System using this Email : ' + req.body.email, 
                                };
    
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                      return res.json({Status: "Success"})
                                    }
                                });                                
                            }
                        });
                }
            })
        }
   })

});

// GetDiviNo
app.get('/GetDiviNo', (req, res) => {
    const sql = "SELECT * FROM division";

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/ReadEmployee', (req, res) => {
    const sql = "SELECT * from employee";

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Message: "Error On Server"});
        }
        else{
            return res.json(result);
        }
    });
})

// fetch employee data to update
app.get('/EmpReadToUpdate/:id', (req, res) => {
    const empId = req.params.id;
    // console.log(empId);
    connection.query("SELECT * FROM employee WHERE eid=?", [empId], (err, result) => {
        if(err){
            return res.json({Error: "Error IN Server"});
        }
        else{
            return res.json({Status: "Success", Result: result});
        }
    });
})

app.put('/UpdateEmp/:id', (req, res) => {
    const id = req.params.id;

    const update_at = new Date();
    connection.query('UPDATE employee SET address = ?, phone =?, email= ?, salary=?, category =?, designation=?, type=?, civilstatus=?, emgcontact=?, update_at=? WHERE eid = ?',
    [req.body.address, req.body.phone, req.body.email,req.body.salary,req.body.category, req.body.designation, req.body.type, req.body.civilstatus, req.body.emgcontact,update_at,  id], (err, results) => {
        if(err){
            return res.json({Error : "Error in server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    });

})

// Delete Employee

app.delete('/DeleteEmp/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE from employee WHERE eid = ?",
    [id], (err, results) => {
        if(err) 
            console.log({Message: "Error inside Server"})
        else{
            return res.json(results)
        }
    });
})

// Count emp 
app.get('/EmpCount', (req, res) => {
    const sql = "SELECT COUNT(eid) AS emp FROM employee";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ emp: results[0].emp }); // Send count in JSON format
    });
});

// ViewEmployee
app.get('/ViewEmployee/:id', (req, res) => {
    const empID = req.params.id;

    const sql = "SELECT * FROM employee WHERE eid = ?"
    connection.query(sql, [empID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})


// ------------------------------------ Employee End ---------------------------------------------------

// ---------------------------------------- Designations Start -------------------------------------------------

app.post('/AddDesignation', (req, res) => {
    const create_at = new Date();
    const update_at = new Date();
    console.log(req.body);
     
    const checksql = "SELECT * FROM designation WHERE DName = ?" 
    connection.query(checksql, [req.body.Dname], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Designation Name Already Exists...!"});
        }
        else{

            const sql = "INSERT INTO designation (Dname, Basic_Salary, increment, create_at, update_at) VALUES (?)";
            const values = [
                req.body.Dname,
                req.body.Basic_Salary,
                req.body.increment,
                create_at,
                update_at
            ]

            console.log(req.body)
            connection.query(sql, [values], (err, results) =>  
             {
               if(err) 
                 console.log(err)
               else {
                 return res.json({Status: "Success"})
            }
         });
        }
    })
})


app.get('/DesognationView', (req, res) =>{
    const sql = "SELECT * from designation";

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Message: "Error On Server"});
        }
        else{
            return res.json(result);
        }
    });
})

app.get('/DesignationData/:id' , (req, res) =>{
    const DesignationId = req.params.id;

    connection.query("SELECT * FROM designation WHERE Code = ?", [DesignationId], (err, result) => {
        if(err){
            return res.json({Error: "Error IN Server"});
        }
        else{
            return res.json({Status: "Success", Result: result});
        }
    })
})

app.put('/UpdateDesignation/:id', (req, res) => {
    const id = req.params.id;
    const update_at = new Date();
    //   console.log(id)
    connection.query('UPDATE designation SET Basic_Salary = ?, increment =?, update_at=? WHERE Code = ?',
    [req.body.Basic_Salary, req.body.increment,update_at, id], (err, results) => {
      if(err) 
        console.log({Message: "Error inside Server"})
      else{
        return res.json({Status:'Success'})
      }
    });
})

app.delete('/DesiganationDelete/:id', (req, res) =>{
    const designationId = req.params.id;

    connection.query("DELETE from designation WHERE Code = ?",
    [designationId], (err, results) => {
        if(err) 
            console.log({Message: "Error inside Server"})
        else{
            return res.json(results)
        }
    });

})

// app.get('/DesignationCount', (req, res) => {
//     const sql = "SELECT COUNT(eid) AS emp FROM employee";
  
//     connection.query(sql, (error, results) => {
//       if (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send({ message: 'Error fetching data' });
//         return;
//       }
  
//       res.json({ emp: results[0].emp }); // Send count in JSON format
//     });
// });

app.get('/DesignationCount', (req, res) => {
    const sql = "SELECT COUNT(Code) AS desig FROM designation";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ desig: results[0].desig }); // Send count in JSON format
    });
})

// ---------------------------------------- Designations END -------------------------------------------------

//------------------------------------------ Vehicle Start --------------------------------------------------------

app.post('/AddVehicle', (req,res) => {
    const checksql = "SELECT * FROM vehicles WHERE regno = ?";

    connection.query(checksql, [req.body.regno], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Vehicle Already Exists at Given Registation Number...!"});
        }
        else{
            const sql = "INSERT INTO vehicles(regno, model, brand, fueltype, myear, value, milage, create_at, update_at, status, unit_charge) VALUES (?)";
            const create_at = new Date();
            const update_at = new Date();
            const status = "Off Duty"
        
            const values = [
                req.body.regno,
                req.body.model,
                req.body.brand,
                req.body.fueltype,
                req.body.myear,
                req.body.value,
                req.body.milage, 
                create_at,
                update_at,
                status,
                req.body.unit_charge
            ]
        
            connection.query(sql, [values], (err, result) => {
                if(err){
                    return res.json({Error: "ERROR in Data Processing"});
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })
})

app.get('/AllVehicles', (req, res) => {
    const sql = "SELECT * FROM vehicles";

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error in Server"});
        }
        else{
            return res.json(result);
        }        
    })
})

app.get('/VehicleData/:id', (req, res) => {
    const VehicleId = req.params.id;

    connection.query("SELECT * FROM vehicles WHERE VID = ? ", [VehicleId], (err, result) => {
        if(err){
            return res.json({Error: "Error IN Server"});
        }
        else{
            return res.json({Status: "Success", Result: result});
        }
    })
})


app.put('/UpdateVehicle/:id', (req, res) => {
    const id = req.params.id;
    const update_at = new Date();

    connection.query('UPDATE vehicles SET value = ?, milage=?, update_at =?, unit_charge=? WHERE VID = ?',
    [req.body.value, req.body.milage, update_at, req.body.unit_charge, id], (err, results) => {
        if(err) 
            console.log({Message: "Error inside Server"})
        else{
            return res.json({Status:'Success'})
        }
    });
})

app.delete('/DeleteVehicle/:id', (req, res) => {
    const VehicleId = req.params.id;

    connection.query("DELETE FROM vehicles WHERE VID = ?", [VehicleId], (err, result) => {
        if(err) 
            console.log({Message: "Error inside Server"})
        else{
            return res.json(result)
        }
    })
})

app.get('/VehicleCount', (req, res) => {
    const sql = "SELECT COUNT(VID) AS vehi FROM vehicles";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ vehi: results[0].vehi }); // Send count in JSON format
    });
})

//------------------------------------------ Vehicle End --------------------------------------------------------


//---------------------------------------- Program Start -------------------------------------------

app.post('/AddProgram', (req,res) => {
    const checksql = "SELECT * FROM program WHERE title = ?";
    console.log(req.body)
    connection.query(checksql, [req.body.title], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Program is Already Exists at Given Program Name"});
        }
        else{
            const hodsql = "SELECT * FROM users WHERE email = ?"
            connection.query(hodsql, [req.body.hod], (err, result) => {
                if(err) throw err

                if(result.length == 0){
                    return res.json({Error: "HOD not exists"})
                }
                else if(result[0].role === "HOD"){
                    if(result[0].is_active === 0){
                        return res.json({Error: "This HOD has been Deactivate by the administration or HOD is Suspeded User"})
                    }
                    const sci1sql = "SELECT * FROM employee WHERE email = ?"
                    connection.query(sci1sql, [req.body.scient1], (err, result) => {
                        if(err) throw err

                        if(result.length == 0){
                            return res.json({Error: "Scientist 1 not exists"})
                        }
                        else if(result[0].category === "Scientist"){
                            const sci2sql = "SELECT * FROM employee WHERE email = ?"
                            connection.query(sci2sql, [req.body.scient2], (err, result) => {
                                if(err) throw err

                                if(result.length == 0){
                                    return res.json({Error: "Scientist 2 not exists"})
                                }
                                else if(result[0].category === "Scientist"){
                                    if(req.body.scient1 === req.body.scient2){
                                        return res.json({Error: "Scientist 1 and Scientist 2 Same"})
                                    }
                                    else{
                                        const sql = "INSERT INTO program(title, location, hod, scientis1, scientist2, create_at, update_at) VALUES (?)";
            
                                        const create_at = new Date();
                                        const update_at = new Date();
                                        console.log(req.body);
                            
                                        const values = [
                                            req.body.title,
                                            req.body.location,
                                            req.body.hod,
                                            req.body.scient1,
                                            req.body.scient2,
                                            create_at,
                                            update_at                
                                        ]
                                        
                                        connection.query(sql, [values], (err, result) => {
                                            if(err){
                                                return res.json({Error: "ERROR in Server"})
                                            }
                                            else{
                                                return res.json({Status: "Success"});
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.get('/AllPrograms', (req, res) => {
    const sql = "SELECT * FROM program";

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR in Server"});
        }
        else{
            return res.json(result);
        }
    })
})

app.get('/ViewProgram/:id', (req, res) => {
    const ProgramID = req.params.id;
    const sql = "SELECT * FROM program WHERE pid = ?";

    connection.query(sql, [ProgramID], (err, result) => {
        if(err){
            return res.json({Error: "Error IN Server"});
        }
        else{
            return res.json({Status: "Success", Result: result});
        }
    })
})

app.put('/UpdateProgram/:id', (req, res) => {
    const programId = req.params.id;
    const update_at = new Date();
    connection.query('UPDATE program SET title = ?, hod=?, scientis1=?, scientist2=?, update_at=? WHERE pid = ?',
    [ req.body.title, req.body.hod, req.body.scients1, req.body.scients2, update_at, programId], (err, results) => {
        if(err) 
            console.log({Message: "Error inside Server"})
        else{
            return res.json({Status:'Success'})
        }
    });
})


app.delete('/DeleteProgram/:id', (req, res) => {
    const DeleteId = req.params.id;
    const sql = "DELETE FROM program WHERE pid = ?";

    connection.query(sql, [DeleteId], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/ProgramCount', (req, res) => {
    const sql = "SELECT COUNT(pid) AS pro FROM program";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ pro : results[0].pro }); // Send count in JSON format
    });
})


//------------------------------------------ Program End ---------------------------------------

//----------------------------------------- Division Start ----------------------------

app.post('/AddDivision', (req, res) => {
    const checksql = "SELECT * FROM division WHERE title = ?";
    connection.query(checksql, [req.body.division], (err, result) => {
        if(err) throw err
        
        if(result.length > 0) {
            return res.json({Error: "Division is Already Exists at Given Division Name"});
        }
        else{

                    const sql = "INSERT INTO division(title, location, email, create_at, update_at) VALUES (?)";
                    const create_at = new Date();
                    const update_at = new Date();
                    console.log(req.body);
        
                    const value = [
                        req.body.division,
                        req.body.location,
                        req.body.hod,
                        create_at,
                        update_at
                    ]
                    
                    connection.query(sql, [value], (err, result) => {
                        if(err){
                            return res.json({Error: "Error IN Server"});
                        }
                        else{
                            return res.json({Status: "Success"});
                        }
                    })

        }
    })

})

app.get('/DivisionView', (req, res) => {
    sql = "SELECT * FROM division";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error"})
        }
        else{
            return res.json(result);
        }        
    })
})

app.get('/ViewDivision/:id', (req, res) => {
    const divisionId = req.params.id;
    const sql = "SELECT * FROM division WHERE did = ?";

    connection.query(sql, [divisionId], (err, result) => {
        if(err){
            return res.json({Error: "Error In Server"});
        }
        else{
            return res.json({Status: "Success", Result: result});
        }
    })
})

app.put('/UpdateDivision/:id', (req, res) => {
    const UpdateId = req.params.id;
    const sql = "UPDATE division SET title = ?, location = ?, email = ?, update_at = ? WHERE did = ?";
    const update_at = new Date();
    connection.query(sql, [req.body.division, req.body.location, req.body.hod, update_at, UpdateId], (err, result) => {
        if(err){
            return res.json({Error: "Error in Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })

})


app.delete('/DeleteDivision/:id', (req, res) => {
    const deleteId = req.params.id;
    const sql = "DELETE FROM division WHERE did = ?";

    connection.query(sql, [deleteId], (err, result) => {
        if(err) 
            console.log({Message: "Error inside Server "})
        else{
            return res.json(result)
        }
    })
})

app.get('/DivisionCount', (req, res) => {
    const sql = "SELECT COUNT(did) AS divi FROM division";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ divi : results[0].divi }); // Send count in JSON format
    });
})

//-------------------------------------- Division End -------------------------------------

//------------------------------------- Equipments Start -----------------------------------

app.post('/AddEquipment', (req, res) => {
    const checksql = "SELECT * FROM equipment WHERE invno = ?";
    connection.query(checksql, [req.body.invno], (err, result) => {
        if(err) throw err

        if(result.length > 0) {
            return res.json({Error: "Equipment Number Already Exists"})
        }
        else{
            const sql = "INSERT INTO equipment(ename, evalue, pdate, location, invno, create_at, update_at) VALUES(?)";
            const create_at = new Date();
            const update_at = new Date();

            const values = [
                req.body.ename,
                req.body.evalue,
                req.body.pdate,
                req.body.location,
                req.body.invno,
                create_at,
                update_at                
            ]

            connection.query(sql, [values], (err, result) => {
                if(err){
                    return res.json({Error: "Error in Server"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })

})

app.get('/Equipments', (req, res) => {
    const sql = "SELECT * FROM equipment";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error On server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/EquiData/:id', (req, res) => {
    const equiID = req.params.id;
    const sql = "SELECT * FROM equipment WHERE id = ?";

    connection.query(sql, [equiID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success", Result: result})
        }
    })
})

app.put('/UpdateEqui/:id', (req, res) => {

    console.log(req.body)
    const EquiId = req.params.id;
    const update_at = new Date();
    const sql = "UPDATE equipment SET evalue = ?, location = ?, update_at = ? WHERE id = ?";

    connection.query(sql, [req.body.evalue, req.body.location, update_at, EquiId], (err, result) => {
        if(err){
            return res.json({Error: "Error On Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

app.delete('/DeleteEqui/:id', (req,res) => {
    const DeleteId = req.params.id;
    const sql = "DELETE FROM equipment WHERE id = ?";
    
    connection.query(sql, [DeleteId], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/EquiCount', (req, res) => {
    const sql = "SELECT COUNT(id) AS equi FROM equipment";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ equi : results[0].equi }); // Send count in JSON format
    });
})

//------------------------------------- Equipment End -------------------------------------
//------------------- Project Start -------------------------

//AddProject
app.post('/AddProject', (req, res) =>{
    const checkdivison = "SELECT * FROM division WHERE did = ?";
    connection.query(checkdivison, [req.body.divno], (err, result) => {
        if(err) throw err

        // if(result.length == 0){
        //     return res.json({Error: "Please Enter Valied Division Number, The Added Division Number is not exist"})
        // }
        else{
            //check hod is exists on db
            const checkhod = "SELECT * FROM users WHERE email = ?"
            connection.query(checkhod, [req.body.hod], (err, result) => {
                if(err) throw err

                if(result.length == 0){
                    return res.json({Error: "HOD not exists"})
                }
                else if(result[0].role === "HOD"){
                    if(result[0].is_active === 0){
                        return res.json({Error: "This HOD has been Deactivate by the administration or HOD is Suspeded User"})
                    }
                    //check ra1 is exists on db
                    const ra1sql = "SELECT * FROM employee WHERE email = ?";
                    connection.query(ra1sql, [req.body.ra1], (err, result) => {
                        if(err) throw err

                        if(result.length == 0){
                            return res.json({Error: "RA 1 Not exists"})
                        }
                        else if(result[0].category === "RA"){
                            //check ra2 is exists on db
                            const ra2sql = "SELECT * FROM employee WHERE email = ?"
                            connection.query(ra2sql, [req.body.ra2], (err, result) => {
                                if(err) throw err

                                if(result.length == 0){
                                    return res.json({Error: "RA 2 Not exists" })
                                }
                                else if(result[0].category === "RA"){
                                    if(req.body.ra1 === req.body.ra2){
                                        return res.json({Error: "RA1 and RA2 Same"})
                                    }
                                    else{
                                        //now insert data to db
                                        const sql = "INSERT INTO project(title, divno, hod, ra1, ra2, create_at, update_at) VALUES (?)";
                                        const create_at = new Date();
                                        const update_at = new Date();

                                        const value = [
                                            req.body.title,
                                            req.body.divno,
                                            req.body.hod,
                                            req.body.ra1,
                                            req.body.ra2,
                                            create_at,
                                            update_at                                        
                                        ]

                                        connection.query(sql, [value], (err, result) => {
                                            if(err){
                                                res.json({Error: "ERROR on SERVER"})
                                            }
                                            else{
                                                res.json({Status: "Success"})
                                            }
                                        })
                                    }
                                }
                                else{
                                    return res.json({Error: "Entered User not a RA"})
                                }
                            })
                        }
                        else{
                            return res.json({Error: "Entered User not a RA"})
                        }
                    })
                }
            })
        }
    })
})

// ProjectDivi
app.get('/ProjectDivi', (req, res) => {
    const sql = "SELECT * FROM division"
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
}) 

//ViewProjects
app.get('/ViewProjects', (req, res) => {
    const sql = "SELECT * FROM project";
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR ON SERVER"})
        }
        else{
            return res.json(result);
        }
    })
})

//ProjectDataUpdate
app.get('/ProjectDataUpdate/:id', (req, res) => {
    const getId = req.params.id
    const sql = "SELECT * FROM project WHERE pid = ?"

    connection.query(sql, [getId], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success", Result: result})
        }
    })
})

//UpdateDataProject
app.put('/UpdateDataProject/:id', (req, res) => {
    const UpdateProjectId = req.params.id;

    console.log(UpdateProjectId, req.body)

    
    const divisionID = req.body.divno;
    const divisionsql = "SELECT * FROM division WHERE did = ?"
    connection.query(divisionsql, [divisionID], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            return res.json({Error: "Division ID is not exists"})
        }
        else{
            const hodsql = "SELECT * FROM users WHERE email = ?"
            connection.query(hodsql, [req.body.hod], (err, result) => {
                if(err) throw err

                if(result.length == 0){
                    return res.json({Error: "HOD is not exists"})
                }
                else if(result[0].role === "HOD"){
                    const ra1sql = "SELECT * FROM employee WHERE email = ?"
                    connection.query(ra1sql, [req.body.ra1], (err, result) => {
                        if(err) throw err

                        if(result.length == 0){
                            return res.json({Error: "RA1 is not exists"})
                        }
                        else if(result[0].category === "RA"){
                            const ra2sql = "SELECT * FROM employee WHERE email = ?"
                            connection.query(ra2sql, [req.body.ra2], (err, result) => {
                                if(err) throw err

                                if(result.length == 0){
                                    return res.json({Error: "RA2 is not exists"})
                                }
                                else if(result[0].category === "RA"){
                                    if(req.body.ra1 === req.body.ra2){
                                        return res.json({Error: "RA1 and RA2 is same"})
                                    }
                                    else{
                                        //update data
                                        const sql = "UPDATE project SET divno = ?, hod = ?, ra1 = ?, ra2 = ?, update_at = ? WHERE pid = ?"
                                        //const sql = "UPDATE division SET title = ?, location = ?, email = ?, update_at = ? WHERE did = ?";
                                        const update_at = new Date();
                                        connection.query(sql, [req.body.divno, req.body.hod, req.body.ra1, req.body.ra2, update_at, UpdateProjectId], (err, result) => {
                                            if(err){
                                                return res.json({Error: "ERROR on SERVER"})
                                            }
                                            else{
                                                return res.json({Status: "Success"})
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

//DeleteProject 

app.delete('/DeleteProject/:id', (req, res) =>{
    const DeleteID = req.params.id;
    const sql = "DELETE FROM project WHERE pid = ?"

    connection.query(sql, [DeleteID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

//------------------- Project End  ---------------------------
//-------------------- Leave Start --------------------

//RequestLeave
app.post('/RequestLeave/:id', (req, res) => {
    const Email = req.params.id
    console.log(Email)

    const hodsql = "SELECT * FROM users WHERE email = ?"
    connection.query(hodsql, [req.body.HoDEmail], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            return res.json({Error: "HOD not exists"})
        }
        else if(result[0].role === "HOD"){
            const roleSql = "SELECT * FROM users WHERE email = ?"
            connection.query(roleSql, [Email], (err, result) => {
                if(err) throw err

                if(result.length > 0){
                    const sql = "INSERT INTO leaves (StartTime, Email, Name, HoDEmail, Type, JobCategory, StartDate, EndDate, Duration, Status, create_at, update_at) VALUES (?)"
                    const create_at = new Date()
                    const update_at = new Date()
                    const status = "Requested"
                    const JobCategory = result[0].role
                    const empName = result[0].username
        
                    const value = [
                        req.body.StartTime,
                        Email,
                        empName,
                        req.body.HoDEmail,
                        req.body.Type,
                        JobCategory,
                        req.body.StartDate,
                        req.body.EndDate,
                        req.body.Duration,
                        status,
                        create_at,
                        update_at
                    ]
                    console.log(req.body)
                    console.log(value)
                    connection.query(sql, [value], (err, result) =>{
                        if(err){
                            return res.json({Error: "Error on SERVER"})
                        }
                        else{
                            
                            var mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: req.body.HoDEmail,
                                subject: 'Request a Leave',
                                text: 'There is a Leave Request From' + Email + 'To Recommend or Reject'
                            };

                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                  return res.json({Status: "Success"})
                                }
                            });
                        }
                    })
                }
            })

        }
    })
})

//LeaveRec
app.get('/LeaveRec', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Requested"

    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// LeaveRecDenied
app.get('/LeaveRecDenied', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Denied"

    connection.query(sql, [status], (err, result) =>{
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// LeaveRecAccept
app.get('/LeaveRecAccept', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Recommend"

    connection.query(sql, [status], (err, result) =>{
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//RecLeave
app.post('/RecLeave/:id', (req, res) => {
    const LeaveID = req.params.id
    const sql = "UPDATE leaves SET Status = ?, update_at = ? WHERE LID = ?"
    const update_at = new Date()
    const status = "Recommend"
    
    connection.query(sql, [status, update_at, LeaveID], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            const emailsql = "SELECT * FROM leaves WHERE LID = ?"
            connection.query(emailsql, [LeaveID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: result[0].Email,
                        subject: 'About Your Leave Request',
                        text: 'Your Leave Request has been recommended by Head of the Department', 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          return res.json({Status: "Success"})
                        }
                    });  
                }
            })
        }
    })
})
//RecLeaveN
app.post('/RecLeaveN/:id', (req, res) => {
    const LeaveID = req.params.id
    const sql = "UPDATE leaves SET Status = ?, update_at = ? WHERE LID = ?"
    const update_at = new Date()
    const status = "Denied"
    
    connection.query(sql, [status, update_at, LeaveID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            const emailsql = "SELECT * FROM leaves WHERE LID = ?"
            connection.query(emailsql, [LeaveID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: result[0].Email,
                        subject: 'About Your Leave Request',
                        text: 'Your Leave Request has been Rejected by Head of the Department', 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          return res.json({Status: "Success"})
                        }
                    });  
                }
            })
        }
    })
})

//LeavesToApprove
app.get('/LeavesToApprove', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Recommend"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//LeaveReject
app.get('/LeaveReject', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Reject"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// LeaveApproved
app.get('/LeaveApproved', (req, res) => {
    const sql = "SELECT * FROM leaves WHERE Status = ?"
    const status = "Approve"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

//ApproveLeave
app.post('/ApproveLeave/:id', (req, res) => {
    const ApproveID = req.params.id
    const sql = "UPDATE leaves SET Status = ? WHERE LID = ?"
    const status = "Approve"

    connection.query(sql, [status, ApproveID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// RejectLeave
app.post('/RejectLeave/:id', (req, res) => {
    const RejectID = req.params.id
    const sql = "UPDATE leaves SET Status = ? WHERE LID = ?"
    const status = "Reject"

    connection.query(sql, [status, RejectID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// HODRecLeaves
app.get('/HODRecLeaves/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM leaves WHERE Status =? && HoDEmail = ?"
    const status = "Requested"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// CountHodLeaves
app.get('/CountHodLeaves/:id', (req, res) => {
    const HoDEmail = req.params.id
    const sql = "SELECT COUNT(LID) AS HodLeaves FROM leaves WHERE Status =? && HoDEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const Status = "Requested"

    connection.query(sql, [Status, HoDEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ HodLeaves: results[0].HodLeaves }); // Send count in JSON format
    });
})

// CountHodRese
app.get('/CountHodRese/:id', (req, res) => {
    const HoDEmail = req.params.id
    const sql = "SELECT COUNT(RID) AS HodRese FROM reservations WHERE Status =? && HoDEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const Status = "Requested"

    connection.query(sql, [Status, HoDEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ HodRese: results[0].HodRese }); // Send count in JSON format
    });
})

// CountHodScientist
app.get('/CountHodScientist/:id', (req, res) => {
    const HoDEmail = req.params.id
    const checkDivi = "SELECT * FROM division WHERE email = ?"

    connection.query(checkDivi, [HoDEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            if(result.length == 0){
                return true
            }
            // console.log(result[0].did)
            const sql = "SELECT COUNT(eid) AS HodReseSci FROM employee WHERE dno =? && category =? ";
            // const sql = "SELECT COUNT(eid) AS emp FROM employee";
            const UserRole = "Scientist"
            const dno = result[0].did
                    
            connection.query(sql, [dno, UserRole], (error, results) => {
              if (error) {
                console.error('Error fetching data:', error);
                res.status(500).send({ message: 'Error fetching data' });
                return;
              }
          
              res.json({ HodReseSci: results[0].HodReseSci }); // Send count in JSON format
            });
        }
    })
})

// CountHodRA
app.get('/CountHodRA/:id', (req, res) => {
    const HoDEmail = req.params.id
    const checkDivi = "SELECT * FROM division WHERE email = ?"

    connection.query(checkDivi, [HoDEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            if(result.length == 0){
                return true
            }
            const sql = "SELECT COUNT(eid) AS HodRA FROM employee WHERE dno =? && category =? ";
            // const sql = "SELECT COUNT(eid) AS emp FROM employee";
            const UserRole = "RA"
            const dno = result[0].did
                    
            connection.query(sql, [dno, UserRole], (error, results) => {
              if (error) {
                console.error('Error fetching data:', error);
                res.status(500).send({ message: 'Error fetching data' });
                return;
              }
          
              res.json({ HodRA: results[0].HodRA }); // Send count in JSON format
            });
        }
    })
})

// HODRecoLeaves

app.get('/HODRecoLeaves/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM leaves WHERE Status =? && HoDEmail = ?"
    const status = "Recommend"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// HodRejectLeves
app.get('/HodRejectLeves/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM leaves WHERE Status =? && HoDEmail = ?"
    const status = "Denied"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    }) 
})

//--------------------- Leave End -------------------

//my stats

//CountMyLeavs

app.get('/CountMyLeavs/:id', (req, res) => {
    const CurrentEmail = req.params.id
    // console.log(CurrentEmail)
    const sql = "SELECT COUNT(LID) AS le FROM leaves WHERE Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, [CurrentEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ le: results[0].le }); // Send count in JSON format
    });
})

// CountMyRese

app.get('/CountMyRese/:id', (req, res) => {
    const CurrentEmail = req.params.id
    // console.log(CurrentEmail)
    const sql = "SELECT COUNT(RID) AS myRese FROM reservations WHERE Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, [CurrentEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ myRese: results[0].myRese }); // Send count in JSON format
    });
})

// UserViewLeaves
app.get('/UserViewLeaves/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM leaves WHERE Email = ?"
    console.log(UserEmail)
    connection.query(sql, [UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// UserReseView
app.get('/UserReseView/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM reservations WHERE Email = ?"
    console.log(UserEmail)
    connection.query(sql, [UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// CountReqLeaves
app.get('/CountReqLeaves', (req, res) => {
    const sql = "SELECT COUNT(LID) AS ReqLeave FROM leaves WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Requested"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ ReqLeave: results[0].ReqLeave }); // Send count in JSON format
    });
})

// CountDeniedLeaves

app.get('/CountDeniedLeaves', (req, res) => {
    const sql = "SELECT COUNT(LID) AS DenLeave FROM leaves WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status1 = "Denied"
    connection.query(sql, [status1], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ DenLeave: results[0].DenLeave }); // Send count in JSON format
    });
})

// CountApproveLeave
app.get('/CountApproveLeave', (req, res) => {
    const sql = "SELECT COUNT(LID) AS ApproveLeaves FROM leaves WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ ApproveLeaves: results[0].ApproveLeaves }); // Send count in JSON format
    });
})

// CountLeaveRec
app.get('/CountLeaveRec', (req, res) => {
    const sql = "SELECT COUNT(LID) AS RecLeaves FROM leaves WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Recommend"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ RecLeaves: results[0].RecLeaves }); // Send count in JSON format
    });
})

// CountMyReqLeave
app.get('/CountMyReqLeave/:id' ,(req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(LID) AS MyRecLeave FROM leaves WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Requested"

    connection.query(sql, [status, UserEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyRecLeave: results[0].MyRecLeave }); // Send count in JSON format
    });
})

// CountMyRejLeave
app.get('/CountMyRejLeave/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(LID) AS MyRejLeave FROM leaves WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Reject"

    connection.query(sql, [status, UserEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyRejLeave: results[0].MyRejLeave }); // Send count in JSON format
    });
})

// CountAppLeave
app.get('/CountAppLeave/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(LID) AS MyAppLeave FROM leaves WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"

    connection.query(sql, [status, UserEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyAppLeave: results[0].MyAppLeave }); // Send count in JSON format
    });
})

// CountRequestRese
app.get('/CountRequestRese/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(RID) AS MyReqRese FROM reservations WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Requested"

    connection.query(sql, [status, UserEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyReqRese: results[0].MyReqRese }); // Send count in JSON format
    });
})
// CountApproveRese

app.get('/CountApproveRese/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(RID) AS MyApproveRese FROM reservations WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"

    connection.query(sql, [status, UserEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyApproveRese: results[0].MyApproveRese }); // Send count in JSON format
    });
})

// ---------------------------- Reservation ---------------------

// hodEmail
app.get('/hodEmail', (req, res) => {
    const sql = "SELECT * FROM users WHERE role = ?"
    const hod = "HOD";
    connection.query(sql, [hod], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// UserDivivsion
app.get('/UserDivivsion', (req, res) => {
    const sql = "SELECT * FROM division"

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// EmpName
app.get('/EmpName/:id', (req, res) => {
    const empEmail = req.params.id
    console.log(empEmail)


    const sql = "SELECT username, role FROM users WHERE email = ?"
    
    connection.query(sql, [empEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            console.log(result)
            res.json(result[0]);
        }
    })
})



// AddReservation
app.post('/AddReservation/:id', (req, res) => {
    const UserEmail = req.params.id
    // console.log(UserEmail)
    console.log(req.body)
    
    HoDEmail = req.body.AddRese.HoDEmail;
    console.log(HoDEmail)

    const checkhod = "SELECT * FROM users WHERE email = ?"
    connection.query(checkhod, [HoDEmail], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            return res.json({Error: "HOD not exists"})
        }
        else if(result[0].role === "HOD"){
            const checkuser = "SELECT * FROM users WHERE email = ?"
            connection.query(checkuser, [UserEmail], (err, result) => {
                if(err) throw err

                if(result.length > 0){
                    const sql = "INSERT INTO reservations(StartDate, time, loc_route, HoDEmail, other_passengers, Name, EndDate, mode_travel, Status, Email, designation, fundingsource, division, purpose, veh_type, create_at, update_at) VALUES(?)"
                    const create_at = new Date()
                    const update_at = new Date()
                    const values = [
                        req.body.AddRese.StartDate,
                        req.body.AddRese.Time,
                        req.body.AddRese.Location,
                        HoDEmail,
                        req.body.AddRese.Passengers,
                        req.body.empUsername,
                        req.body.AddRese.EndDate,
                        req.body.AddRese.Mode,
                        'Requested',
                        UserEmail,
                        req.body.empRole,
                        req.body.AddRese.Funding,
                        req.body.AddRese.Division,
                        req.body.AddRese.Purpose, 
                        req.body.AddRese.Vehicle,
                        create_at,
                        update_at,
                    ]

                    connection.query(sql, [values], (err, result) => {
                        if(err) {
                            return res.json({Error: "ERROR on SERVER"})
                        }
                        else{
                            var mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: HoDEmail,
                                subject: 'Notification: Reservation',
                                text: 'The Reservation has been Requested from : ' + UserEmail, 
                            };
        
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                  return res.json({Status: "Success"})
                                }
                            });
                        }
                    })
                }
            })
        }
    })

})

// ReseReqCount
app.get('/ReseReqCount', (req, res) => {
    const sql = "SELECT COUNT(RID) AS RecRese FROM reservations WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Requested"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ RecRese: results[0].RecRese }); // Send count in JSON format
    });
})

// RequestRese

app.get('/RequestRese', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const status = "HOD Recommended"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "Error in server"})
        }
        else{
            return res.json(result)
        }
    })
})

// DriverData

app.get('/DriverData', (req, res) => {
    const sql = "SELECT * FROM drivers WHERE Status = ?"
    const DriverStatus = "End Duty"

    connection.query(sql, [DriverStatus], (err, result) => {
        if(err){
            return res.json({Error: "Error in server"})
        }
        else{
            return res.json(result)
        }
    })
})

// AssignDriver
app.post('/AssignDriver/:id', (req, res) => {
    const RequstID = req.params.id;
    // console.log(req.body)
    // console.log(RequstID)

    const sql = "UPDATE reservations SET DEmail = ?, veh_reg_no = ? WHERE RID = ?"
    connection.query(sql, [req.body.DEmail, req.body.VehiReg, RequstID], (err, result) =>{
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            // Add unit price of vehicle 
            const vehiUp = "SELECT * FROM vehicles WHERE regno = ?"
            connection.query(vehiUp, [req.body.VehiReg], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const vehi_unit_p = result[0].unit_charge
                    const Updaterese = "UPDATE reservations SET uprice = ? WHERE RID = ?"
                    connection.query(Updaterese, [vehi_unit_p, RequstID], (err, result) => {
                        if(err){
                            return res.json({Error: "Error on server"})
                        }
                        else{
                            return res.json({Status: "Success"})
                        }
                    })
                }
            })
        }
    })
})

// ReservationRec

app.post('/ReservationRec/:id', (req, res) => {
    const RecID = req.params.id;
    const Status = "Recommend"
    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"

    connection.query(sql, [Status, RecID], (err, result) => {
        if(err) {
            return res.json({Error: "Error on Server"})
        }
        else{
            const DriveEmailSql = "SELECT * FROM reservations WHERE RID = ?"
            connection.query(DriveEmailSql, [RecID], (err, result) => {
                if(err){
                    return res.json({Error: "Errror on server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: result[0].DEmail,
                        subject: 'Notification: Assign a Trip',
                        text: 'You are assign as a Driver for Vehicle Number: ' + result[0].veh_reg_no, 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })

        }
    })

})

// ReservationDenied
app.post('/ReservationDenied/:id', (req, res) => {
    const ResID = req.params.id
    const Status = "Denied"
    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"

    connection.query(sql, [Status, ResID], (err, result) => {
        if(err) {
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// ReseDenied
app.get('/ReseDenied', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const status = "Denied"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "Error in server"})
        }
        else{
            return res.json(result)
        }
    }) 
})

// ReservationsRece

app.get('/ReservationsRece', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const status = "Recommend"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "Error in server"})
        }
        else{
            return res.json(result)
        }
    }) 
})

// ReseReceCount
app.get('/ReseReceCount', (req, res) => {
    const sql = "SELECT COUNT(RID) AS ReceRese FROM reservations WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Recommend"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ ReceRese: results[0].ReceRese }); // Send count in JSON format
    });
})

// DeniedReseCount
app.get('/DeniedReseCount', (req, res) => {
    const sql = "SELECT COUNT(RID) AS DeniedRese FROM reservations WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Denied"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ DeniedRese: results[0].DeniedRese }); // Send count in JSON format
    });
})

// ViewRecommendedRese
app.get('/ViewRecommendedRese', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const Status = "Recommend"

    connection.query(sql, [Status], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ApproveResereq.body.ViewReservation.DEmail;
app.post('/ApproveRese/:id', (req, res) => {
    const ApproveID = req.params.id
    const Stauts = "Approve"

    console.log(req.body)

    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"

    connection.query(sql, [Stauts, ApproveID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            // get data
            const getRData = "SELECT * FROM reservations WHERE RID = ?"
            connection.query(getRData, [ApproveID], (err, result) => {
                if(err){
                    return res.json({Error: "Error ON Server"})
                }
                else{
                    console.log("Result: ", result)
                    // insert data to trips tbl

                    const sqlTrips = "INSERT INTO trips(DEmail, UserEmail, vehiRegNo, is_aprove) VALUES (?)"
                    const DEmail = result[0].DEmail
                    const UserEmail = result[0].Email
                    const vehicle = result[0].veh_reg_no
                    const status = "Driver Pending"

                    const value = [
                        DEmail, 
                        UserEmail,
                        vehicle,
                        status
                    ]

                    console.log(value)
                    connection.query(sqlTrips, [value], (err, result) => {
                        if(err){
                            return res.json({Error: "ERROR on SERVERsss"})
                        }
                        else{
                            var mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: UserEmail,
                                subject: 'Notification: About Your Reservation',
                                text: 'The Reservation has been Approved', 
                            };
        
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                return res.json({Status: "Success"})
                                }
                            });
                        }
                    })
                }
            })
        }
    })
})

// RejectRese
app.post('/RejectRese/:id', (req, res) => {
    const RejectID = req.params.id
    const Status = "Reject"

    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"

    connection.query(sql, [Status, RejectID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// RejectReseData
app.get('/RejectReseData', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const Status = "Reject"

    connection.query(sql, [Status], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ApproveReseData

app.get('/ApproveReseData', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const Status = "Approve"

    connection.query(sql, [Status], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ApproveReseCount
app.get('/ApproveReseCount', (req, res) => {
    const sql = "SELECT COUNT(RID) AS ApproveRese FROM reservations WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ ApproveRese: results[0].ApproveRese }); // Send count in JSON format
    });
})

// GetVehicleRegNo

app.get('/GetVehicleRegNo', (req, res) => {
    const sql = "SELECT * FROM vehicles WHERE status = ?"
    const stats = "Off Duty"

    connection.query(sql, [stats], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })

})

// CountMyTasks
// This is for Driver's Tasks

app.get('/CountMyTasks/:id', (req, res) => {
    const Email = req.params.id;
    
    const sql = "SELECT COUNT(ID) AS myTasks FROM trips WHERE is_aprove = ? && DEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const is_aprove = "Driver Pending"
    
    connection.query(sql, [is_aprove, Email], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ myTasks: results[0].myTasks }); // Send count in JSON format
    });
})

// MyNewTrip

app.get('/MyNewTrip/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM trips WHERE is_aprove = ? && DEmail = ?"
    const is_aprove = "Driver Pending"
    connection.query(sql, [is_aprove, UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// GetDuty
app.post('/GetDuty/:id', (req, res) => {
    const TripID = req.params.id
   
    const sql = "UPDATE trips SET is_aprove = ? WHERE ID = ?"
    const status = "Driver on Duty"
    connection.query(sql, [status, TripID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            // update drivers tbl
            const getDriver = "SELECT * FROM trips WHERE ID = ?"
            connection.query(getDriver, [TripID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on SERVER"})
                }
                else{
                    const updateDriver = "UPDATE drivers SET Status = ? WHERE DEmail = ?"
                    const status = "Driver On Duty"
                    const DEmail = result[0].DEmail

                    connection.query(updateDriver, [status, DEmail], (err, result) => {
                        if(err){
                            return res.json({Error: "ERROR in Server"})
                        }
                        else{
                            return res.json({Status: "Success"})
                        }
                    })
                }
            })            
        }
    })
})

// GetOnDuty
app.get('/GetOnDuty/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM trips WHERE is_aprove = ? && DEmail = ?"
    const is_aprove = "Driver on Duty"
    connection.query(sql, [is_aprove, UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// EndDuty
app.post('/EndDuty/:id', (req, res) => {
    const TripID = req.params.id
    // console.log(TripID)
    const sql = "UPDATE trips SET is_aprove = ? WHERE ID = ?"
    const status = "End Duty"
    connection.query(sql, [status, TripID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            // Update Drives tbl
            const getDriver = "SELECT * FROM trips WHERE ID = ?"
            connection.query(getDriver, [TripID], (err, result) => {
                if(err){
                    return res.json({Error: "ERROR on Server"})
                }
                else{
                    // Update drivers tbl
                    const UpdateDriver = "UPDATE drivers SET Status = ? WHERE DEmail = ?"
                    const Status = "End Duty"
                    const DriverEmail = result[0].DEmail
                    connection.query(UpdateDriver, [Status, DriverEmail], (err, result) => {
                        if(err){
                            return res.json({Error: "ERROR in SERVER"})
                        }
                        else{
                            return res.json({Status: "Success"})
                        }
                    })
                }
            })            
        }
    })
})

// GetAllTrips
app.get('/GetAllTrips/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM trips WHERE DEmail = ?"

    connection.query(sql, [UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ViewCalPrice
app.get('/ViewCalPrice', (req, res) => {
    const sql = "SELECT * FROM reservations WHERE Status = ?"
    const status = "Approve"
    connection.query(sql, [status], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// // AddKm

// app.post('/AddKm/:id', (req, res) => {
//     const ReseID = req.params.id

//     const sql = "UPDATE reservations SET milage = ? WHERE RID = ?"
//     const milage = req.body.KMadd

//     console.log(ReseID, milage)

//     // connection.query(sql, [milage, ReseID], (err, result) => {
//     //     if(err){
//     //         return res.json({Error: "ERROR on Server"})
//     //     }
//     //     else{
//     //         return res.json({Status: "Success"})
//     //     }
//     // })
// })

// AddDistance

app.post('/AddDistance/:id', (req, res) => {
    const ReseID = req.params.id
    // console.log(ReseID, req.body)

    const sql = "UPDATE reservations SET milage = ? WHERE RID = ?"
    const milage = req.body.Distance

    connection.query(sql, [milage, ReseID], (err, result) => {
        if(err){
            return res.json({Error: "ERROR in Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })

})

// CalculateCost
app.post('/CalculateCost/:id', (req, res) => {
    const ReseID = req.params.id

    const sql = "SELECT * FROM reservations WHERE RID = ?"
    connection.query(sql, [ReseID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            // calculate cost
            const milage = result[0].milage
            const unitPrice = result[0].uprice
            const userEmail = result[0].Email
            const veh_reg_no = result[0].veh_reg_no

            const cost = milage * unitPrice

            console.log(userEmail)
            const constsql = "UPDATE reservations SET cost = ? WHERE RID = ?"
            
            connection.query(constsql, [cost, ReseID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    // update vehicle milage
                    const sqlMilage = "SELECT * FROM vehicles WHERE regno = ?"
                    connection.query(sqlMilage, [veh_reg_no], (err, result) => {
                        if(err){
                            return res.json({Error: "ERROR on Serve"})
                        }
                        else{
                            // calculate new milage
                            const newMilage = parseInt(result[0].milage) + parseInt(milage) 
                            // update vehicle tbl
                            const milgeVehicle = "UPDATE vehicles SET milage = ? WHERE regno = ?"
                            connection.query(milgeVehicle, [newMilage, veh_reg_no], (err, result) => {
                                if(err){
                                    return res.json({Error: "Error on SERVER"})
                                }
                                else{
                                    var mailOptions = {
                                        from: process.env.EMAIL_USER,
                                        to: userEmail,
                                        subject: 'Vehicle Reservation Charge',
                                        text: 'Your Vehicle Reservation Charge : '+ cost, 
                                    };
                
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log('Email sent: ' + info.response);
                                          return res.json({Status: "Success"})
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

// ---------------------------- Reservation END ---------------------

// HoDdivision

app.get('/HoDdivision/:id', (req, res) => {
    const HodEmail = req.params.id
    const sql = "SELECT title FROM division WHERE email = ?"
    connection.query(sql, [HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result[0])
        }
    })
})

// HodProject
app.get('/HodProject/:id', (req, res) => {
    const HodEmail = req.params.id
    const sql = "SELECT title FROM project WHERE hod = ?"
    connection.query(sql, [HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result[0])
        }
    })
})

// HodRecRese
app.get('/HodRecRese/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM reservations WHERE Status =? && HoDEmail = ?"
    const status = "Requested"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ReseRejectHOD
app.get('/ReseRejectHOD/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM reservations WHERE Status =? && HoDEmail = ?"
    const status = "HOD Reject"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ReseHODAccept
app.get('/ReseHODAccept/:id', (req, res) => {
    const HodEmail = req.params.id

    const sql = "SELECT * FROM reservations WHERE Status =? && HoDEmail = ?"
    const status = "HOD Recommended"
    connection.query(sql, [status, HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// HodReceRecommended
app.post('/HodReceRecommended/:id', (req, res) => {
    const ReseID = req.params.id
    console.log(ReseID)
    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"   
    const status = "HOD Recommended"
    connection.query(sql, [status, ReseID], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            const userEmailsql = "SELECT * FROM reservations WHERE RID = ?"
            connection.query(userEmailsql, [ReseID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: result[0].Email,
                        subject: 'Notification: About Your Reservation',
                        text: 'The Reservation has been Recommended By Head of the Dep', 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    }) 
})

// HodRejectVehiRec
app.post('/HodRejectVehiRec/:id', (req, res) => {
    const ReseID = req.params.id
    console.log(ReseID)
    const sql = "UPDATE reservations SET Status = ? WHERE RID = ?"   
    const status = "HOD Reject"
    connection.query(sql, [status, ReseID], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            const userEmailsql = "SELECT * FROM reservations WHERE RID = ?"
            connection.query(userEmailsql, [ReseID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: result[0].Email,
                        subject: 'Notification: About Your Reservation',
                        text: 'The Reservation has been Rejected By Head of the Dep', 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    }) 
})

// --------------------------------------- SRN Start -----------------------------
// GetProjectData

app.get('/GetProjectData/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM project WHERE ra1 =? || ra2 =?"
    const ra1 = UserEmail
    const ra2 = UserEmail

    connection.query(sql, [ra1, ra2], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// MyDivisionSRN
app.get('/MyDivisionSRN/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM employee WHERE email = ?"
    const MyEmail = UserEmail

    connection.query(sql, [MyEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            if(result.length === 0){
                return true
            }
            const diviData = "SELECT title FROM division WHERE did = ?"
            const diviId = result[0].dno
            // console.log(did)

            connection.query(diviData, [diviId], (err, result) => {
                if(err){
                    return res.json({Error: "Error on SERVER"})
                }
                else{
                    return res.json(result[0])
                    // console.log(result[0].title)
                }
            })
        }
    })
})

// SRNHODEmail
app.get('/SRNHODEmail/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM employee WHERE email = ?"
    const MyEmail = UserEmail

    connection.query(sql, [MyEmail], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            if(result.length === 0){
                return true
            }
            const diviData = "SELECT email FROM division WHERE did = ?"
            const did = result[0].dno
            // console.log(did)

            connection.query(diviData, [did], (err, result) => {
                if(err){
                    return res.json({Error: "Error on SERVER"})
                }
                else{
                    return res.json(result[0])
                    // console.log(result[0].title)
                }
            })
        }
    })
})
// CreateSRN

app.post('/CreateSRN/:id', (req, res) => {
    const UserEmail = req.params.id

    // console.log(UserEmail, req.body)
    // console.log(req.body.MyDiviSRN)

    const sql = "INSERT INTO srn(Name, Email, project, division, Rdate, srnType, PType, PIype, estimate, vote, HoDEmail, description, Status, create_at, update_at) VALUES (?)"
    const create_at = new Date()
    const update_at = new Date()
    const value = [
        req.body.empUsername,
        UserEmail,
        req.body.DataSRN.Project,
        req.body.MyDiviSRN,
        req.body.DataSRN.RDate,
        req.body.DataSRN.srnType,
        req.body.DataSRN.PType,
        req.body.DataSRN.PIype,
        req.body.DataSRN.estimate,
        req.body.DataSRN.vote,
        req.body.SRNHOD,
        req.body.DataSRN.Description,
        "Request",
        create_at,
        update_at
    ]

    console.log(value)

    connection.query(sql, [value], (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.SRNHOD,
                subject: 'Notification: The SRN Request',
                text: 'The SRN Request is Waiting for recommended', 
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                return res.json({Status: "Success"})
                }
            });
        }
    })
})

// CountSRNHOD
app.get('/CountSRNHOD/:id', (req, res) => {
    const Email = req.params.id;
    
    const sql = "SELECT COUNT(SID) AS HODSRN FROM srn WHERE Status = ? && HoDEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const is_aprove = "Request"
    
    connection.query(sql, [is_aprove, Email], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ HODSRN: results[0].HODSRN }); // Send count in JSON format
    });
})

// HodRecSRN
app.get('/HodRecSRN/:id', (req, res) => {
    const HoDEmail = req.params.id
    const sql = "SELECT * FROM srn WHERE HoDEmail = ?"
    
    connection.query(sql, [HoDEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// HodRecoSRN

app.post('/HodRecoSRN/:id', (req, res) => {
    const SRNID = req.params.id

    const sql = "UPDATE srn SET Status = ? WHERE SID = ?"

    const status = "Recommend"

    connection.query(sql, [status, SRNID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM srn WHERE SID = ?"
            connection.query(userEmail, [SRNID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const MyEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: MyEmail,
                        subject: 'Notification: The SRN Request',
                        text: 'The SRN Request has been Recommended By Head of the Dep', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// HodRejectSRN

app.post('/HodRejectSRN/:id', (req, res) => {
    const SRNID = req.params.id

    const sql = "UPDATE srn SET Status = ? WHERE SID = ?"
    const status = "Reject"

    connection.query(sql, [status, SRNID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM srn WHERE SID = ?"
            connection.query(userEmail, [SRNID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const MyEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: MyEmail,
                        subject: 'Notification: The SRN Request',
                        text: 'The SRN Request has been Rejected By Head of the Dep', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// CountLABSrns
app.get('/CountLABSrns', (req, res) => {
   
    const sql = "SELECT COUNT(SID) AS ReceSRN FROM srn ";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Recommend"
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ ReceSRN: results[0].ReceSRN }); // Send count in JSON format
    });
})


// ReseSRNs
app.get('/ReseSRNs', (req, res) => {
    const sql = "SELECT * FROM srn"

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// SRNNoDate
// assign SRN Request Number, CData

app.post('/SRNNoDate/:id', (req, res) => {
    const SRNID = req.params.id
    // console.log(SRNID, req.body)
    const checkSql = "SELECT * FROM srn WHERE ReqNo = ?"
    connection.query(checkSql, [req.body.SRNNum], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            const sql = "UPDATE srn SET ReqNo = ?, Cdate = ?, Status = ? WHERE SID = ?"
            const status = "SetSRNNo"
            connection.query(sql, [req.body.SRNNum, req.body.CData, status, SRNID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const getEmail = "SELECT * FROM srn WHERE SID = ?"
                    connection.query(getEmail, [SRNID], (err, result) => {
                        if(err){
                            return res.json({Error: "ERRROR on SERVER"})
                        }
                        else{
                            if(result.length == 0){
                                return true
                            }

                            myEmail = result[0].Email

                            var mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: myEmail,
                                subject: 'Notification: The SRN Request',
                                text: 'The SRN Request Number is : ' + req.body.SRNNum, 
                            };
                
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                return res.json({Status: "Success"})
                                }
                            });

                        }
                    })


                }
            }) 
        }
        else{
            return res.json({Error: "Entered SRN Request Numver Already exists"})
        }
    })
})

// LabApproveSRN
// Approve by LabManager

app.post('/LabApproveSRN/:id', (req, res) => {
    const SRNnum = req.params.id

    const sql = "UPDATE srn SET Status =? WHERE SID = ?"
    const Status = "LabApprove"
    console.log(SRNnum)

    connection.query(sql, [Status, SRNnum], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            console.log(result)
            const getUserEmail = "SELECT * FROM srn WHERE SID = ?"
            connection.query(getUserEmail, [SRNnum], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length === 0){
                        return true
                    }
                    const myEmail = result[0].Email
                    console.log(myEmail)

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The SRN Request',
                        text: 'The SRN Request has been Approve By Lab Manager', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// ApproveSRN
// Approve by  Dec Sec

app.get('/ApproveSRN', (req, res) =>{
    const sql = "SELECT * FROM srn"
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "ERROR on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// SRNapprove

app.post('/SRNapprove/:id', (req, res) => {
    const SrnID = req.params.id
    const sql = "UPDATE srn SET Status = ? WHERE SID = ?"

    const status = "Approve"

    connection.query(sql, [status, SrnID], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            // get user
            const userEmail = "SELECT * FROM srn WHERE SID = ?"
            connection.query(userEmail, [SrnID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on SERVER"})
                }
                else{
                    if(result.length === 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The SRN Request',
                        text: 'The SRN Request has been Approved', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// SRNReject

app.post('/SRNReject/:id', (req, res) => {
    const SrnID = req.params.id
    const sql = "UPDATE srn SET Status = ? WHERE SID = ?"

    const status = "Reject"

    connection.query(sql, [status, SrnID], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            // get user
            const userEmail = "SELECT * FROM srn WHERE SID = ?"
            connection.query(userEmail, [SrnID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on SERVERssss"})
                }
                else{
                    if(result.length === 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The SRN Request',
                        text: 'The SRN Request has been Reject', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// SRNDataStatus
app.get('/SRNDataStatus/:id', (req, res) => {
    const srnID = req.params.id

    // console.log(srnID)
    const sql = "SELECT ReqNo FROM srn WHERE SID = ?"
    connection.query(sql, [srnID], (err, result) => {
        if(err){
            return res.json({Error: "ERRROR on SERVER"})
        }
        else{
            // console.log("Hi " + result[0].ReqNo)
            return res.json(result[0])
        }
    })
})

// SetCurrentStatusSRN

app.post('/SetCurrentStatusSRN/:id', (req, res) => {
    const srnID = req.params.id
    console.log(srnID, req.body)

    const sql = "UPDATE srn SET Status = ? WHERE SID = ?"
    connection.query(sql, [req.body.Status, srnID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// CountMySRN

app.get('/CountMySRN/:id', (req, res) => {
    const CurrentEmail = req.params.id
    // console.log(CurrentEmail)
    const sql = "SELECT COUNT(SID) AS mySRNview FROM srn WHERE Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, [CurrentEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ mySRNview: results[0].mySRNview }); // Send count in JSON format
    });
})

// CountRequeseSRN

app.get('/CountRequeseSRN/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(SID) AS MyReqSRN FROM srn WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Request"

    connection.query(sql, [status, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyReqSRN: results[0].MyReqSRN }); // Send count in JSON format
    });
})


// CountRejectSRN

app.get('/CountRejectSRN/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(SID) AS MyRejectSRN FROM srn WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Reject"

    connection.query(sql, [status, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyRejectSRN: results[0].MyRejectSRN }); // Send count in JSON format
    });
})

// UserViewSRN
app.get('/UserViewSRN/:id', (req, res) => {
    const UserEmail = req.params.id

    const sql = "SELECT * FROM srn WHERE Email = ?"
    connection.query(sql, [UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// --------------------------------------- SRN End -----------------------------


// --------------------------------------- Work Request Start -----------------------

// CreateWork

app.post('/CreateWork/:id', (req, res) => {
    const userEmail = req.params.id
    console.log(userEmail, req.body)

    const sqlcheck = "SELECT * FROM users WHERE email = ?"
    connection.query(sqlcheck, [req.body.workReq.SEmail], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            return res.json({Error: "Responsible Officer's Email Not Found in The System"})
        }
        else{
            // inset data
            const sql = "INSERT INTO workrequest(Name, Email, project, division, RDate, WType, HoDEmail, SEmail, description, Status, create_at, update_at) VALUES (?)"
            const create_at = new Date()
            const update_at = new Date()
            const value = [
                req.body.empUsername,
                userEmail,
                req.body.workReq.Project,
                req.body.MyDiviSRN,
                req.body.workReq.RDate,
                req.body.workReq.WType,
                req.body.SRNHOD,
                req.body.workReq.SEmail,
                req.body.workReq.Description,
                "Request",
                create_at,
                update_at
            ]

            // console.log(value)

            connection.query(sql, [value], (err, result) => {
                if(err) {
                    return res.json({Error: "Error on Server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: req.body.SRNHOD,
                        subject: 'Notification: The Work Request',
                        text: 'There is a Work Request', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// CounthodWorks
app.get('/CounthodWorks/:id', (req, res) => {
    const Email = req.params.id;
    
    const sql = "SELECT COUNT(WID) AS HodWork FROM workrequest WHERE Status = ? && HoDEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const is_aprove = "Request"
    
    connection.query(sql, [is_aprove, Email], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ HodWork: results[0].HodWork }); // Send count in JSON format
    });
})

// HodReseWorkReq
app.get('/HodReseWorkReq/:id', (req, res) => {
    const HodEmail = req.params.id
    const sql = "SELECT * FROM workrequest WHERE HoDEmail = ?"
    connection.query(sql, [HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// HodWorkApprove

app.post('/HodWorkApprove/:id', (req, res) => {
    const workID = req.params.id

    const sql = "UPDATE workrequest SET Status = ? WHERE WID =?"
    const status = "HodRecommended"

    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            const getUser = "SELECT * FROM workrequest WHERE WID = ?"
            connection.query(getUser, [workID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length === 0){
                        return true
                    }

                    myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Work Request',
                        text: 'The Work Request has been Recommended By Head of the Dep', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// HodWorkReject

app.post('/HodWorkReject/:id', (req, res) => {
    const workID = req.params.id

    const sql = "UPDATE workrequest SET Status = ? WHERE WID =?"
    const status = "HodReject"

    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            const getUser = "SELECT * FROM workrequest WHERE WID = ?"
            connection.query(getUser, [workID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length === 0){
                        return true
                    }

                    myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Work Request',
                        text: 'The Work Request has been Rejected By Head of the Dep', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// WrokReqtoRec
app.get('/WrokReqtoRec', (req, res) =>{
    const sql = "SELECT * FROM workrequest"

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            return res.json(result)
        }
    })
})

// WorkRece

app.post('/WorkRece/:id', (req, res) => {
    const workID = req.params.id

    const sql = "UPDATE workrequest SET Status = ? WHERE WID = ?"
    const status = "Recommended"
    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// WorkReject
app.post('/WorkReject/:id', (req, res) => {
    const workID = req.params.id

    const sql = "UPDATE workrequest SET Status = ? WHERE WID = ?"
    const status = "Reject"
    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// AssignReqNumberWork
app.post('/AssignReqNumberWork/:id', (req, res) => {
    const WorkId = req.params.id
    // console.log(WorkId, req.body)
    const checkNo = "SELECT * FROM workrequest WHERE ReqNo = ?"
    connection.query(checkNo, [req.body.reqNo], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            const sql = "UPDATE workrequest SET ReqNo = ?, Status = ? WHERE WID = ?"
            const status = "SetRegNo"
            connection.query(sql, [req.body.reqNo, status, WorkId], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
        else{
            return res.json({Error: "The Entered Request Number is Already exists"})
        }
    })
})

// ToApproveWorkReq
app.get('/ToApproveWorkReq', (req, res) => {
    const sql = "SELECT * FROM workrequest"
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on SERVER"})
        }
        else{
            return res.json(result)
        }
    })
})

// ApproveWorkReq
app.post('/ApproveWorkReq/:id', (req, res) =>{
    const workID = req.params.id
    const sql = "UPDATE workrequest SET Status = ? WHERE WID = ?"
    const status = "Approve"
    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            const userEmail = "SELECT * FROM workrequest WHERE WID = ?"
            connection.query(userEmail, [workID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                   const mtEmail = result[0].Email
                   
                   var mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: mtEmail,
                    subject: 'Notification: The Work Request',
                    text: 'The Work Request has been Approve', 
                };
    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({Status: "Success"})
                    }
                });
                }
            })
        }
    })
})

// RejectWorkReq

app.post('/RejectWorkReq/:id', (req, res) => {
    const workID = req.params.id
    const sql = "UPDATE workrequest SET Status = ? WHERE WID = ?"
    const status = "Reject"
    connection.query(sql, [status, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            const userEmail = "SELECT * FROM workrequest WHERE WID = ?"
            connection.query(userEmail, [workID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                   const mtEmail = result[0].Email
                   
                   var mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: mtEmail,
                    subject: 'Notification: The Work Request',
                    text: 'The Work Request has been Rejected', 
                };
    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({Status: "Success"})
                    }
                });
                }
            })
        }
    })
})

// WrokComplete

app.post('/WrokComplete/:id', (req, res) => {
    const workID = req.params.id
    const sql = "UPDATE workrequest SET Completed = ? WHERE WID = ?"
    const complete = 1
    connection.query(sql, [complete, workID], (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
            const userEmail = "SELECT * FROM workrequest WHERE WID = ?"
            connection.query(userEmail, [workID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                   const mtEmail = result[0].Email
                   
                   var mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: mtEmail,
                    subject: 'Notification: The Work Request',
                    text: 'The Work Request has been Completed', 
                };
    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({Status: "Success"})
                    }
                });
                }
            })
        }
    })
})


// CountRequestWork

app.get('/CountRequestWork/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(WID) AS MyRequestWork FROM workrequest WHERE Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Request"

    connection.query(sql, [status, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyRequestWork: results[0].MyRequestWork }); // Send count in JSON format
    });
})

// CountRejectWork

app.get('/CountRejectWork/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(WID) AS MyRejectWork FROM workrequest WHERE Status = ? || Status = ? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status1 = "HodReject"
    const status2 = "Reject"

    connection.query(sql, [status1, status2, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyRejectWork: results[0].MyRejectWork }); // Send count in JSON format
    });
})

// CountApproveWork

app.get('/CountApproveWork/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(WID) AS MyApproveWork FROM workrequest WHERE Status =? && Completed =? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"
    const complete = 1

    connection.query(sql, [status, complete, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyApproveWork: results[0].MyApproveWork }); // Send count in JSON format
    });
})

// UserViewWorReq

app.get('/UserViewWorReq/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "SELECT * FROM workrequest WHERE Email = ?"
    connection.query(sql, (userEmail), (err, result) => {
        if(err){
            return res.json({Error: "Error on server"})
        }
        else{
             return res.json(result)
        }
    })
})

// CountMyWork
app.get('/CountMyWork/:id', (req, res) => {
    const CurrentEmail = req.params.id
    // console.log(CurrentEmail)
    const sql = "SELECT COUNT(WID) AS myWorkview FROM workrequest WHERE Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, [CurrentEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ myWorkview: results[0].myWorkview }); // Send count in JSON format
    });
})

// ----------------------------------------- Work Request End ---------------------

// ------------------------------------------ GetaPass Start ------------------------------

// CreateGatePass
app.post('/CreateGatePass/:id', (req, res) => {
    const UserEmail = req.params.id
    // console.log(UserEmail, req.body)

    const checkInvNo = "SELECT * FROM equipment WHERE invno = ?"
    connection.query(checkInvNo, [req.body.GatePass.InvNo], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            return res.json({Error: "Equipment not Found in Entered Inventory Number"})
        }
        else{
            // add getpass
            const sql = "INSERT INTO gatepass(Name, Email, HoDEmail, designation, Date, RDate, purpose, location, newplace, item, itemtype, quantity, invno, description, officer, newofficer, security, Status, create_at, update_at) VALUES (?)"
            const security = "Waiting"
            const status = "Request"
            const create_at = new Date()
            const update_at = new Date()
            
            const value = [
                req.body.empUsername,
                UserEmail,
                req.body.SRNHOD,
                req.body.empRole,
                req.body.GatePass.RDate,
                req.body.GatePass.ReturnDate,
                req.body.GatePass.Purpose,
                req.body.GatePass.Location,
                req.body.GatePass.NLocation,
                req.body.GatePass.IName,
                req.body.GatePass.IType,
                req.body.GatePass.Quantity,
                req.body.GatePass.InvNo,
                req.body.GatePass.Description,
                req.body.GatePass.Officer,
                req.body.GatePass.OutOfficer,
                security,
                status,
                create_at,
                update_at              
            ]

            // console.log(value)

            connection.query(sql, [value], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: req.body.SRNHOD,
                        subject: 'Notification: The GatePass',
                        text: 'There is a GatePass', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })   
})

// CounthodGatePass
app.get('/CounthodGatePass/:id', (req, res) => {
    const Email = req.params.id;
    
    const sql = "SELECT COUNT(GID) AS HodGate FROM gatepass WHERE Status = ? && HoDEmail = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const is_aprove = "Request"
    
    connection.query(sql, [is_aprove, Email], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ HodGate: results[0].HodGate }); // Send count in JSON format
    });
})

// HodReqGatePass
app.get('/HodReqGatePass/:id', (req, res) => {
    const HodEmail = req.params.id
    const sql = "SELECT * FROM gatepass WHERE HodEmail = ?"

    connection.query(sql, [HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// HodApproveGatePass
app.post('/HodApproveGatePass/:id', (req, res) =>{
    const GatePassID = req.params.id

    const sql = "UPDATE gatepass SET Status =? WHERE GID =?"
    const status = "HODRecommended"
    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM gatepass WHERE GID = ?"
            connection.query(userEmail, [GatePassID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length == 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The GatePass',
                        text: 'The Gate Pass Has been Recommended by Head of the Dept.', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})


// HodRejectGatePass
app.post('/HodRejectGatePass/:id', (req, res) => {
    const GatePassID = req.params.id

    const sql = "UPDATE gatepass SET Status =? WHERE GID =?"
    const status = "HODReject"
    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM gatepass WHERE GID = ?"
            connection.query(userEmail, [GatePassID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length == 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The GatePass',
                        text: 'The Gate Pass Has been Rejected by Head of the Dept.', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// GetPassforRec
app.get('/GetPassforRec', (req, res) => {
    const sql = "SELECT * FROM gatepass"
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// GetPassRec
app.post('/GetPassRec/:id', (req, res) => {
    const GatePassID = req.params.id
    const sql = "UPDATE gatepass SET Status = ? WHERE GID = ?"

    const status = "Recommended"

    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// GetPassReject

app.post('/GetPassReject/:id', (req, res) => {
    const GatePassID = req.params.id
    const sql = "UPDATE gatepass SET Status = ? WHERE GID = ?"

    const status = "Reject"

    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// ApproveGatePassSet

app.get('/ApproveGatePassSet', (req, res) => {
    const sql = "SELECT * FROM gatepass"
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// ToApproveGate

app.post('/ToApproveGate/:id', (req, res) =>{
    const GatePassID = req.params.id

    const sql = "UPDATE gatepass SET Status =? WHERE GID =?"
    const status = "Approve"
    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM gatepass WHERE GID = ?"
            connection.query(userEmail, [GatePassID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length == 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The GatePass',
                        text: 'The Gate Pass Has been Approved ', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// ToRejectGate

app.get('/ToRejectGate/:id', (req, res) => {
    const GatePassID = req.params.id

    const sql = "UPDATE gatepass SET Status =? WHERE GID =?"
    const status = "Reject"
    connection.query(sql, [status, GatePassID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            const userEmail = "SELECT * FROM gatepass WHERE GID = ?"
            connection.query(userEmail, [GatePassID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length == 0){
                        return true
                    }

                    const myEmail = result[0].Email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The GatePass',
                        text: 'The Gate Pass Has been Rejected ', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });
                }
            })
        }
    })
})

// SecurityCheckGate

app.post('/SecurityCheckGate/:id', (req, res) => {
    const GatePassID = req.params.id
    const sql = "UPDATE gatepass SET security = ? WHERE GID = ?"
    const status_sec =  "Success"

    connection.query(sql, [status_sec, GatePassID], (err, result) => {
        if(err) {
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })

})


// ------------------------------------------ GatePass End --------------------------------


// CounthodSRNTO

app.get('/CountToWork', (req, res) => {
    const sql = "SELECT COUNT(WID) AS WorkTO FROM workrequest WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "HodRecommended"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ WorkTO: results[0].WorkTO }); // Send count in JSON format
    });
})

// CountGateTo

app.get('/CountGateTo', (req, res) => {
    const sql = "SELECT COUNT(GID) AS GateTO FROM gatepass WHERE Status = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "HODRecommended"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ GateTO: results[0].GateTO }); // Send count in JSON format
    });
})

// CountMyGatePass

app.get('/CountMyGatePass/:id', (req, res) => {
    const CurrentEmail = req.params.id
    // console.log(CurrentEmail)
    const sql = "SELECT COUNT(GID) AS myGatePassview FROM gatepass WHERE Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    
    connection.query(sql, [CurrentEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ myGatePassview: results[0].myGatePassview }); // Send count in JSON format
    });
})

// CountReqGatePass

app.get('/CountReqGatePass/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(GID) AS MyReqGate FROM gatepass WHERE Status =? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Request"

    connection.query(sql, [status, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyReqGate: results[0].MyReqGate }); // Send count in JSON format
    });
})

// CountRejectGatePass 

app.get('/CountRejectGatePass/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(GID) AS MyRejectGate FROM gatepass WHERE Status =? || Status =? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Reject"
    const status1 = "HODReject"

    connection.query(sql, [status, status1, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyRejectGate: results[0].MyRejectGate }); // Send count in JSON format
    });
})

// CountApproveGatePass

app.get('/CountApproveGatePass/:id', (req, res) => {
    const UserEmail = req.params.id;
    const sql = "SELECT COUNT(GID) AS MyApprveGate FROM gatepass WHERE Status =? && Email = ?";
    // const sql = "SELECT COUNT(eid) AS emp FROM employee";
    const status = "Approve"

    connection.query(sql, [status, UserEmail], (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
    }

    res.json({ MyApprveGate: results[0].MyApprveGate }); // Send count in JSON format
    });
})

// UserViewGatePass
app.get('/UserViewGatePass/:id', (req, res) => {
    const UserEmail = req.params.id
    const sql = "SELECT * FROM gatepass WHERE Email = ?"

    connection.query(sql, [UserEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})


// ------------------------------ Increment Start -----------------------------

// CreateIncrement
app.post('/CreateIncrement/:id', (req, res) => {
    const UserEmail = req.params.id
    console.log(UserEmail, req.body)
    const sql = "INSERT INTO increment (ename, email, designation, division, hodemail, idate, sscale, sstep, nsalary, category, status, create_at, update_at) VALUES (?)"

    const status = "Request"
    const create_at = new Date()
    const update_at = new Date()

    const value = [
        req.body.empUsername,
        UserEmail,
        req.body.IncrementData.designation,
        req.body.MyDiviSRN,
        req.body.SRNHOD,
        req.body.IncrementData.idate,
        req.body.IncrementData.sscale,
        req.body.IncrementData.sstep,
        // req.body.IncrementData.psalary,
        req.body.IncrementData.nsalary,
        req.body.empRole,
        status,
        create_at,
        update_at
    ]

    // console.log(value)

    connection.query(sql, [value], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
            console.log(err)
        }
        else{
            
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.SRNHOD,
                subject: 'Notification: The Increment Request',
                text: 'There is an Increment Request ', 
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                return res.json({Status: "Success"})
                }
            });
        }
    })

})


// HodIncrementRec
app.get('/HodIncrementRec/:id', (req, res) => {
    const HodEmail = req.params.id
    const sql ="SELECT * FROM increment WHERE hodemail = ?"
    connection.query(sql, [HodEmail], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// SetUserStatusInc
app.post('/SetUserStatusInc/:id', (req, res) => {
    const IncID = req.params.id
    // console.log(req.body)

    const sql ="UPDATE increment SET attendance = ?, decipline =?, conduct = ? WHERE IID =?"
    connection.query(sql, [req.body.Attendance, req.body.Decipline, req.body.Conduct, IncID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// HodRecInc
app.post('/HodRecInc/:id', (req, res) =>{
    const IncID = req.params.id
    // console.log(IncID)
    const sql = "UPDATE increment SET status = ? WHERE IID = ? "
    const status = "HODRecommended"

    connection.query(sql, [status, IncID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Serverss"})
        }
        else{
            const getUser = "SELECT * FROM increment WHERE IID = ?"
            connection.query(getUser, [IncID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    if(result.length == 0){
                        return true
                    }
                    const myEmail = result[0].email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Increment Request',
                        text: 'The Increment Request Has been Recommended by Head of the Department', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });

                }
            })
        }
    })
})

// HodRejectInc

app.post('/HodRejectInc/:id', (req, res) => {
    const IncID = req.params.id

    const sql = "UPDATE increment SET status = ? WHERE IID = ? "
    const status = "HODReject"

    connection.query(sql, [status, IncID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            if(result.length == 0){
                return true
            }
            const getUser = "SELECT * FROM increment WHERE IID = ?"
            connection.query(getUser, [IncID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const myEmail = result[0].email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Increment Request',
                        text: 'The Increment Request Has been Reject by Head of the Department', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });

                }
            })
        }
    })
})


// IncAppData

app.get('/IncAppData', (req, res) => {
    const sql = "SELECT * FROM increment"

    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error in Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// IncApprve
app.post('/IncApprve/:id', (req, res) => {
    const IncID = req.params.id

    const sql = "UPDATE increment SET status = ? WHERE IID = ? "
    const status = "Approve"

    connection.query(sql, [status, IncID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            if(result.length == 0){
                return true
            }
            const getUser = "SELECT * FROM increment WHERE IID = ?"
            connection.query(getUser, [IncID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const myEmail = result[0].email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Increment Request',
                        text: 'The Increment Request Has been Approved', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });

                }
            })
        }
    })
})

// IncReject
app.post('/IncReject/:id', (req, res) => {
    const IncID = req.params.id

    const sql = "UPDATE increment SET status = ? WHERE IID = ? "
    const status = "Reject"

    connection.query(sql, [status, IncID], (err, result) => {
        if(err){
            return res.json({Error: "Error on Server"})
        }
        else{
            if(result.length == 0){
                return true
            }
            const getUser = "SELECT * FROM increment WHERE IID = ?"
            connection.query(getUser, [IncID], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server"})
                }
                else{
                    const myEmail = result[0].email

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: myEmail,
                        subject: 'Notification: The Increment Request',
                        text: 'The Increment Request Has been Rejected', 
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({Status: "Success"})
                        }
                    });

                }
            })
        }
    })
})

// ------------------------------ Increamet End -------------------------------

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
