const ApiError = require('../apiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../db/tables')
const {Op} = require("sequelize")

require("dotenv").config({path:"./db/.env"})

const generateJwt = (id,passport,login,surname,name) => {
    return jwt.sign(
        {id,passport,login,surname,name},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class Person{
    async registration(req, res, next){
        const {passport, surname, name, lastname, login, passwd, passwdAgain, position, birthday, role} = req.body
        if(!(passport || surname || name || lastname || login || passwd || passwdAgain || position || birthday || role)) {
            res.status(401).json({message:'Введите все поля'})
        }
        if(!passwdAgain){
            return next(ApiError.badRequest("Повторно введите ваш пароль"))
        }
        if(passwd!==passwdAgain){
            res.status(403).json({message:'Пароли не совпадают'})
        }
        const candidate = await User.findOne({
            where:{passport}
        })
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким номером паспортом уже существует'))
        }
        if(passwd == passwdAgain){
            const hashpasswd = await bcrypt.hash(passwd,5)
            const user = await User.create({
                passport, surname, name, lastname, login, passwd: hashpasswd, position, birthday, role })
            const token = generateJwt(user.id,user.passport,user.login,user.surname,user.name)
            return res.status(200).json({token})
        }
        else return next(ApiError.badRequest('Пароли не совпадают'))
    }

    async login(req,res,next){
        const {login, passwd} = req.body
        
        if(!(login || passwd)){
            res.status(401).json({message:'Введите логин и пароль'})
            return
            }
        if(!passwd){
            res.status(402).json({message:'Введите пароль'})
            return
        }
        const obj={email,phone} //объект для динамического условия из-за возможности не вводить почту или телефон
        let condition = []
        condition = Object.entries(obj).reduce((accum,[key,value])=>{ //запись в accum пар [key,value]
            if(value) { //запись значений не являющихся undefined или null
                accum[key]=value
                console.log(typeof(accum))
                console.log(key)
                console.log(accum[key])
                console.log(value)
            }
        },{}) //используем объект как первичное значение accum
        console.log(condition)

        const user = await User.findOne({
            where:{login}
        })
        if(!user){
            res.status(403).json({message:'Введен неверный логин или нет такого логина'})
            return
        }

        //Сравнение незашифрованного пароля passwd с зашифрованным user.passwd (passwd:hashpasswd)
        let comparePassword = bcrypt.compareSync(passwd, user.passwd)
        if(!comparePassword){ //если пароли не совпадают
            res.status(404).json({message:'Указан неверный пароль'})
            //return next(ApiError.internal("Указан неверный пароль"))
            return
        }
        
        const token = generateJwt(user.id,user.passport,user.login,user.surname,user.name)
        return res.status(200).json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.user.id_user,req.user.name, req.user.email, req.user.phone, req.user.role)
        if(token) res.status(200).json({message:"ALL RIGHT"})
    }

    async get_due_id(req,res,next){
        const person = await User.findOne({where:{id:req.params.id}})
        if(person) req.status(400).json({person})
        else res.status(401).json({message:`Пользователь с id = ${req.params.id} отсутствует`})
    }
    async get_due_login(req,res,next){
        const person = await User.findOne({where:{login:req.params.login}})
        if(person) req.status(400).json({person})
        else res.status(401).json({message:`Пользователь с логином ${req.params.login} отсутствует`})
    }
    async get_due_passport(req,res,next){
        const found = await User.findAll({where:{login:req.params.passport}})
        if(person) req.status(400).json({found})
        else res.status(401).json({message:`Пользователи с номер пасспорта = ${req.params.login} отсутствуют`})
    }
    async get_all(req,res,next){
        const all = await User.findAll()
        res.json(all)
    }
    async edit_due_id(req,res,next){
        let value = JSON.parse(req.body)
        try{
            await User.update({value},{where:{id:req.params.id}})
        }
        catch(e){
            req.next(ApiError.internal(e))
        }
    }
    async destroy_due_id(req,res,next){
        await User.destroy({where:{id:req.params.id}}).then(response => res.send(response))
    }
}

module.exports = new Person()