# Create budget

Create a new budget.

## URL

`/budget`

## Method

`POST`

## Body

| Property | Type   | Required | Description         |
| -------- | ------ | -------- | ------------------- |
| `name`   | String | ✓        | Name of the budget. |

## Success Response

| Property | Type   | Description              |
| -------- | ------ | ------------------------ |
| `id`     | String | Unique ID of the budget. |
| `name`   | String | Name of the budget.      |
