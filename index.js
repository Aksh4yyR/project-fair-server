//steps to define express server

//loads .env file contents into process.env file
require('dotenv').config()

const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./database/dbConnection')
//express application

const pfServer=express()        //just call the variable for  express app

pfServer.use(cors())            //cors will enable in pfserver

pfServer.use(express.json())      //json parser in server app for parsing json data from client request

pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))
//now create a port  for my server app

const PORT=3000 || process.env.PORT  //run in 3000 port or any available port at the time of deploying

//run the server
pfServer.listen(PORT,()=>console.log(`server is running on port ${PORT} and waiting for client request`))  //

pfServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:red">pfServer started at port and waiting for client request!</h1>')
})