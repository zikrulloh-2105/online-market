const pg = require('pg')

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  password: '2005',
  database: 'postgres',
  port: 5432
})

async function uniqRow(query, ...arr) {
  try {
    const client = await pool.connect();
    const data = await client.query(query, arr)
    client.release()
    return data
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uniqRow }