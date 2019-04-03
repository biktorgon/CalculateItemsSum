# Расчет суммы/скидки заказа

#### Method: POST
#### url: .../calc

#### тестовые данные:
```
{
  "order": {
    "items": [
      {
        "itemId": 150, //id партии
        "quantity": 1, //количество
        "price": 3795, //цена за 1 шт.
        "percDiscount": 0, //скидка на текущую позицию в процентах
        "sumDiscount": 0 //скидка на текущую позицию в рублях
      },
      {
        "itemId": 152,
        "quantity": 2,
        "price": 3097.5,
        "percDiscount": 0,
        "sumDiscount": 0				
      }
    ],
    "percDiscount": 10, //скидка на заказ в целом в процентах
    "sumDiscount": 200 //скидка на заказ в целом в рублях
  }
}
```

#### ответ (200):
```
{
  "items": [
    {
      "itemId": 150,
      "quantity": 1,
      "price": 3795,
      "percDiscount": 0,
      "sumDiscount": 0,
      "cost": 3795, //цена с учетом скидки на текущую позицию
      "sum": 3339 //сумма позиции с учетом всех скидок
    },
    {
      "itemId": 152,
      "quantity": 2,
      "price": 3097.5,
      "percDiscount": 0,
      "sumDiscount": 0,
      "cost": 6195,
      "sum": 5451
    }
  ],
  "percDiscount": 10,
  "sumDiscount": 200,
  "totalItemsSum": 9990, //сумма всех позиций с учетом персональных скидок
  "totalOrderSum": 8790 //сумма заказа с учетом всех скидок
}
```
