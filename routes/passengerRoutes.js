const Router = require("express")
const router = new Router()

const passenger = require("../queries/passenger")

router.post("/add",passenger)
router.patch("/edit/id",passenger)
router.patch("/edit/body",passenger)
router.get("/due_id",passenger)
router.get("/due_body",passenger)
router.get("/all",passenger)