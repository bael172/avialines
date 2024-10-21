const {Sequelize , DataTypes, Model} = require('sequelize')
const sequelize = require('./db_connect')

const Passenger = sequelize.define('passenger',
{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    passport:{type:DataTypes.STRING, allowNull:false, unique:true},
    surname:{type:DataTypes.STRING, allowNull:false},
    name:{type:DataTypes.STRING, allowNull:false},
    lastname:{type:DataTypes.STRING},
    birthday:{type:DataTypes.STRING,},
    country_origin:{type:DataTypes.STRING, allowNull:false},
    citizen_of:{type:DataTypes.STRING, allowNull:false}
})

const Ticket = sequelize.define('ticket',
{
    id_ticket:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    flight_number:{type:DataTypes.STRING, allowNull:false, references:{
        model:'flights',
        key:'flight_number'
    }},
    id_passenger:{type:DataTypes.INTEGER, allowNull:false, references:{
        model:'passengers',
        key:'id'
    }},
    seat:{type:DataTypes.STRING},
    luggage_places:{type:DataTypes.INTEGER},
    luggage_weight_kg:{type:DataTypes.INTEGER},
    ticket_cost:{type:DataTypes.INTEGER,allowNull:false}
})

const Crew = sequelize.define('crew',
{
    employee_id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    passport:{type:DataTypes.STRING, allowNull:false, unique:true},
    surname:{type:DataTypes.STRING, allowNull:false},
    name:{type:DataTypes.STRING, allowNull:false},
    lastname:{type:DataTypes.STRING},
    position:{type:DataTypes.STRING},
    birthday:{type:DataTypes.STRING},
    status:{type:DataTypes.STRING}
})

const Point = sequelize.define('point',
{
    point_id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true},
    country:{type:DataTypes.STRING},
    airport:{type:DataTypes.STRING},
}
)

const Flight = sequelize.define('flight',
{
    flight_number:{type:DataTypes.STRING, primaryKey:true},
    id_plane:{type:DataTypes.INTEGER, references:{
        model:'planes',
        key:'id'
    }},
    ticket_reg_time:{type:DataTypes.TIME},

    boarding_start:{type:DataTypes.TIME},
    boarding_end:{type:DataTypes.TIME},

    departure_point_id:{type:DataTypes.INTEGER, allowNull:false, references:{
        model:'points',
        key:'point_id'
    }},
    departure_date:{type:DataTypes.DATE},
    departure_time:{type:DataTypes.TIME},

    flight_duartion:{type:DataTypes.STRING},

    destination_point_id:{type:DataTypes.INTEGER, allowNull:false, references:{
        model:'points',
        key:'point_id'
    }},
    arrival_date:{type:DataTypes.DATE},
    arrival_time:{type:DataTypes.TIME},
    
    reserved_seats_quantity:{type:DataTypes.INTEGER,allowNull:false},
    status:{type:DataTypes.STRING}
})

const Crew_Flight = sequelize.define('crew_flight',
{
    flight_number:{type:DataTypes.STRING, primaryKey:true, references:{
        model:'flights',
        key:'flight_number'
    }},
    employee_id:{type:DataTypes.INTEGER, primaryKey:true, references:{
        model:'crews',
        key:'employee_id'
    }}
})

const Plane = sequelize.define('plane',
{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    type:{type:DataTypes.STRING, allowNull:false},
    name:{type:DataTypes.STRING, allowNull:false, unique:true}, 
    seats_number:{type:DataTypes.INTEGER,allowNull:false},
    classes:{type:DataTypes.STRING,defaultValue:"econom"},
    airline:{type:DataTypes.STRING},
    toilets_number:{type:DataTypes.INTEGER,allowNull:false},
    entries_number:{type:DataTypes.INTEGER,allowNull:false},
    laggage_capacity:{type:DataTypes.INTEGER,allowNull:false},
    fueltank_capacity:{type:DataTypes.INTEGER,allowNull:false},
    current_fuel_level:{type:DataTypes.INTEGER},
    status:{type:DataTypes.STRING}
})

const User = sequelize.define('user',
{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login:{type:DataTypes.STRING, allowNull:false, unique:true},
    surname:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    lastname:{type:DataTypes.STRING},
    passport:{type:DataTypes.STRING, allowNull:false},
    role:{type:DataTypes.STRING, defaultValue:"worker"},
    position:{type:DataTypes.STRING},
    birthday:{type:DataTypes.DATE},
    passwd:{type:DataTypes.STRING, allowNull:false},
})

Passenger.hasMany(Ticket, {foreignKey:'id_passenger'})
//Flight.belongsToMany(Crew,{through:'Crew_Flight'})
//Crew.belongsToMany(Flight,{through:'Crew_Flight'})
Flight.hasMany(Ticket, {foreignKey:'flight_number'})
Plane.hasMany(Flight,{foreignKey:'id_plane'})
Point.hasMany(Flight,{foreignKey:['departure_point_id','destination_point_id']})


module.exports = {
    Passenger, Ticket, Crew, Point, Flight, Crew_Flight, Plane, User
}