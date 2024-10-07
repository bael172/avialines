const Router = require("express")
const router = new Router()

const plane = require("../queries/plane")

router.post("/add",plane)
router.patch("/edit/due_id",plane)
router.patch("/edit/due_body",plane)
router.get("/due_id",plane)
router.get("/due_body",plane)
router.get("/all",plane)

module.exports = router