# Rudget API

## Setup

### Environment Variables

Below is a list of all variables in use by Rudget. Either set the variables in the shell, or add them to a `.env` file in the root.

| Variable      | Description                             | Required | Default Value      |
| ------------- | --------------------------------------- | -------- | ------------------ |
| `DB_DATABASE` | Database name.                          | ✓        |                    |
| `DB_HOST`     | Hostname of database server.            | ✓        |                    |
| `DB_PASS`     | Password for database.                  |          |                    |
| `DB_PORT`     | Port for database server.               |          | 5432               |
| `DB_USER`     | Username for database.                  |          | postgres           |
| `PORT`        | Port for Rudget API to run on.          |          | 8080               |
| `JWT_SECRET`  | Base-64 encoded secret for JWT signing. |          | Randomized buffer. |
