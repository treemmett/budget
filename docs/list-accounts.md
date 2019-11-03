# List accounts

List all bank accounts in a given budget.

## URL

`/budget/:budgetId/account`

## Method

`GET`

## URL Params

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `budgetId` | ID of the budget to create the category in. |

## Success Response

| Property   | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| `[n].id`   | String | ID of the account.                                                         |
| `[n].name` | String | Name of the account.                                                       |
| `[n].type` | String | The account type. Valid values are `checking`, `savings`, or `creditCard`. |

## Error Responses

| Error             | Message           | Status Code | Reason                                                                   |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `budgetId` does not match any budget the current user has access to. |
