const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const homeRouter = require('./routes/home');
const patientRouter=require('./routes/patients');
const mongoose = require('mongoose');
const hospitalRouter=require('./routes/hospital'); 
const adminRouter=require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = 3001

app.use('/home',homeRouter)
app.use('/patient',patientRouter)
app.use('/hospital',hospitalRouter)
app.use('/admin',adminRouter)

mongoose.connect('mongodb://localhost:27017/major-project', { useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(4000, () => {
      console.log('listening for requests on port')
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})