var express = require('express');
var sqlite3 = require('sqlite3').verbose()
//var db = new sqlite3.Database(':memory:')

const bodyParser = require('body-parser');


//var sqliteDB = require('sqlite');
//var SQL =  require('sql-template-strings');

var router = express.Router();

//const dbPromise = sqlite.open('./database.sqlite', { Promise });

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//const db = await sqliteDB.open('./database.sqlite.sql');

// let db = new sqlite3.Database(':memory:', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });
var db;
function startDB(){
  db = new sqlite3.Database('./db/dev.sqlite.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the Development database.');
  });
}



app.get('/usersList', function(req, res, next) {
startDB();
  var outputJSON = []
  db.serialize(function() {
    db.each('SELECT * FROM users', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      outputJSON.push(row);
      console.log(row);
    });
  });
  //res.json(outputJSON);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    res.json(outputJSON);
    console.log('Close the database connection.');
  });
});

app.get('/paymentModes', function(req, res, next) {
  startDB();
  var outputJSON = []
  db.serialize(function() {
    db.each('SELECT * FROM payment_modes', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      outputJSON.push(row);
      console.log(row);
    });
  });
  //res.json(outputJSON);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    res.json(outputJSON);
    console.log('Close the database connection.');
  });
});

app.get('/transcationsTypes', function(req, res, next) {
  startDB();
  var outputJSON = []
  db.serialize(function() {
    db.each('SELECT * FROM transcations_types', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      outputJSON.push(row);
      console.log(row);
    });
  });
  //res.json(outputJSON);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    res.json(outputJSON);
    console.log('Close the database connection.');
  });
  //outputJSON.push(row);
  //res.json(outputJSON)
});

/* GET users listing. */
app.get('/users', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "Raghu"
  }, {
  	id: 2,
  	username: "Varma"
  }]);
});

app.get('/createDataBaseTables', function(req, res, next) {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, firstName TEXT, lastName TEXT, password TEXT, role TEXT, createdDate TEXT )");
  db.run("CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, username TEXT, description TEXT, accountFrom TEXT, accountTo TEXT, amount FLOAT, date TEXT, createdDate TEXT )");
  db.run("CREATE TABLE payments (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, type TEXT, description TEXT, balance FLOAT, createdDate TEXT, lastModified TEXT )");
  db.run("CREATE TABLE transcations_types (id	INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT)");
  //db.run("INSERT INTO transcations_types (type) VALUES (Credit)");
  //db.run("INSERT INTO transcations_types (type) VALUES (Debit)");
  //db.run("INSERT INTO transcations_types (type) VALUES (Transfer)");
  db.run("CREATE TABLE payment_modes ('id'	INTEGER PRIMARY KEY AUTOINCREMENT, 'type' TEXT)");
  //db.run("INSERT INTO payment_modes (type) VALUES (?)", "Cash");
  //db.run("INSERT INTO payment_modes (type) VALUES (?)", "CreditCard");
  //db.run("INSERT INTO payment_modes (type) VALUES (DebitCard)");
  //db.run("INSERT INTO payment_modes (type) VALUES (PayTm)");
  //db.run("INSERT INTO payment_modes (type) VALUES (PhonePe)");
  res.json({type: "createDataBaseTables", result: "Success"});
});

app.get('/dropDataBaseTables', function(req, res, next) {
  //db.run("DROP TABLE playlists;");
  //db.run("DROP TABLE PlaylistId;");
  db.run("DROP TABLE users;");
  db.run("DROP TABLE transactions;");
  db.run("DROP TABLE payments;");
  db.run("DROP TABLE transcations_types;");
  db.run("DROP TABLE payment_modes;");
  res.json({type: "dropDataBaseTables", result: "Success"});
});

app.post('/login', function(req, res, next) {
  startDB();
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password);
  let sql = `SELECT username, password, role from users where username= ?`;

// first row only
db.get(sql, [username], (err, result) => {
  if(err){
      console.log("Error: ", err);
      res.json({ error:"User Not Found."});
    }

  if(result === undefined) {
    res.json({ error:"User Not Found."});
  } else if(password != result.password){
      res.json({ error:"Invalid password."});
    } else {
      //const {username, role} = result.data;
      res.json({data:{username:result.username, role:result.role}});
    }

  });

  db.close();

});


/* GET users listing. */
app.get('/sqliteDBRecordsTest', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  // res.json([{
  // 	id: 1,
  // 	username: "Raghu"
  // }, {
  // 	id: 2,
  // 	username: "Varma"
  // }]);

  // DB Running Test
  // db.serialize(function () {
  //   db.run('CREATE TABLE testing (info TEXT)')
  //   var stmt = db.prepare('INSERT INTO testing VALUES (?)')
  //
  //   for (var i = 0; i < 10; i++) {
  //     stmt.run('test- ' + i)
  //   }
  //
  //   stmt.finalize()
  //
  //   db.each('SELECT rowid AS id, info FROM testing', function (err, row) {
  //     console.log(row.id + ': ' + row.info)
  //   })
  // })
  //
  // db.close()



  // const book = 'harry potter';
  // const author = 'J. K. Rowling';
  //
  // const data = await db.all(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`);
  // res.json(data);

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
    //console.log('Close the database connection.');
  });

});


/* method: post - creating payment. */
app.post('/createPayments', function(req, res, next) {
  startDB();
  db.serialize(() => {
    //const id = 1;
    const username = request.body.username || "Raghu";
    const type = request.body.paymentType || "Cash";
    const description = request.body.description || 'Loading Money from CreditCard to Paytm';
    const balance = request.body.balance || 123.45;
    const createdDate = new Date();
    const lastModified = new Date();
    db.run("INSERT INTO payments (username, type, description, balance, createdDate, lastModified) VALUES (?, ?, ?, ?, ?, ?)", `${username}`, `${type}`, `${description}`, `${balance}`, `${createdDate}`, `${lastModified}`);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
      res.json({ type: "createPayments", result: "Failure", message: err.message });
    }
    res.json({type: "createPayments", result: "Success", message: "Successfully Created payment."});

  });

});

/* method: post - creating payment. */
app.post('/updatePayments', function(req, res, next) {
  startDB();
  db.serialize(() => {
    //const id = 1;
    const id = request.query.userId
    const username = request.body.username || "Raghu";
    const type = request.body.paymentType || "Cash";
    const description = request.body.description || 'Loading Money from CreditCard to Paytm';
    const balance = request.body.balance || 0.00;
    const lastModified = new Date();
    //UPDATE table_name SET column1 = value1, column2 = value2, WHERE condition;
    db.run("UPDATE payments SET username=${username}, type=${type}, description=${description}, balance, createdDate, lastModified ", `${balance}`, `${createdDate}`, `${lastModified}`);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
      res.json({ type: "updatePayments", result: "Failure", message: err.message });
    }
    res.json({type: "updatePayments", result: "Success", message: "Successfully Updated payment."});

  });

});

/* method: post - creating transcation. */
app.post('/createTransactions', function(req, res, next) {
  startDB();
  db.serialize(() => {
    //const id = 1;
    const username = request.body.username || "Raghu";
    const type = request.body.transactionType || "Credit";
    const description = request.body.description || 'Loading Money from CreditCard to Paytm';
    const amount = request.body.amount || 123.45;
    const accountFrom = request.body.accountFrom || "CreditCard";
    const accountTo = request.body.accountTo || "PayTm";
    const createdDate = request.body.createdDate || new Date();
    const date = new Date(request.body.date || new Date());
    db.run("INSERT INTO transactions (username, type, description, amount, accountFrom, accountTo, createdDate, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", `${username}`, `${type}`, `${description}`, `${amount}`, `${amountFrom}`, `${amountTo}`, `${createdDate}`, `${date}`);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
      res.json({ type: "createTransactions", result: "Failure", message: err.message });
    }
    res.json({type: "createTransactions", result: "Success", message: "Successfully Created transcation."});

  });

});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Expenses Application is Running on ${port}`);

module.exports = app;
