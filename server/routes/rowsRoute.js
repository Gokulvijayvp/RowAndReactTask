const express = require('express')
const router = express.Router()

const {getAllRows,addNewRow,updateRow,deleteRow} = require('../controllers/rowsController')

router.route('/rows').get(getAllRows)
router.route('/newrows').post(addNewRow)
router.route('/updaterow/:id').put(updateRow)
router.route('/deleterow/:id').delete(deleteRow)

module.exports = router;