const Router = require('express')
const router = new Router()

const plane = require("./planeRoutes")
const flight = require("./flightRoutes")
const passenger = require("./passengerRoutes")
const ticket = require("./ticketRoutes")
const crew = require("./crewRoutes")
const point = require("./pointRoutes")
const crew_flight = require("./crew_flightRoutes")

router.use('/planes',plane)
router.use('/flight',flight)
router.use('/passenger',passenger)
router.use('/ticket',ticket)
router.use('/crew',crew)
router.use('/point',point)
router.use('/crew_flight',crew_flight)

module.exports = router
