const Router = require("express")
const router = new Router()

const plane = require("../queries/plane")
const token_role = require("../security/checkToken&Role")

router.post("/add",token_role("admin","manager"),plane.add)

router.patch("/edit/due_id/:id",token_role("admin","manager"),plane.edit_due_id)
router.patch("/edit/due_name/:name",token_role("admin","manager"),plane.edit_due_name)

router.get("/get/due_id/:id",plane.get_due_id)
router.get("/get/due_name/:name",plane.get_due_name)

router.get("/get/due_airline/:airline",plane.get_due_airline)
router.get("/get/due_classes/:classes",plane.get_due_classes) 
router.get("/getAll",plane.get_all)

router.delete("/delete/due_id/:id",token_role("admin","manager"),plane.delete_due_id)

module.exports = router