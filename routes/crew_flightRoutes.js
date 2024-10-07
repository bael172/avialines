const Router = require("express")
const router = new Router()

const crew_flight = require("../queries/crew_flight")

router.post("/add",crew_flight)
router.patch("/edit/id",crew_flight)
router.patch("/edit/body",crew_flight)
router.get("/due_id",crew_flight)
router.get("/due_body",crew_flight)
router.get("/all",crew_flight)