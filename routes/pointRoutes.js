const Router = require("express")
const router = new Router()

const point = require("../queries/point")

router.post("/add",point)
router.patch("/edit/id",point)
router.patch("/edit/body",point)

router.get("get/due_id/:id",point)
router.get("get/due_body",point)
router.get("/getAll",point)

router.delete("/delete/due_id/:id",point)

module.exports = router