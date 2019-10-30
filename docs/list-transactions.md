# List transactions

List all transactions in a given budget.

## URL

`/budget/:budgetId/transaction/:year/:month`

## Method

`GET`

## URL Params

| Property   | Description                           |
| ---------- | ------------------------------------- |
| `budgetId` | ID of the budget.                     |
| `year`     | The year of transactions to display.  |
| `month`    | The month of transactions to display. |

## Success Response

| Property          | Type   | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| `[n].id`          | String | ID of the transaction.                              |
| `[n].description` | String | Description of the transaction.                     |
| `[n].date`        | String | Date the transaction took place in ISO 8601 format. |
| `[n].amount`      | Number | Amount of the transaction.                          |
| `[n].category`    | String | ID of the category the transaction is in.           |

## Error Responses

| Error             | Message           | Status Code | Reason                                                                   |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `budgetId` does not match any budget the current user has access to. |
