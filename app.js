var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var async = require('async');

const bodyParser = require('body-parser');

var router = express.Router();

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db;
function startDB(){
  db = new sqlite3.Database('./db/dev.sqlite.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the Development database.');
  });
}
//startDB();

app.get('/usersList', function(req, res, next) {

  startDB();
  //var sql = 'SELECT id, username, firstName, lastName FROM users';
  var sql = `select a.id as id, a.username as username, a.firstName as firstName, a.lastName as lastName, c.type as role from users a inner join user_roles b on a.id = b.user_id inner join roles c on b.role_id = c.id`
  db.all(sql, (err, result) => {

    if(err){
      console.log("usersList Error: ", err);
      res.json({type: "usersList", error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json(result);
      // result.filter((row) => { row.userid
      //
      // })
    }

  });

  db.close();
});

app.get('/paymentModes', function(req, res, next) {

  startDB();

  db.all('SELECT * FROM payment_modes', (err, result) => {
    if(err){
      console.log("paymentModes Error: ", err);
      res.json({type: "paymentModes", error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json(result);
    }
  });

  db.close();

});

app.get('/transactionTypes', function(req, res, next) {

  startDB();

  db.all('SELECT * FROM transaction_types', (err, result) => {
    if(err){
      console.log("transactionTypes Error: ", err);
      res.json({type: "transactionTypes", error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json(result);
    }
  });

  db.close();
});

/* GET users listing. */
app.get('/users', function(req, res, next) {
  res.json([{
  	id: 1,
  	username: "Raghu"
  }, {
  	id: 2,
  	username: "Varma"
  }]);
});

app.get('/createDataBaseTables', function(req, res, next) {
  startDB();
  db.run("CREATE TABLE roles ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT DEFAULT User, isDefault	INTEGER DEFAULT 0)");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, firstName TEXT, lastName TEXT, password TEXT, createdDate TEXT )");
  db.run("CREATE TABLE user_roles ( id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, role_id INTEGER)");
  db.run("CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type INTEGER, username TEXT, description TEXT, paymentFrom INTEGER, paymentTo INTEGER, amount FLOAT, date TEXT, createdDate TEXT )");
  db.run("CREATE TABLE user_payments (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, type INTEGER, description TEXT, balance FLOAT, createdDate TEXT, lastModified TEXT )");
  db.run("CREATE TABLE transaction_types (id	INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT)");
  db.run("CREATE TABLE payment_modes (id	INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, defaultPayment INTEGER DEFAULT 0)");
  db.close();
  res.json({type: "createDataBaseTables", result: "Success"});
});

app.get('/createMasterTableData', function(req, res, next) {
  startDB();
  db.run("INSERT INTO roles (type, isDefault) VALUES (?, ?)", "Admin", 0);
  db.run("INSERT INTO roles (type, isDefault) VALUES (?, ?)", "User", 1);
  db.run("INSERT INTO roles (type, isDefault) VALUES (?, ?)", "Developer", 0);
  db.run("INSERT INTO transaction_types (type) VALUES (?)", "Credit");
  db.run("INSERT INTO transaction_types (type) VALUES (?)", "Debit");
  db.run("INSERT INTO transaction_types (type) VALUES (?)", "Transfer");
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "Cash", 1);
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "CreditCard", 0);
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "DebitCard", 0);
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "PayTm", 0);
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "PhonePe", 0);;
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "Gpay", 0);
  db.run("INSERT INTO payment_modes (type, defaultPayment) VALUES (?, ?)", "Others", 1);
  db.close();
  res.json({type: "createMasterTableData", result: "Success"});
});

app.get('/dropDataBaseTables', function(req, res, next) {
  startDB();
  db.run("DROP TABLE roles;");
  db.run("DROP TABLE users;");
  db.run("DROP TABLE transactions;");
  db.run("DROP TABLE user_payments;");
  db.run("DROP TABLE transaction_types;");
  db.run("DROP TABLE payment_modes;");
  db.close();
  res.json({type: "dropDataBaseTables", result: "Success"});
});

app.post('/login', function(req, res, next) {
  startDB();
  var username = req.body.username;
  var password = req.body.password;

  //let sql = `SELECT username, password, role from users where username= ?`;
  let sql = `select a.id as id, a.password as password, a.username as username, a.firstName as firstName, a.lastName as lastName, c.type as role from users a inner join user_roles b on a.id = b.user_id inner join roles c on b.role_id = c.id where a.username=?`;

// first row only
db.all(sql, [username], (err, result) => {
  if(err){
      console.log("Error: ", err);
      res.json({ error:"Unable to execute Database query."});
    }

    if(result === undefined) {
      res.json({ error:"User Not Found."});
    } else if(password != result[0].password){
        res.json({ error:"Invalid password."});
    } else {
      var rolesArray = [];
      for(var i= 0; i<= result.length-1; i++){
        rolesArray.push(result[i].role)
        if (result.length-1 === i){
          res.json({username:result[0].username, roles:rolesArray});
        }
      }
    }

  });

  db.close();

});

app.get('/checkUserAvailability', function(req, res, next) {

  startDB();

  var username = req.query.username;

  let sql = `SELECT * from users where username= ?`;

  // first row only
  db.get(sql, [username], (err, result) => {
    if(err){
        console.log("Error: ", err);
        res.json({ error:"Unable to execute Database query."});
      }
      console.log("result: ", result);
    if(result === undefined) {
      res.json({ message: "username available."});
    } else if(result.length != 0){
        res.json({username:result.username, error: "username not available."});
    }
  });
  db.close();
});

// Create user
app.post('/createUser', function(req, res, next) {
  startDB();
  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;
  var createdDate = new Date();

  db.run(`INSERT INTO users(username, firstName, lastName, password, createdDate) VALUES(?, ?, ?, ?, ?, ?)`, [username, firstName, lastName, password, role, createdDate], function(err) {
    if(err){
      console.log("Error: ", err);
      res.json({ message:"Unable to execute Database query.", error: err});
    }

    if(`${this.lastID}`) {
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.json({userId: `${this.lastID}`, message: "Successfully created user"});
    } else {
      console.log("Unable to create User");
      res.json({message: "Unable to create User"});
    }

  });

  db.close();
});


/* GET users listing. */
app.get('/sqliteDBRecordsTest', function(req, res, next) {

  db.serialize(() => {
    const playerId = 1;
    const playerName = 'Raghu';
    db.run("CREATE TABLE IF NOT EXISTS playlists (id INTEGER, name TEXT)");
    db.run("INSERT INTO playlists (id, name) VALUES (?, ?)", `${playerId}`, `${playerName}`);
    // db.each(`SELECT PlaylistId as id,
    //                 Name as name
    //          FROM playlists`, (err, row) => {
    db.each(`SELECT id, name FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });

});


/* method: get payments */
app.get('/getUserPayments', function(req,res,next) {

  var username = req.query.username;

  var pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  var pageSize = req.query.pageSize ? req.query.pageSize : 20;

  var recordsFrom = (pageNumber * pageSize);
  console.log("recordsFrom: ", recordsFrom);
  console.log("pageSize: ", pageSize);

  startDB();
  var sql = `select a.id, a.username, b.type, a.description, a.balance, a.lastModified from user_payments a inner join payment_modes b on a.type = b.id where username=? LIMIT ?, ?`;
  db.all(sql, [`${username}`, `${recordsFrom}`, `${pageSize}`], function(err, result){
    if(err){
      console.log("Error: ", err);
      res.json({error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json({result, message:"User Payment list."});
    }
  });

  db.close();

});

/* method: get payments length */
app.get('/getUserPaymentsLength', function(req,res,next) {

  var username = req.query.username;

  startDB();
  var sql = `select count(*) as noOfRecords from user_payments where username=?`;
  db.all(sql, [`${username}`], function(err, result){
    if(err){
      console.log("Error: ", err);
      res.json({error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json({result, message:"User Payment list."});
    }
  });

  db.close();

});


app.get("/getUserPaymentBalance", function(req,res,next) {
  var userPaymentId = req.query.userPaymentId;
  var paymentBalance = getUserPaymentBalance(userPaymentId);
  console.log("paymentBalance: ", paymentBalance);
  if(paymentBalance == 0){
    res.json({error: "Unable to fetch data."});
  } else {
    res.json({data:paymentBalance});
  }
});

function getUserPaymentBalance(userPaymentId) {
  console.log("userPaymentId: ", userPaymentId);
  startDB();
  var sql = `select balance from user_payments where id=?`;

  db.get(sql, `${userPaymentId}`, function(err, result){

    if(err){
      console.log("Error: ", err);
      return { error: "Unable to fetch data."}
      console.log("getUserPaymentBalance Error: ", err);
    }

    console.log("getUserPaymentBalance result: ", result);
    if(result === undefined) {
      return 0
    } else {
      return result.balance;
    }
  });

  db.close();
}

/* method: get payment */
app.get('/getUserPayment', function(req,res,next) {

  var userPaymentId = req.query.userPaymentId;

  startDB();

  var sql = `select a.id, a.username, b.type, a.description, a.balance, a.lastModified from user_payments a inner join payment_modes b on a.type = b.id where a.id=?`;

  db.get(sql, `${userPaymentId}`, function(err, result){

    if(err){
      console.log("Error: ", err);
      res.json({error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json({result, message:"User Payment list."});
    }

  });

  db.close();

});

/* method: post - creating user payment. */
app.post('/addUserPayment', function(req, res, next) {
  startDB();
    const username = req.body.username;
    const type = req.body.paymentType;
    const description = req.body.description;
    const balance = req.body.balance;
    const createdDate = new Date();
    const lastModified = new Date();
    db.run(`INSERT INTO user_payments (username, type, description, balance, createdDate, lastModified) VALUES (?, ?, ?, ?, ?, ?)`, [`${username}`, `${type}`, `${description}`, `${balance}`, `${createdDate}`, `${lastModified}`], function(err) {
        if (err) {
          console.error("Error: ", err);
          res.json({ type: "createPayments", result: "Failure", message: err });
        }

        if(`${this.lastID}`) {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          res.json({userId: `${this.lastID}`, type: "addUserPayment", result: "Success", message: "Successfully added user payment."});
        } else {
          console.log("Unable to create User");
          res.json({message: "Unable to create user_payments"});
        }

    });

  db.close();

});

function updateUserPaymentRecord(id, balance) {
  var lastModified = new Date();
  db.run(`UPDATE user_payments SET balance=?, lastModified=? where id=?`, balance, lastModified, id, function(err) {
    if (err) {
      console.error("Error: ", err);
      return false;
    }
    return true;
    console.log(`Row(s) updated: ${this.changes}`);
  });
}

/* method: post - update payment. */
app.post('/updateUserPayment', function(req, res, next) {
  startDB();
    //const id = 1;
    const id = req.query.userId
    const balance = req.body.balance || 0.00;
    const lastModified = new Date();
    db.run(`UPDATE user_payments SET balance=${balance}, lastModified=${lastModified} where id=${id}`,[], function(err) {
      if (err) {
        console.error("Error: ", err);
        res.json({ type: "updatePayments", result: "Failure", message: err });
      }
      res.json({type: "updatePayments", result: "Success", message: "Successfully Updated payment."});

      console.log(`Row(s) updated: ${this.changes}`);
    });

  db.close();

});

/* method: get Transactions */
app.get('/getUserTransactions', function(req,res,next) {

  var username = req.query.username;
  var pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  var pageSize = req.query.pageSize ? req.query.pageSize : 20;

  var recordsFrom = (pageNumber * pageSize);

  startDB();

 var sql = `select a.id as id, a.username as username, b.type as type, a.description as description, c.type as paymentFrom, d.type as paymentTo, a.amount as amount, a.date as date from transactions a inner join transaction_types b on a.type = b.id inner join (select d.id, d.username, b.type as type, d.description, d.balance, d.lastModified from user_payments d inner join payment_modes b on d.type = b.id where d.username=?) c on a.paymentFrom = c.id inner join (select d.id, d.username, b.type as type, d.description, d.balance, d.lastModified from user_payments d inner join payment_modes b on d.type = b.id where d.username=?) d on a.paymentTo = d.id where a.username=? LIMIT ?, ?`;

  db.all(sql, [`${username}`, `${username}`, `${username}`, `${recordsFrom}`, `${pageSize}`], function(err, result){
    if(err){
      console.log("Error: ", err);
      res.json({error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json({result, message:"User Transaction list."});
    }

  });

  db.close();

});

/* method: get transactions length */
app.get('/getUserTransactionsLength', function(req,res,next) {

  var username = req.query.username;

  startDB();
  var sql = `select count(*) as noOfRecords from transactions where username=?`;
  db.all(sql, [`${username}`], function(err, result){
    if(err){
      console.log("Error: ", err);
      res.json({error: "Unable to fetch data."});
    }

    if(result === undefined) {
      res.json({ message:"Records Not Found."});
    } else {
      res.json({result, message:"User Transactions list."});
    }
  });

  db.close();

});


app.get('/testAsyncProcess', function(req,res,next) {
  startDB()
  var asyncOps = [
    function (done) {
        console.log('1. Lets print the rows from the database-');
        db.each("SELECT type FROM payment_modes where id=1", function (err, row) {
            if (err) return done(err);
            console.log(row);
            console.log('All done 1');
            done(null, row);
        });
    },
    function (done) {
        console.log("2. Lets print the rows from the database-");
        db.each("SELECT type FROM transaction_types where id=1", function (err, row) {
            if (err) return done(err);
            console.log(row);
            console.log('All done 2');
            done(null, row);
        });
    }
  ];

  async.series(asyncOps, function (err, results) {

    if (err) return console.log(err);
    console.log("testAsyncProcess -- results: ", results);
    res.json(results)
  });
  db.close();
});


/* method: post - creating transaction. */
app.post('/createTransaction', function(req, res, next) {
    const username = req.body.username;
    const type = req.body.transactionType;
    const description = req.body.description;
    const amount = req.body.amount;
    const paymentFrom = req.body.paymentFrom;
    const paymentTo = req.body.paymentTo;
    const createdDate = new Date();
    const date = new Date();

    var paymentFromlastModified = new Date().getTime();
    var paymentToLastModified = new Date().getTime();

      var paymentFromBalance = 0.0;
      var paymentToBalance = 0.0;

      var asyncOps = [
        function (done) {
            console.log('1. Lets print the rows from the database-');
            var sql = `select balance from user_payments where id=?`;
            startDB();
            db.get(sql, `${paymentFrom}`, function (err, row) {
                if(err){
                  console.log("1. Error: ", err);
                  done(err)
                }
                console.log("getUserPaymentBalance result: ", row);
                console.log(row);
                done(null, row);
            });
          db.close();
        },
        function (done) {
            console.log("2. Lets print the rows from the database-");
            var sql = `select balance from user_payments where id=?`;
            startDB();
            db.get(sql, `${paymentTo}`, function (err, row) {
                if(err){
                  console.log("2. Error: ", err);
                  done(err)
                }
                console.log("getUserPaymentBalance result: ", row);
                console.log(row);
                console.log('All done 2');
                done(null, row);
            });
            db.close();
        }
    ];

    async.series(asyncOps, function (err, results) {

        if (err) return console.log(err);
        console.log("getUserPaymentBalance -- results: ", results);
        startDB();
        db.serialize(() => {
          console.log("before paymentFromBalance: ", results[0]["balance"]);

          paymentFromBalance = results[0]["balance"] - amount;

          console.log("after paymentFromBalance: ", paymentFromBalance);
          db.run(`UPDATE user_payments SET balance=${paymentFromBalance}, lastModified=${paymentFromlastModified} where id=${paymentFrom}`,[], function(err) {
            if (err) {
              console.error("Error: ", err);
              return false
            }
            console.log(`Row(s) updated: ${this.changes}`);
          });

          paymentToBalance = results[1]["balance"] + amount;

          db.run(`UPDATE user_payments SET balance=${paymentToBalance}, lastModified=${paymentToLastModified} where id=${paymentTo}`,[], function(err) {
            if (err) {
              console.error("Error: ", err);
              return false
            }
            console.log(`Row(s) updated: ${this.changes}`);
          })

          db.run("INSERT INTO transactions (username, type, description, amount, paymentFrom, paymentTo, createdDate, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [`${username}`, `${type}`, `${description}`, `${amount}`, `${paymentFrom}`, `${paymentTo}`, `${createdDate}`, `${date}`], function(err, result){
            if (err) {
              console.error(err);
              res.json({ type: "createTransactions", result: "Failure", message: err});
            }

            if(`${this.lastID}`) {
              console.log(`A row has been inserted with rowid ${this.lastID}`);
              res.json({userId: `${this.lastID}`, type: "createTransactions", result: "Success", message: "Successfully Created transaction."});
            } else {
              console.log("Unable to create User");
              res.json({message: "Unable to create user_payments"});
            }

          });

        });

        db.close();
    });

});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Expenses Application is Running on ${port}`);

module.exports = app;
