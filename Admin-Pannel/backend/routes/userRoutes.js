const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authAdmin } = require('../middleware/authMiddleware')

router.route('/').get(protect, authAdmin, userController.getAllUsers);
router.route('/getOne/:id').get(userController.getOneUser);
router.route('/create').post(protect, authAdmin, userController.createNewUser);
router.route('/update').patch(protect, authAdmin, userController.updateUser);
router.route('/delete').delete(protect, authAdmin, userController.deleteUser);

module.exports = router;