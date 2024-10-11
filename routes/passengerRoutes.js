const Router = require("express")
const router = new Router()

const passenger = require("../queries/passenger")

router.post("/add",passenger)

router.patch("/edit/due_id/:id",passenger)
router.patch("/edit/due_passport/:passport",passenger)

router.get("/get/due_id/:id",passenger)
router.get("/get/due_body",passenger)
router.get("/getAll",passenger)

router.delete("/delete_due_id/:id",passenger)

module.exports = router