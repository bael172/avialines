const Router = require("express")
const router = new Router()

const flight = require("../queries/flight")

router.post("/add",flight)
router.patch("/edit/id",flight)
router.patch("/edit/body",flight)
router.get("/due_id",flight)
router.get("/due_body",flight)
router.get("/all",flight)