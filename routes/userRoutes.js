const Router = require("express")
const router = new Router()

const user = require("../queries/user")

const token = require("../security/checkToken")
const token_role = require("../security/checkToken&Role")

router.post('/reg',user.registration)
router.post('/login',user.login)

router.get('/get_due_id/:id',user.get_due_id)
router.get('/get_due_login/:login',user.get_due_login)
router.get('/get_due_passport/:passport',user.get_due_passport)
router.get('/get_all',user.get_all)

router.patch('/edit_due_id/:id',token,user.edit_due_id)
router.patch('/change_passwd/:login',token,user.change_passwd)
router.delete('/delete_due_id/:id',token_role("admin","manager"),user.delete_due_id)

module.exports = router