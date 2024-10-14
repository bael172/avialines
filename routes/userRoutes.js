const Router = require("express")
const router = new Router()

const user = require("../queries/user")

router.get('/get_due_id/:id',user)
router.get('/get_due_passport/:passport',user)
router.get('/getAll',user)

router.post('/add',user)
router.patch('/edit_due_id/:id',user)
router.delete('/delete_due_id/:id',user)