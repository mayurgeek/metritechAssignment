const express = require('express');
const app = express();
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const port = 5000;
const connectToDB = require('./db_conect');

// const cors = require('cors');
// app.use(cors());



// const swaggerOptions = {
//   swaggerDefinition:{
//     info:{
//       title:"xyz",
//       description:"zxc",
//       server:["http://localhost:5000"],
//     }
//   },
//   apis:["index.js"]
//   //apis:["route_auththentication"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectToDB();

 app.use(express.json())

// Routes
app.use('/api/auth', require('./routing/route_auththentication'))
app.use('/api/Book', require('./routing/route_book'))


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})