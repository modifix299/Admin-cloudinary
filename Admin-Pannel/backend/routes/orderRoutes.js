const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authAdmin, authCustomer } = require('../middleware/authMiddleware');


router.route('/').get( orderController.getAllOrders);
router.route('/getOne/:id').get(  orderController.getOneOrder);
router.route('/create').post(orderController.createNewOrder);
router.route('/update/:id').patch(orderController.orderUpdate);
router.route('/delete/:id').delete( orderController.deleteOrder);
router.route('/get/totalSales').get(  orderController.totalServices);
router.route('/get/orderCount').get(  orderController.orderCounting);
router.route('/get/customerOrderList').get(  orderController.clientOrderList);

module.exports = router;