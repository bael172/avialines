const Router = require("express")
const router = new Router()

const plane = require("../queries/plane")

router.post("/add",plane.add)

router.patch("/update_due_id/:id",plane.update_due_id)
router.patch("/update_due_serial/:name",plane.update_due_serial)

router.get("/get_due_id/:id",plane.get_due_id)
router.get("/get_due_serial/:serial",plane.get_due_serial)
router.get("/get_due_name/:name",plane.get_due_name)
router.get("/get_due_query_AND",plane.get_due_query_AND)
router.get("/get_due_query_OR",plane.get_due_query_OR)

router.delete("/delete/due_id/:id",plane.delete_due_id)

module.exports = router