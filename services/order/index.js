function calculateItemsAmount(itemsData) {
    let itemsSum = 0;

    itemsData.forEach(function (item) {
        item.cost = item.price * item.quantity;

        if (item.percDiscount && !isNaN(item.percDiscount)) {
            item.cost -= Math.round((item.cost * item.percDiscount) / 100);
            if (item.cost < 0) {
                item.cost = 0;
            }
        }

        if (item.sumDiscount && !isNaN(item.sumDiscount)) {
            item.cost -= item.sumDiscount;
            if (item.cost < 0) {
                item.cost = 0;
            }
        }

        item.sum = item.cost;
        itemsSum += item.cost;
    });

    return {itemsData, itemsSum};
}

function calculateOrderSum(itemsData, itemsSum, percDiscount=0, sumDiscount=0) {
    let orderSum = 0;
    itemsData.forEach(function (item) {
        const itemPercDiscount = (item.cost * 100) / itemsSum;

        if (percDiscount > 0) {
            const orderPercDiscount = (itemsSum * percDiscount) / 100;
            item.sum -= Math.round((orderPercDiscount * itemPercDiscount) / 100);
        }

        if (sumDiscount > 0) {
            item.sum -= Math.round((sumDiscount * itemPercDiscount) / 100);
        }

        orderSum += item.sum;
    });

    return { itemsData, orderSum };
}

module.exports = {
    calculateItemsAmount,
    calculateOrderSum
};