const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const homeRouter = require('./routes/home');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = 3001

app.use('/home',homeRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})