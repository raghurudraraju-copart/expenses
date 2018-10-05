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

startDB();

app.get('/usersList', function(req, res, next) {

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
  startDB();
});

app.get('/paymentModes', function(req, res, next) {

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
  startDB();
});

app.get('/transcationsTypes', function(req, res, next) {

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
  startDB();
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
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT UNIQUE, firstName TEXT, lastName TEXT, password TEXT, role TEXT, createdDate TEXT )");
  db.run("CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, userName TEXT, description TEXT, accountFrom TEXT, accountTo TEXT, amount FLOAT, date TEXT, createdDate TEXT )");
  db.run("CREATE TABLE payments (id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, type TEXT, description TEXT, accountFrom TEXT, accountTo TEXT, amount FLOAT, date TEXT, createdDate TEXT )");
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


// * Adding expenses * //

/* GET users listing. */
app.get('/createTransactions', function(req, res, next) {

  db.serialize(() => {
    const id = 1;
    const username = "Raghu";
    const type = "Credit";
    const description = 'Loading Money from CreditCard to Paytm';
    const amount = 123.45;
    const amountFrom = "CreditCard";
    const amountTo = "PayTm";
    const createdDate = new Date();
    const date = new Date(123456789);
    db.run("INSERT INTO transactions (id, username, type, description, amount, accountFrom, accountTo, createdDate, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", `${id}`, `${username}`, `${type}`, `${description}`, `${amount}`, `${amountFrom}`, `${amountTo}`, `${createdDate}`, `${date}`);
    // db.each(`SELECT PlaylistId as id,
    //                 Name as name
    //          FROM playlists`, (err, row) => {
    db.each(`SELECT id, name FROM transactions`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    //console.log('Close the database connection.');
  });

});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Expenses Application is Running on ${port}`);

module.exports = app;
