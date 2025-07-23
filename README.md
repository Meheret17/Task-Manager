# Task-Manager
Backend for task management using express js and mongodb.

#installation
1. clone the repo
git clone https://github.com/Meheret17/Task-Manager.git
2. install packages<br>
npm install express mongoose jsonwebtoken bcrypt cors dotenv
3. Run Application<br>
npm start

#Features<br>
-user signup and login<br>
-JWT authentication<br>
-password hashing with bcrypt<br>
-task CRUD operation<br>
-user retrival<br>
-input validation and error handling<br>

#Technologies<br>
-Node.js<br>
-Express.js: web framework<br>
-MongoDB: noSQL database<br>
-jsonwebtoken: JWT authentication<br>

#API Endpoints<br>
1. User Registration<br>
   Method: POST<br>
   http://localhost:3000/api/signup<br>
2. User Login<br>
   Method: POST<br>
   http://localhost:3000/api/login<br>
3. Retrive user profile<br>
   Method: GET<br>
   http://localhost:3000/api/profile<br>
4. Create Task<br>
   Method: POST<br>
   http://localhost:3000/api/tasks<br>
5. Retive Task<br>
   Method: GET<br>
   http://localhost:3000/api/tasks<br>
6. Update Status<br>
   Method: PATCH<br>
   http://localhost:3000/api/tasks/:id<br>
7. Delete Task
   Method: DELETE
   http://localhost:3000/api/tasks/:id


