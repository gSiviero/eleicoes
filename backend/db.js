var mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PWD,
  database : process.env.DB
});

con.connect(function (err) {
  if (err) throw err;
});

function getSecoes(o) {
  var p1 = getResults(o);
  var p2 = getCount(o);
  return Promise.all([p1,p2]);
}

function createWhereClause(filter){
    where = `where Turno = ${filter.turno ?? 1} and `;
    where += !filter.uf ?"": `UF = "${filter.uf}" and `;
    where += !filter.zona ?"": `Zona = ${filter.zona} and `;
    where += !filter.municipio ?"": `Municipio like '%${filter.municipio}%' and `;
    where += !filter.secao ?"": `Secao = ${filter.secao} and `;
    where += `Total > 0`;
    return where;
}

function getResults(o) {
  whereClause = createWhereClause(o.filter);
  var query = `select * from secoes ${whereClause} order by ${o.sort.column} ${
    o.sort.direction
  } limit ${(o.page - 1) * o.pageSize},${o.pageSize}`;
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

function getCount(o){  
    whereClause = createWhereClause(o.filter);
    var query = `select Count(*) as 'rows' from secoes ${whereClause}`;
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) throw err;
            resolve(result[0].rows)});
      });
}

module.exports = getSecoes;
