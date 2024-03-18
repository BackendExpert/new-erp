# SuperAdmin Route

- UnAccessUsers.jsx

- - this is the route for view all Unauthorized users in system
- - After the Superadmin reactivate their account not appear in Unauthorized users table 

- - function

- - - the function of this is when any user try to access authorized route while they are Unauthorized the system autometicly suspend their account 

- - - when suspend the account the users table in data base there is a column named is_active it value will be 0

- - - and also user added to the Unauthorized table in database

<hr>

- When superadmin reactivate the accout the data in Unauthorized table in data base will be deleted 
- and also the column named is_active in users table in databes, the value change to the 1