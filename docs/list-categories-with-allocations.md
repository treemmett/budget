# List categories with allocations

List all categories in a given budget with the totalled amount of transactions for the month.

## URL

`/budget/:budgetId/category/:year/:month`

## Method

`GET`

## URL Params

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `budgetId` | ID of the budget to create the category in. |
| `year`     | The year of transactions to display.        |
| `month`    | The month of transactions to display.       |

## Success Response

| Property     | Type   | Description                                                          |
| ------------ | ------ | -------------------------------------------------------------------- |
| `[n].id`     | String | ID of the category.                                                  |
| `[n].name`   | String | Name of the category.                                                |
| `[n].amount` | Number | Total of all transaction within the category for the provided month. |

## Error Responses

| Error             | Message           | Status Code | Reason                                                                   |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `budgetId` does not match any budget the current user has access to. |
