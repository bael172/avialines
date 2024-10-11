const Router = require("express")
const router = new Router()

const flight = require("../queries/flight")

router.post("/add",flight)

router.patch("/edit/due_flight_number/:flight_number",flight)
router.patch("/edit/due_name",flight)
router.patch("/edit/due_body",flight)

router.get("/get/due_flight_number/:flight_number",flight)
router.get("/get/due_name",flight)
router.get("/get/due_body",flight)
router.get("/getAll",flight)

router.delete("/delete/due_flight_number/:flight_number",flight)

module.exports = router