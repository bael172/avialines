const {Plane} = require("../db/tables")
const {Op} = require("sequelize")
const ApiError = require("../apiError")

class Jet{
    async add(req,res,next){
        const {type,name,seats_number,classes,airline,toilets_number,entries_number,
            laggage_capacity,fueltank_capacity,current_fuel_level,status} = req.body
        if(!(type && name && seats_number && toilets_number && entries_number && laggage_capacity && fueltank_capacity)){
            res.status(401).json({message:"Заполните обязательные поля"})
        }
        const again = await Plane.findOne({where:{name}})
        if(again) res.status(401).json({message:"Самолёт с таким именем уже существует"})
        try{
            await Plane.create({type,name,seats_number,classes,airline,toilets_number,entries_number,
                laggage_capacity,fueltank_capacity,current_fuel_level,status})
                .then((response)=>res.json(response))
        }
        catch(e){
            next(ApiError.internal(e))
        }
    }
    async edit_due_id(req,res,next){
        const {type,name,seats_number,classes,airline,toilets_number,entries_number,
            laggage_capacity,fueltank_capacity,current_fuel_level,status} = req.body
        const found = await Plane.findByPk(req.params.id)
        if(found){
            await Plane.update({type,name,seats_number,classes,airline,toilets_number,entries_number,
                laggage_capacity,fueltank_capacity,current_fuel_level,status},
            {where:{id:req.params.id}})
            await Plane.findByPk(req.params.id).then(response => res.json(response))
        }
        else res.status(401).json({message:`Самолёт с id=${req.params.id} не найден`})
    }
    async edit_due_name(req,res,next){
        const {type,name,seats_number,classes,airline,toilets_number,entries_number,
            laggage_capacity,fueltank_capacity,current_fuel_level,status} = req.body
        const found = await Plane.findOne(req.params.name)
        if(found){
            await Plane.update({type,name,seats_number,classes,airline,toilets_number,entries_number,
                laggage_capacity,fueltank_capacity,current_fuel_level,status},
            {where:{id:req.params.name}})
            await Plane.findOne(req.params.name).then(response => res.json(response))
        }
        else res.status(401).json({message:`Самолёт с id=${req.params.id} не найден`})
    }
    async get_due_id(req,res,next){
        await Plane.findByPk(req.params.id)
        .then((zapis) (zapis)? res.json(zapis) : res.status(401).json({message:`Самолёт id=${req.params.id} не найден`}))
    }
    async get_due_name(req,res,next){
        await Plane.findOne({where:{name:req.params.name}})
        .then((zapis) ? res.json(zapis) : res.status(401).json({message:`Самолёт с id=${req.params.name} не найден`}))
    }
    async get_due_airline(req,res,next){
        await Plane.findAll({where:{airline:req.params.airline}})
        .then(response => res.json(response))
    }
    async get_due_classes(req,res,next){
        const classes = req.params.classes.split(",")
        await Plane.findAll({where:{[Op.in]:[classes]}})
        .then(response => res.json(response))
    }
    async get_due_status(req,res,next){
        await Plane.findAll({where:{status:req.params.status}})
        .then(response => res.json(response))
    }
    async get_all(req,res,next){
        await Plane.findAll().then(response=>res.json(response))
    }
    async delete_due_id(req,res,next){
        const found = await Plane.findByPk(req.params.id)
        if(found) await found.destroy().then((rowsDestroyed) => (rowsDestroyed>=0)? res.send("Удалено") : res.send("Не удалено"))
        else res.status(401).json({message:`Самолёт с id = ${req.params.id} не найден`})
    }
    
}
module.exports = new Jet()