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

### UnAccess Users

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/3%20SuperAdminDashDown.PNG">

<hr>

### Librarian Dashbaord

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/4%20librarian.PNG">

<hr>

### view items

- this is same as all items in the system

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/5%20viewingitems%20same%20all%20items.PNG">

<hr>

### Adding items

- this is same as all items in the system

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/6%20addingItems%20same%20as%20all.PNG">

<hr>

### Updating items

- this is same as all items in the system

<img src="https://github.com/BackendExpert/new-erp/blob/master/screenShorts/7%20Updateitems%20same%20as%20all.PNG">

<hr>

### Following is the prevent unauthorized access to systems 

- When User login to the System,

- The User try to access routes, that the user doesn't have any access, the System autometicaly suspend that user

- As Example: 

- - if user type user try to access to the SuperAdmin Dashbaord the System autometicaly suspend that user's Account


<img src="hhttps://github.com/BackendExpert/new-erp/blob/master/screenShorts/8%20unaccess.PNG">
