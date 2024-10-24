const {Passenger} = require("../db/tables.js")
const sequelize = require("sequelize")
const {Op} = require("sequelize")

class Passajir{
    async add(req,res,next){
        /*
        if((req.body).entries.length==0) res.status(401).send("Добавьте свойства в запрос")
        const {id, passport : req_passport, surname, name, lastname, birthday, country_origin, citizen_of} = req.body
        let string_required_keys = "passport surname name lastname birthday country_origin citizen_of"
        let array_required_keys = string_required_keys.split(" ")
        let attributes_length = array_required_keys.length
        if(attributes_length < 8) res.status(401).json({message:"Не хватает аттрибутов"})
        for(i=0;i<array_required_keys.length;i++){
            //if(Object.keys(req.body).every(key => key.includes(array_required_keys[i]))) 
            if(Object.keys(req.body)[i] == array_required_keys[i]) //в этом случае в req.body аттрибуты пишутся в строгом порядке
                continue
            else res.status(401).json({message:"Вы не правильно написали название атрибутов"})
        }
        */
        const {passport, surname, name, lastname, birthday, country_origin, citizen_of} = req.body
        const amigo = await Passenger.findOne({where:{passport}})
        if(!amigo){
            await Passenger.create({passport,surname,name,lastname,birthday,country_origin,citizen_of}).then(response => res.json(response))
        }
        else res.status(401).json({message:"Пассажир с таким паспортом уже существует"})
    }
    async edit_due_id(req,res,next){
        const {id, passport, surname, name, lastname, birthday, country_origin, citizen_of} = req.body
        const person = await Passenger.findByPk(req.params.id).then(response => res.json(response))
        if(person){
            await Passenger.update({id, passport, surname, name, lastname, birthday, country_origin, citizen_of},{
                where:{id:req.params.id}})
            await Passenger.findByPk(req.params.id).then(response => res.json(response))
        }
        else res.status(401).json({message:`Пользователь с id = ${req.params.id} отсутствует`})
    }
    async edit_due_passport(req,res,next){
        const {id, passport, surname, name, lastname, birthday, country_origin, citizen_of} = req.body
        const person = await Passenger.findByPk(req.params.id).then(response => res.json(response))
        if(person){
            await Passenger.update({id, passport, surname, name, lastname, birthday, country_origin, citizen_of},{
                where:{id:req.params.id}})
            await Passenger.findByPk(req.params.passport).then(response => res.json(response))
        }
        else res.status(401).json({message:`Пользователь с passport = ${req.params.passport} отсутствует`})
    }
    async get_due_id(req,res,next){
        const passenger = await Passenger.findByPk(req.params.id)
        if(!passenger) res.status(401).json({message:`Пассажир с id = ${req.params.id} не найден`})
        else res.json(passenger)
    }
    async get_due_passport(req,res,next){
        const passenger = await Passenger.findOne({where:{passport:req.params.passport}})
        if(!passenger) res.status(401).json({message:`Пассажир с паспортом = ${req.params.passport} не найден`})
        else res.json(passenger)
    }
    async get_due_body(req,res,next){
        const condition = []
        const body = JSON.parse(req.body)
        for(let i=0; i<Object.keys(body); i++){
            if(Object.values(body)[i]!=null ) condition.push(Object.entries(body)[i])
        }
        const found = await Passenger.findOne({where:{[Op.and]:condition}})
        if(!found || found == null){
            res.status(401).json({message:"Пассажир не найден"})
        } 
        else res.json(found)
    }
    async get_all(req,res,next){
        const all = await Passenger.findAll()
        res.json(all)
    }
    async delete_due_id(req,res,next){
        const target = await Passenger.findByPk(req.params.id)
        if(!target) return res.status(400).json({message:`Записи с id = ${req.params.id} не обнаружено`})
        else await target.destroy()
        .then((rowsDestroyed)=>rowsDestroyed? res.send("Удалено") : res.send("Не удалено"))
        return 
    }
}
module.exports = new Passajir()

