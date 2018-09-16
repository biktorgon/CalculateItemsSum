'use strict';

const express = require('express');
const router = express.Router();

const orderService = require('../services/order');

router.post('/', function (req, res) {
    if (!req.body.order) {
        return res.status(400).send('incorrect "order" field');
    }

    let orderData = req.body.order;
    const orderPercDiscount = orderData.percDiscount || 0;
    const orderSumDiscount = orderData.sumDiscount || 0;

    const { itemsData, itemsSum } = orderService.calculateItemsAmount(orderData.items);
    orderData.items = itemsData;
    orderData.totalItemsSum = itemsSum;
    orderData.totalOrderSum = itemsSum;

    if (orderSumDiscount > 0 || orderPercDiscount > 0){
        const { itemsData, orderSum} = orderService.calculateOrderSum(orderData.items, itemsSum, orderPercDiscount, orderSumDiscount);
        orderData.items = itemsData;
        orderData.totalOrderSum = orderSum;
    }

    res.json(orderData);
});

module.exports = router;