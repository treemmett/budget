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

## Error Responses

| Error                  | Message             | Status Code | Reason                                                                    |
| ---------------------- | ------------------- | ----------- | ------------------------------------------------------------------------- |
| `unauthorized_request` | User not found.     | 401         | The provided `email` is not in use for any existing user.                 |
| `unauthorized_request` | Incorrect password. | 401         | The provided `password` does not match the password on file for the user. |
