const express = require('express')
const router = express.Router()
const {shorten,redirect} = require('../controllers/urlController')

router.post('/url/shorten',shorten)
router.post('/url/redirect/:alias',redirect)

module.exports = router