import createSqlConnection from '../server/sql';

createSqlConnection({
  drop: true,
  suffix: '-test',
  synchronize: true,
})
  .then(conn => conn.close())
  .catch(() => {
    throw new Error('Could not purge test database');
  });
