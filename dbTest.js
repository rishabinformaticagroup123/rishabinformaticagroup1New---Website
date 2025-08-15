const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_TUCwP7jlS5vb@ep-curly-unit-a10f2zdg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error:', err.stack);
  } else {
    console.log('Database time:', res.rows[0]);
  }
  pool.end();
});
