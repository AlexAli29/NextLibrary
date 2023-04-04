const sql = require('mssql');
const config = require('./dbConfig');

async function executeQuery(query) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  executeQuery
}
