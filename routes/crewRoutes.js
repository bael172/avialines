const Router = require("express")
const router = new Router()

const crew = require("../queries/crew")

router.post("/add",crew)

router.patch("/edit/due_id/:id",crew)

router.get("/get/due_id/:id",crew) 
router.get("/get/due_body",crew)
router.get("/getAll",crew)

router.delete("/delete/due_id:id",crew)

module.exports = router