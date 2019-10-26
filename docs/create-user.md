# Create user

Create a new user.

## URL

`/user`

## Method

`POST`

## Body

| Property  | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| email     | String | ✓        | Email of the new user. |
| firstName | String | ✓        | First name of user.    |
| lastName  | String | ✓        | Last name of user.     |
| password  | String | ✓        | Password to set.       |

## Success Response

| Property  | Type   | Description             |
| --------- | ------ | ----------------------- |
| email     | String | Email of the user.      |
| firstName | String | First name of the user. |
| id        | String | Unique ID of the user.  |
| lastName  | String | Last name of the user.  |
