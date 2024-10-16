const Router = require("express")
const router = new Router()

const user = require("../queries/user")

router.post('/reg',user.registration)
router.post('/login',user.login)

router.get('/get_due_id/:id',user.get_due_id)
router.get('/get_due_login/:login',user.get_due_login)
router.get('/getAll',user.get_all)

router.patch('/edit_due_id/:id',user.edit_due_id)
router.delete('/delete_due_id/:id',user.destroy_due_id)

module.exports = router