# Create account

Create a new bank account.

## URL

`/budget/:budgetId/account`

## Method

`POST`

## URL Params

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `budgetId` | ID of the budget to create the category in. |

## Body

| Property | Type   | Required | Description                                                                 |
| -------- | ------ | -------- | --------------------------------------------------------------------------- |
| `name`   | String | ✓        | Name of the bank account.                                                   |
| `type`   | String | ✓        | Bank account type. Valid values are `checking`, `savings`, or `creditCard`. |

## Success Response

| Property | Type   | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| `id`     | String | ID of the created account.                                                 |
| `name`   | String | Name of the created account.                                               |
| `type`   | String | The account type. Valid values are `checking`, `savings`, or `creditCard`. |

## Error Responses

| Error             | Message           | Status Code | Reason                                                                   |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `budgetId` does not match any budget the current user has access to. |
