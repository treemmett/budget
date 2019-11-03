# Create income

Create a new income source.

## URL

`/budget/:budgetId/income`

## Method

`POST`

## URL Params

| Property   | Description                                      |
| ---------- | ------------------------------------------------ |
| `budgetId` | ID of the budget to create the income source in. |

## Body

| Property | Type   | Required                       | Description                                                                                          |
| -------- | ------ | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `name`   | String | ✓                              | Name of the income source.                                                                           |
| `scale`  | String | ✓                              | The income scale of the source. Valid values are `hourly`, `yearly`, `weekly`, `monthly` or `fixed`. |
| `rate`   | Number | ✓                              | The monetary value earned per `scale` period.                                                        |
| `hours`  | Number | If `scale` is set to `hourly`. | The number of hours per week earned.                                                                 |

## Success Response

| Property | Type    | Description                                                                                          |
| -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `id`     | String  | ID of the created income source.                                                                     |
| `name`   | String  | Name of the created income source.                                                                   |
| `scale`  | String  | The income scale of the source. Valid values are `hourly`, `yearly`, `weekly`, `monthly` or `fixed`. |
| `rate`   | Number  | The monetary value earned per `scale` period.                                                        |
| `hours`  | Number? | The number of hours per week earned. Only set if `scale` is `hourly`.                                |

## Error Responses

| Error             | Message                              | Status Code | Reason                                                                   |
| ----------------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------ |
| `invalid_request` | Budget not found.                    | 404         | The `budgetId` does not match any budget the current user has access to. |
| `invalid_request` | Hourly income sources require hours. | 400         | An income source with an hourly pay scale is missing an `hours` value.   |
