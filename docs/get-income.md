# Get income

Get all income sources and calculate yearly income.

## URL

`/budget/:budgetId/income`

## Method

`GET`

## URL Params

| Property   | Description                                      |
| ---------- | ------------------------------------------------ |
| `budgetId` | ID of the budget to create the income source in. |

## Success Response

| Property       | Type    | Description                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `income`       | Number  | The calculated sum of the income sources per year.                                                   |
| `jobs`         | Array   | List of income sources in the budget.                                                                |
| `jobs[n]id`    | String  | ID of the created income source.                                                                     |
| `jobs[n]name`  | String  | Name of the created income source.                                                                   |
| `jobs[n]scale` | String  | The income scale of the source. Valid values are `hourly`, `yearly`, `weekly`, `monthly` or `fixed`. |
| `jobs[n]rate`  | Number  | The monetary value earned per `scale` period.                                                        |
| `jobs[n]hours` | Number? | The number of hours per week earned. Only set if `scale` is `hourly`.                                |

## Error Responses

| Error             | Message                              | Status Code | Reason                                                                   |
| ----------------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found.                    | 404         | The `budgetId` does not match any budget the current user has access to. |
| `invalid_request` | Hourly income sources require hours. | 400         | An income source with an hourly pay scale is missing an `hours` value.   |
