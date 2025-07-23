const express = require('express')
const { getAdminById } = require('../controllers/adminController')

const router = express.Router()

router.get('/:id', getAdminById)

module.exports = router