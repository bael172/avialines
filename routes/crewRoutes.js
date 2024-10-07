const Router = require("express")
const router = new Router()

const crew = require("../queries/crew")

router.post("/add",crew)
router.patch("/edit/id",crew)
router.patch("/edit/body",crew)
router.get("/due_id",crew)
router.get("/due_body",crew)
router.get("/all",crew)

module.exports = router