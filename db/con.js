const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión: ', error);
  }
})

function select(sql){
    if(!sql) throw new Error('La consulta necesita un statement');

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        })
    })
}

function update(sql, params){
  if(!sql) throw new Error('La actualizacion necesita un statement');

  return new Promise((resolve, reject) => {
    connection.query(
      sql,
      params,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    )
  })
}


module.exports = {
    connection,
    select,
    update
};