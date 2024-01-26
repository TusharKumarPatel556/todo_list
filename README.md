-The Application contains a client folder and a server folder.
   (-------------------------------DATABSE CONFIGURATIONS------------------------------------)
Step-1 ( INSTALLING DATABASE CONFIGURATION)---------------------
       - Install  PostgreSQL in to the system .
       - Setup the Environment variable path.
       - Open Command Prompt and run  command  "psql -U postgres"  . Here postgres is the super admin name give your super admin name if already installed.
       - Then it will ask for password Give the Password that you entered while installing postgres.

Step-2 (CREATING DATABASE AND TABLE)-----------------
-All these commands are available inside folder modelin queries.sql file. path to the folder  todo_list-->server-->model-->queries.sql
         - Run Command "CREATE DATABASE todolist;". To create the Database.
         - Run command "\c todolist;"  Enter in to the database .
         -Then create User table using Below mentioned query
                  CREATE TABLE users (
                      user_id SERIAL PRIMARY KEY,
                      name VARCHAR(500),
                      email VARCHAR(500),
                      mobile VARCHAR(500),
                      password VARCHAR(500),
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );
         -After creating user table  create tasks table using below mentioned query
                  CREATE TABLE tasks (
                      task_id SERIAL PRIMARY KEY,
                      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                      title VARCHAR(200),
                      description VARCHAR(500),
                      status BOOLEAN,
                      created_at TIMESTAMP,
                      updated_at TIMESTAMP
                  );
         
Step-3 (CONNECTING NODEJS  TO POSTGRESSQL DATABASE)-----------------
               -Goto  folder  "model" in server and Open "dbcon.js" file .You will be able to see the code mentioned below.
                      const Pool = require("pg").Pool;
                           const pool = new Pool({
                            user: "postgres",
                            password: "Tushar@123",
                            host: "localhost",
                            port: "5432",
                            database: "todolist",
                          }); 
                          module.exports = pool;
                -In this Code Change The "user" to YOUR "super admin"  User name that you have given while installing postgresql.
                   And "password" YOUR password that you have given while installing postgres.
                   And  YOUR Port number In which Your Postgres Server Is running.

   (-------------------------------SERVER SITE CONFIGURATIONS------------------------------------)

   Step-1 (INSTALLING ALL THE DEPENDENCIES-------------------)
            -Move Into the server folder in TERMINAL and Run The bellow Command.
                     > npm i 
                       and hit Enter 
              -Then Run  ">npm run dev " command to start the server.
             -If ".env" file is absent in server folder then create a .env file add add the below code
                       PORT=5000
                       JWT_SECRET="Merge-Alpha6578"
              -and then  restart the server.


   (-------------------------------CLIENT SITE CONFIGURATIONS------------------------------------)

   Step-1 (INSTALLING ALL THE DEPENDENCIES-------------------)
            -Move Into the  folder  "client" then enter in to folder "taskmanager"   in TERMINAL and Run The bellow Command.
                     > npm i 
                       and hit Enter 
              -Then Run  ">npm run dev " command to start the server.
             -If ".env" file is absent in client folder then create a .env file add add the below code
                     VITE_REACT_APP_BASE_URL= http://localhost:5000
              -and then  restart the server.
              

   (-------------------------------ADDITIONAL FEATURES I WOULD LIKE TO ADD------------------------------------)
 - I wold like to add
 - filters  to select  task based on date, and pending or completed.
 - Sorting Options in alphabetical order .
 - A Search bar to Search for a perticular task using title.


                      
            


     -




       
