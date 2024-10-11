const {Passenger} = require("../db/tables.js")
const sequelize = require("sequelize")
const {Op} = require("sequelize")

class Passenger{
    async add(req,res,next){
        if((req.body).entries.length==0) res.status(401).send("Добавьте свойства в запрос")
        const {id, passport, surname, name, lastname, birthday, country_origin, citizen_of} = req.body
        let string_required_keys = "id passport surname name lastname birthday country_origin citizen_of"
        let array_required_keys = string_required_keys.split(" ")
        for(i=0;i<array_required_keys.length;i++){
            if(Object.keys(req.body).every(key => key.includes(array_required_keys[i])))
                await Passenger.create({id,passport,surname,name,lastname,birthday,country_origin,citizen_of
            })
            else res.status(401).json({message:"Вы не правильно написали название атрибутов"})
        }
    }
}

