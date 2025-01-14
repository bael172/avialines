const {Plane} = require("../db/tables")
const {Op} = require("sequelize")
const ApiError = require("../apiError")
class Plane{
    async add(req,res,next){
        const {serial,id,type,name,seats_number,classes,airline,
            crew_member_number, luggage_capacity,
            fueltank_capacity, current_fuel_level, status
        } = req.body
        const id_exist = await Plane.findOne({where:{id}})
        const serial_exist = await Plane.findOne({where:{serial}})
        if(id_exist || serial_exist){res.status(600).send("Самолёт с таким id существует")}
        try{
            const plane = await Plane.create({
                serial, id, type, name, seats_number, classes, airline, crew_member_number,
                luggage_capacity, fueltank_capacity, current_fuel_level, status
            })
            res.json(plane)
        }
        catch(error){
            res.next(ApiError.internal(error))
        }
    } 
    async update_due_id(req,res,next){
        const {serial, type, name, seats_number, classes, airline,
            crew_member_number, luggage_capacity, fueltank_capacity,
            current_fuel_level, status
        } = req.body
        const due_id = await Plane.findOne({where:{id:req.params.id}})
        if(!due_id) res.send("Самолёт с id=",req.params.id," не найден")
        await due_id.update({type,name,seats_number,classes,airline,
           crew_member_number, luggage_capacity, fueltank_capacity,
           current_fuel_level, status
        })
        const result = await Plane.findOne({where:req.params.id})
        res.json(result)
    }
    async update_due_serial(req,res,next){
        const {id, type, name, seats_number, classes, airline,
            crew_member_number, luggage_capacity, fueltank_capacity,
            current_fuel_level, status
        } = req.body
        const due_serial = await Plane.findOne({where:{serial:req.params.serial}})
        if(!due_serial) res.send("Самолёт с серийником=",req.params.serial," не найден")
        await due_serial.update({type,name,seats_number,classes,airline,
           crew_member_number, luggage_capacity, fueltank_capacity,
           current_fuel_level, status
        })
        const result = await Plane.findOne({where:req.params.serial})
        res.json(result)
    }
    async get_due_id(req,res,next){
        const result = await Plane.findOne({where:{id:req.params.id}})
        if(!result) res.send("Самолёт с id=",req.params.id," не найден")
        res.json(result)
    }
    async get_due_serial(req,res,next){
        const result = await Plane.findOne({where:{serial:req.params.serial}})
        if(!result) res.send("Самолёт с serial=",req.params.serial," не найден")
        res.json(result)
    }
    async get_due_name(req,res,next){
        const result = await Plane.findOne({where:{name:req.params.name}})
        if(!result) res.send("Самолёт с name=",req.params.name," не найден")
        res.json(result)
    }
    async get_due_query_AND(req,res,next){
        const result = await Plane.findAll({where:{[Op.and]:[{type:req.query.type},{airline:req.query.airline}]}})
        if(!result) res.status(600).send("Ничего не найдено")
        res.json(result)
    }
    async get_due_query_OR(req,res,next){
        const result = await Plane.findAll({where:{[Op.or]:[{type:req.query.type},{airline:req.query.airline}]}})
        if(!result) res.status(600).send("Ничего не найдено")
            res.json(result)
    }
    async delete_due_id(req,res,next){
        try{
            const deletedCount = await Plane.destroy({
                where:{id:req.params.id}
            })
            if(deletedCount == 1) res.send("Самолёт успешно удалён")
            else res.send("Самолёт с id=",req.params.id," не найден")
        }
        catch(error){
            res.next(ApiError.internal(error))
        }
    }
}
module.exports = new Plane()