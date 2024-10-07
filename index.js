const express = require("express")
const cors = require("cors")
require('dotenv').config({path:'./db/.env'})

const sequelize = require('./db/db_connect')
const tables = require('./db/tables')
const router = require('./routes/index')

const PORT=process.env.PORT || 5000

const app=express()
app.use(cors())
app.use(express.json())

app.use('/queries',router)

app.get('/msg',(req,res) => { 
    res.status(200).json({message:"Working"})
})
    const start = async()=> {
        try{
            await sequelize.authenticate()
            await sequelize.sync()
            console.log('Connection to the DB has been established successfully');
            app.listen(PORT,() => console.log(`Server start on ${PORT}`))
        }
        catch (error) {
            console.error('Unable to connect to the database',error);
        }
    } 
    start()
