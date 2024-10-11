const Router = require("express")
const router = new Router()

const ticket = require("../queries/ticket")

router.post("/add",ticket)

router.patch("/edit/id",ticket)
router.patch("/edit/body",ticket)

router.get("/get/due_id",ticket)
router.get("/get/due_body",ticket)
router.get("/getAll",ticket)

router.delete("/delete/due_id",ticket)

module.exports = router