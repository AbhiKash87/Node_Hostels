const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')






//home page
app.get('/',(req,res)=>{
  res.send("Home Page");
})


//routes
app.use('/person',personRoutes);
app.use('/menuItems',menuItemRoutes);





app.listen(3000,()=>{
  console.log("server is running on port no: 3000");
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