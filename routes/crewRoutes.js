const Router = require("express")
const router = new Router()

const crew = require("../queries/crew")
const token = require("../security/checkToken")
const token_role = require("../security/checkToken&Role")

router.post("/add",token_role("admin","manager"),crew.add)

router.patch("/edit/due_id/:id",token_role("admin","manager"),crew.edit_due_id)

router.get("/get/due_id/:id",crew.get_due_id) 
router.get("/get/due_passport/:passport",crew.get_due_passport)
router.get("/get_all",crew.get_all)

router.delete("/delete/due_id/:id",token_role("admin","manager"),crew.destroy_due_id)

module.exports = router