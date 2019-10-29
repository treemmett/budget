# List categories

List all categories in a given budget.

## URL

`/budget/:budgetId/category`

## Method

`GET`

## URL Params

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `budgetId` | ID of the budget to create the category in. |

## Success Response

| Property     | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `[n].id`     | String | ID of the category.                  |
| `[n].name`   | String | Name of the category.                |
| `[n].budget` | String | ID of the budget the category is in. |

## Error Responses

| Error             | Message           | Status Code | Reason                                                                   |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found. | 404         | The `budgetId` does not match any budget the current user has access to. |
