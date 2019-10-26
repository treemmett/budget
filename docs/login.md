# Login

Login as an existing user

## URL

`/user/auth`

## Method

`POST`

## Body

| Property   | Type   | Required | Description            |
| ---------- | ------ | -------- | ---------------------- |
| `email`    | String | ✓        | Email of the new user. |
| `password` | String | ✓        | Password of the user.  |

## Success Response

| Property    | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| `expiresAt` | Number | Timestamp of token expiration. |
| `token`     | String | The access token.              |
