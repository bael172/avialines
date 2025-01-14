const Router = require("express")
const router = new Router()

const plane = require("../queries/plane")

router.post("/add",plane)

router.patch("/update_due_id/:id",plane)
router.patch("/update_due_serial/:name",plane)

router.get("/get_due_id/:id",plane)
router.get("/get_due_serial/:serial",plane)
router.get("/get_due_name/:name",plane)
router.get("/get_due_query_AND",plane)
router.get("/get_due_query_OR",plane)

router.delete("/delete/due_id/:id")

module.exports = router