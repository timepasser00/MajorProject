const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = 3001
// app.use((req,res,next) =>{
//     next();
// })

app.use('/',homeRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})