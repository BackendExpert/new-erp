const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const path = require('path')

const resourceLimits = require('worker_threads');



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

        connection.query(
            'INSERT INTO users(username, email, role, password, create_at, update_at, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, email, role, hashPass, createTime, updateTime, is_active],
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

//unAccess
app.post('/UnAccess', (req, res) => {
    const userEmail = req.body.email;
    const userRole = req.body.role;
    // console.log("Email is :", userEmail);
    // console.log("Role is :", userRole);

    const updateUser = "UPDATE users SET is_active = ? WHERE email = ?";

    connection.query(updateUser, [userEmail], (err, result) => {
        
    })
    



})

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
   const checksql = "SELECT * FROM employee WHERE eid = ?";
   connection.query(checksql, req.body.eid, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Employee Already Exists...!"});
        }
        else{
            const hash = bcrypt.hash(req.body.password, 10);
            const sql = "INSERT INTO employee (eid, initial, surname, address, phone, email, password, salary, image, category, designation, nic, dob, emgcontact, type, civilstatus, gender, relig, create_at, update_at) VALUES (?)";
         //    const sql = "INSERT INTO employee VALUES (?)"
            const create_at = new Date();
            const update_at = new Date();
            
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
             create_at,
             update_at
            ]
         
            connection.query(sql, [values], (err, result) => {
                 if(err){
                     return res.json({Error: "ERROR in Data Processing"});
                 }
                 else{
                     return res.json({Status: "Success"})
                 }
             });
        }
   })


});

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
            const sql = "INSERT INTO vehicles(regno, model, brand, fueltype, myear, value, milage, create_at, update_at) VALUES (?)";
            const create_at = new Date();
            const update_at = new Date();
        
            const values = [
                req.body.regno,
                req.body.model,
                req.body.brand,
                req.body.fueltype,
                req.body.myear,
                req.body.value,
                req.body.milage,       
                create_at,
                update_at
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

    connection.query('UPDATE vehicles SET value = ?, milage=?, update_at =? WHERE VID = ?',
    [req.body.value, req.body.milage, update_at, id], (err, results) => {
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

    connection.query(checksql, [req.body.title], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Program is Already Exists at Given Project Name"});
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

    const checksql = "SELECT * FROM program WHERE title = ?";

    connection.query(checksql, [req.body.title], (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            return res.json({Error: "Program Cannot Update, Given Program Name is Already Exists"});
        }
        else{
            connection.query('UPDATE program SET title = ?, hod=?, scientis1=?, scientist2=?, update_at=? WHERE pid = ?',
            [ req.body.title, req.body.hod, req.body.scients1, req.body.scients2, update_at, programId], (err, results) => {
                if(err) 
                    console.log({Message: "Error inside Server"})
                else{
                    return res.json({Status:'Success'})
                }
            });
        }
    })
})

//count Program

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

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));