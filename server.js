const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db')
//how to use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const passport = require('./auth');




app.use(passport.initialize());
const localAuthMiddleWare = passport.authenticate('local',{session:false});






//logRequest middleware  perfect example of how to use middleware
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);


//home page
app.get('/',(req,res)=>{
  res.send("Home Page");
})




//import roters
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')
//routes
app.use('/person',localAuthMiddleWare,personRoutes);
app.use('/menuItems',menuItemRoutes);




//how to make serve listen at specific port
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("server is running on port no:",PORT);
});
  






















  // app.use((req, res, next) => {
  //   // Allow requests from any origin
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   // Allow the methods that will be used in the frontend
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //   // Allow the headers that will be used in the frontend
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   // Allow credentials to be sent
  //   res.setHeader('Access-Control-Allow-Credentials', true);
  
  //   // If it's an OPTIONS request, send back a 200 response
  //   if (req.method === 'OPTIONS') {
  //     return res.sendStatus(200);
  //   }
  
  //   // Move to the next middleware
  //   next();
  // });