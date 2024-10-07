const {Passenger} = require("../db/tables.js")
const sequelize = require("sequelize")
const {Op} = require("sequelize")

class Passenger{
    async add(req,res,next){
        if((req.body).entries.length==0) res.send("Добавьте свойства в запрос")
        
    }
}
