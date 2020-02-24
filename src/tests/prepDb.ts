import createSqlConnection from '../server/sql';

createSqlConnection({
  suffix: '-test',
  drop: true,
  synchronize: true
}).then(() => process.exit());
