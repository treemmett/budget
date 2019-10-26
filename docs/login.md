# Login

Login as an existing user

## URL

`/user/auth`

## Method

`POST`

## Body

| Property | Type   | Required | Description            |
| -------- | ------ | -------- | ---------------------- |
| email    | String | ✓        | Email of the new user. |
| password | String | ✓        | Password of the user.  |

## Success Response

| Property  | Type   | Description             |
| --------- | ------ | ----------------------- |
| email     | String | Email of the user.      |
| firstName | String | First name of the user. |
| id        | String | Unique ID of the user.  |
| lastName  | String | Last name of the user.  |
