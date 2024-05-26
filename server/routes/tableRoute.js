const express = require('express')
const router = express.Router()

const {getAllTable,addNewtable,updateTable,deleteTable} = require('../controllers/tableController')

router.route('/tabledatas').get(getAllTable)
router.route('/newtabledata').post(addNewtable)
router.route('/updatetable/:id').put(updateTable)
router.route('/deletetable/:id').delete(deleteTable)

module.exports = router; 