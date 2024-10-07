const Router = require("express")
const router = new Router()

const point = require("../queries/point")

router.post("/add",point)
router.patch("/edit/id",point)
router.patch("/edit/body",point)
router.get("/due_id",point)
router.get("/due_body",point)
router.get("/all",point)