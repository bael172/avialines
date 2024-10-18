const ApiError = require("../apiError")
const {Crew} = require("../db/tables")

class Crew_Person{
    async add(req,res,next){
        const {employee_id,passport,surname,name,lastname,position,birthday,status} = req.body
        const findPerson = await Crew.findOne({where:{passport}})
        if(findPerson==null) { 
            const created_person = await Crew.create({employee_id,passport,surname,name,lastname,position,birthday,status})
            res.json(created_person)
        }
        else next(ApiError.badRequest("Член экипажа с таким номером паспорта уже существует"))
    }
    async edit_due_id(req,res,next){
        //const {employee_id,passport,surname,name,lastname,position,birthday,status} = req.body
        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        const entries = Object.entries(req.body)
        const toUpdate = {}
        for(let iter in entries){
            if(entries[iter][1]) toUpdate[`${entries[iter][0]}`]=`${entries[iter][1]}`
        }
        const toUpdateEntries = Object.entries(toUpdate)
        console.log(toUpdateEntries)
        console.log(JSON.stringify(toUpdate))
        await Crew.update(toUpdate,{where:{employee_id:req.params.id}})
        const upd_person = await Crew.findByPk(req.params.id)
        res.json(upd_person)
    }
    async get_due_id(req,res,next){
        const person = await Crew.findByPk(req.params.id)
        if(!person) next(ApiError.internal(`Пользователя с id=${req.params.id} нет`))
        res.json(person)
    }
    async get_due_passport(req,res,next){
        const person = await Crew.findOne({where:{passport:req.params.passport}})
        if(!person) next(ApiError.internal(`Пользователя с номером паспорта=${req.params.passport} нет`))
        res.json(person)
    }
    async get_all(req,res,next){
        const all = await Crew.findAll()
        res.json(all)
    }
    async destroy_due_id(req,res,next){
        const target = await Crew.findByPk(req.params.id)
        if(!target) next(ApiError.internal(`Пользователя с id=${req.params.id} нет`))
        else await target.destroy()
        .then((rowsDestroyed) => rowsDestroyed? res.send("Удалено") : res.send("Не удалено"))
    }

}
module.exports = new Crew_Person()