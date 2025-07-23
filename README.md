# Task-Manager
Backend for task management using express js and mongodb.

#installation
1. clone the repo
git clone https://github.com/Meheret17/Task-Manager.git
2. install packages<br>
npm install express mongoose jsonwebtoken bcrypt cors dotenv
3. Run Application
npm start

#Features
-user signup and login
-JWT authentication
-password hashing with bcrypt
-task CRUD operation
-user retrival
-input validation and error handling

#Technologies
-Node.js
-Express.js: web framework
-MongoDB: noSQL database
-jsonwebtoken: JWT authentication

#API Endpoints
1. User Registration
   Method: POST
   http://localhost:3000/api/signup
2. User Login
   Method: POST
   http://localhost:3000/api/login
3. Retrive user profile
   Method: GET
   http://localhost:3000/api/profile
4. Create Task
   Method: POST
   http://localhost:3000/api/tasks
5. Retive Task
   Method: GET
   http://localhost:3000/api/tasks
6. Update Status
   Method: PATCH
   http://localhost:3000/api/tasks/:id
7. Delete Task
   Method: DELETE
   http://localhost:3000/api/tasks/:id


