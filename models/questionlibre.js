var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_project"
});
con.connect();
module.exports = class qstlibre {
  static create(f, qst) {
    var sql =
      "INSERT INTO questionlibre (question, idf) VALUES ('" +
      qst +
      "','" +
      f +
      "')";
    con.query(sql, function(err2, result) {
      if (err2) {
        console.log("error qst lib");
        throw err2;
      }
      console.log("1 record inserted");
    });
  }
};
