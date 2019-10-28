# Get budget

Get details of a specific budget.

## URL

`/budget/:budgetId`

## Method

`GET`

## URL Params

| Property   | Description       |
| ---------- | ----------------- |
| `budgetId` | ID of the budget. |

## Success Response

| Property | Type   | Description              |
| -------- | ------ | ------------------------ |
| `id`     | String | Unique ID of the budget. |
| `name`   | String | Name of the budget.      |

## Error Responses

| Error             | Message           | Status Code | Reason                                                             |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `id` does not match any budget the current user has access to. |
