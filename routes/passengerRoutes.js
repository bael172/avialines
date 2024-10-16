const Router = require("express")
const router = new Router()

const passenger = require("../queries/passenger")
const token = require("../security/checkToken")
const token_role = require("../security/checkToken&Role")

router.post("/add",token_role("admin","manager"),passenger.add)

router.patch("/edit/due_id/:id",token_role("admin","manager"),passenger.edit_id)
router.patch("/edit/due_passport/:passport",token_role("admin","manager"),passenger.edit_passport)

router.get("/get/due_id/:id",token_role("admin","manager"),passenger.get_due_id)
router.get("/get/due_body",token_role("admin","manager"),passenger.get_due_body)
router.get("/getAll",token_role("admin","manager"),passenger.get_all)

router.delete("/delete_due_id/:id",passenger.delete_due_id)

module.exports = router