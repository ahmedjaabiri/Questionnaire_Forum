let express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Views set
app.use("/assets", express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const { MongoClient, ObjectID } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "myproject";

app.get("/", function (request, response) {
  MongoClient.connect(url, function (err, client) {
    const db = client.db(dbName);
    if (err) throw err;
    db.collection("form")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        response.render("main.ejs", { result: result });
      });
  });
});
app.get("/form", function (request, response) {
  response.render("form");
});
app.get("/add", function (request, response) {
  response.render("add");
});

app.post("/add", function (req, res) {
  if (req.body.formname === undefined || req.body.formname === "") {
    res.redirect("add");
  } else {
    if (
      (req.body.qstl1 === "" || req.body.qstl1 === undefined) &&
      (req.body.qstc1 === "" || req.body.qstc1 === undefined)
    ) {
      res.redirect("/add");
    } else {
      var qsts = req.body;
      var id = new ObjectID();
      MongoClient.connect(url, async function (err, client) {
        if (err) throw console.error();
        const db = client.db(dbName);
        //inserction form
        db.collection("form").insertOne({
          _id: id,
          name: req.body.formname
        });
        c = 1;
        var tab = [];
        while (qsts["qstl" + c]) {
          let q = qsts["qstl" + c];
          tab.push(q);
          c++;
        }
        d = 1;
        let tab2 = [];
        while (qsts["qstc" + d]) {
          let q2 = qsts["qstc" + d];
          tab2.push(q2);
          n = 1;
          var opt = [];
          while (qsts["opt" + d + n]) {
            let o = qsts["opt" + d + n];
            opt.push(o);
            n++;
          }
          tab2.push(opt);
          d++;
        }
        //inserction form
        await db.collection("form").updateOne(
          {
            _id: id
          },
          {
            $set: {
              question: [tab, tab2]
            }
          }
        );
        db.collection("form").findOne({ _id: id }, function (err, result) {
          if (err) throw err;
          res.render("form.ejs", { result: result });
        });
      });
    }
  }
});
app.get("/rep", function (request, response) {
  MongoClient.connect(url, function (err, client) {
    const db = client.db(dbName);
    if (err) throw err;
    let id = new ObjectID(request.query.id);
    db.collection("form").findOne({ _id: id }, function (err, result) {
      if (err) throw err;
      response.render("form.ejs", { result: result });
    });
  });
});
app.post("/rep", function (request, response) {
  var id2 = new ObjectID(request.query.id);
  var qsts = request.body;
  c = 0;
  let tab = [];
  while (qsts["repl" + c]) {
    let q = qsts["repl" + c];
    tab.push(q);
    c++;
  }
  var l = Object.keys(qsts).length;
  var topt = [];
  let k = 0;
  for (let i = 0; i < l - c; i++) {
    topt.push(qsts["opt" + k]);
    k += 2;
  }
  MongoClient.connect(url, function (err, client) {
    if (err) throw console.error();
    const db = client.db(dbName);
    var id3 = new ObjectID();
    //inserction form
    db.collection("form").updateOne(
      {
        _id: id2
      },
      {
        $push: {
          reponse: [tab, topt]
        }
      }
    );
  });
  response.redirect("/stat/" + id2);
});
app.get("/stat/:id", function (request, response) {
  MongoClient.connect(url, function (err, client) {
    const db = client.db(dbName);
    if (err) throw err;
    var id = new ObjectID(request.params.id);
    db.collection("form").findOne({ _id: id }, function (err, result) {
      if (err) throw err;
      var qst = result.question[1];
      var rep = result.reponse;
      var opt = [];
      var nbopt = [];
      var qs = [];
      for (let i = 0; i < qst.length; i++) {
        qs.push(qst[i]);
        i++;
        for (var j = 0; j < qst[i].length; j++) {
          opt.push(qst[i][j]);
          var nb = 0
          for (let a = 0; a < rep.length; a++) {
            for (let b = 0; b < rep[a][1].length; b++) {
              if (rep[a][1][b] === qst[i][j]) {
                nb++;
              }
            }
          }
          nbopt.push(nb);
        }
        qs.push(j);
      }
      response.render("stat.ejs", { opt: opt, topt: nbopt, qs: qs });
    });
  });
});
app.listen(8080, () => console.log("Started on 8080"));
