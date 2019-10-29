# Create category

Create a new budget category.

## URL

`/budget/:budgetId/category`

## Method

`POST`

## URL Params

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `budgetId` | ID of the budget to create the category in. |

## Body

| Property | Type   | Required | Description           |
| -------- | ------ | -------- | --------------------- |
| `name`   | String | ✓        | Name of the category. |

## Success Response

| Property | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `id`     | String | ID of the created category.   |
| `name`   | String | Name of the created category. |

## Error Responses

| Error             | Message             | Status Code | Reason                                                                   |
| ----------------- | ------------------- | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found.   | 404         | The `budgetId` does not match any budget the current user has access to. |
| `invalid_request` | Category not found. | 404         | Category data was modified between creation and response.                |
