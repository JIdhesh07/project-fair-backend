//loads .env file content into process .env by default

require('dotenv').config()

//import express 
const express = require('express')

const cors=require('cors')

const db=require("./db/Connection")

const router = require('./Routes/router')

const appMiddleware = require("./Middlewares/appmiddleware")

//create a backend application using  the express

const pfServer=express()//create a express application

//use cors
pfServer.use(cors())
pfServer.use(express.json())// return middleware that only parse json
pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

//port create 
const PORT= 4000 || process.env.PORT

//server listening
pfServer.listen(PORT,()=>{

    console.log("listening on port" + PORT);
})

//localhost :400 -> pfsrever is started

pfServer.get('/',(req,res)=>{

    res.send(`<h1>project  fair server started</h1>`)
})