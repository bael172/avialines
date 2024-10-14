const Router = require("express")
const router = new Router()

const passenger = require("../queries/passenger")
const token = require("../security/checkTokenss")
const token_role = require("../security/checkToken&Role")

router.post("/add",token_role("admin","manager"),passenger)

router.patch("/edit/due_id/:id",token_role("admin","manager"),passenger)
router.patch("/edit/due_passport/:passport",token_role("admin","manager"),passenger)

router.get("/get/due_id/:id",token_role("admin","manager"),passenger)
router.get("/get/due_body",token_role("admin","manager"),passenger)
router.get("/getAll",token_role("admin","manager"),passenger)

router.delete("/delete_due_id/:id",passenger)

module.exports = router