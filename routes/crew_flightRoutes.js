const Router = require("express")
const router = new Router()

const crew_flight = require("../queries/crew_flight")

router.post("/add",crew_flight)

router.patch("/edit/due_query",crew_flight)

router.get("/get/due_query",crew_flight) //req.query ?flight_number=214145 & employee_id=35252
router.get("/all",crew_flight)

router.delete("/delete/due_query")

module.exports = router