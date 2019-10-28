# Create user

Create a new user.

## URL

`/user`

## Method

`POST`

## Body

| Property    | Type   | Required | Description            |
| ----------- | ------ | -------- | ---------------------- |
| `email`     | String | ✓        | Email of the new user. |
| `firstName` | String | ✓        | First name of user.    |
| `lastName`  | String | ✓        | Last name of user.     |
| `password`  | String | ✓        | Password to set.       |

## Success Response

| Property          | Type   | Description                     |
| ----------------- | ------ | ------------------------------- |
| `user`            | Object | Details about the created user. |
| `user.email`      | String | Email of the user.              |
| `user.firstName`  | String | First name of the user.         |
| `user.id`         | String | Unique ID of the user.          |
| `user.lastName`   | String | Last name of the user.          |
| `token`           | Object | Details about the access token. |
| `token.expiresAt` | Number | Timestamp of token expiration.  |
| `token.token`     | String | The access token.               |

## Error Responses

| Error             | Message                      | Status Code | Reason                                                   |
| ----------------- | ---------------------------- | ----------- | -------------------------------------------------------- |
| `invalid_request` | Email is already registered. | 400         | The provided `email` is already in use for another user. |
