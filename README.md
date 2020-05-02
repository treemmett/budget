# Budget API

## Setup

### Configuration

The following env values are used

| Variable      | Description                             | Type                                   | Default Value          |
| ------------- | --------------------------------------- | -------------------------------------- | ---------------------- |
| `NODE_ENV`    | Environment                             | `production`, `development`, `testing` | `development`          |
| `PG_DATABASE` | Database name                           | string                                 | `budget`               |
| `PG_HOST`     | Hostname of database server.            | string                                 | `localhost`            |
| `PG_PASSWORD` | Password for database.                  | string                                 | `''`                   |
| `PG_PORT`     | Port for database server.               | number                                 | `5432`                 |
| `PG_USERNAME` | Username for database.                  | string                                 | `postgres`             |
| `PORT`        | Port for Rudget API to run on.          | number                                 | `8080`                 |
| `JWT_SECRET`  | Base-64 encoded secret for JWT signing. | base64 encoded string                  | `crypto.randomBytes()` |
