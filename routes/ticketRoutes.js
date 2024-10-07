const Router = require("express")
const router = new Router()

const ticket = require("../queries/ticket")

router.post("/add",ticket)
router.patch("/edit/id",ticket)
router.patch("/edit/body",ticket)
router.get("/due_id",ticket)
router.get("/due_body",ticket)
router.get("/all",ticket)

module.exports = router