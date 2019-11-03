# Create transaction

Add a new transaction entry.

## URL

`/budget/:budgetId/transaction`

## Method

`POST`

## URL Params

| Property   | Description       |
| ---------- | ----------------- |
| `budgetId` | ID of the budget. |

## Body

| Property      | Type   | Required | Description                                                                                  |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| `amount`      | Number | ✓        | Positive number representing amount of the transaction. Will be trimmed to 2 decimal places. |
| `category`    | String | ✓        | ID of the category to add the transaction to.                                                |
| `date`        | String | ✓        | ISO 8601 date string of when the transaction occured.                                        |
| `description` | String | ✓        | Description of the transaction.                                                              |

## Success Response

| Property        | Type   | Description                                             |
| --------------- | ------ | ------------------------------------------------------- |
| `amount`        | Number | Positive number representing amount of the transaction. |
| `category`      | Object | Details of the category the transaction is in.          |
| `category.id`   | String | ID of the category.                                     |
| `category.name` | String | Name of the category.                                   |
| `date`          | String | ISO 8601 date string of when the transaction occured.   |
| `description`   | String | Description of the transaction.                         |
| `id`            | String | ID of the transaction.                                  |
