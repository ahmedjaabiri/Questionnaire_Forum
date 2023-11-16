var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_project"
});
con.connect();
module.exports = class form {
  id = 0;
  static create(nom) {
    var sql = "INSERT INTO form (nomf) VALUES ('" + nom + "')";
    con.query(sql, function(err, result) {
      if (err) {
        console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        throw err;
      }
      console.log("1 record inserted");
    });
  }
};
