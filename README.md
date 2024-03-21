# ERP

## Access Control of the Project

### to prevent unauthorized access

- first check login user role 
- then the 
    `
        if(RoleUser === "SuperAdmin"){
    `
- and if RoleUser not equal to SuperAdmin rederect to login page

- in this project the unauthorized access prevent using

- - client/src/components/UnauthorizedAccess.jsx

- and all routes are protected by using

- - client/src/components/PrivateRoute.jsx

if any user try to access routes that user cannot access, the user will be suspended

exmaple:

if user type user try to access SuperAdmin  dashboard the user's account will autometicaly suspended by the system


## Screen Shorts

### SuperAdmin Dashboard

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/1SuperAdminDash.PNG">

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/2%20SuperAdminDash1.PNG">

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/3%20SuperAdminDashDown.PNG">