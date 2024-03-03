const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8081

//make connection between dbsever and node app



//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));