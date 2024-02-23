const express = require('express')
const router = express.Router()
const {getAllUsers,registerUser,getUserById,loginUsers} = require('../controllers/userController')


router.get('/user/getAllUsers',getAllUsers)
router.get('/user/getUserById/:id',getUserById)
router.post('/user/register',registerUser)
router.post('/user/login',loginUsers)

module.exports = router