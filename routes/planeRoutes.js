const Router = require("express")
const router = new Router()

const plane = require("../queries/plane")

router.post("/add",plane)

router.patch("/edit/due_id/:id",plane)
router.patch("/edit/due_name/:name",plane)

router.get("/get/due_id/:id",plane)
router.get("/get/due_body",plane)
router.get("/getAll",plane)

router.delete("/delete/due_id/:id")

module.exports = router