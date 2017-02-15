'use strict';

const { Database } = require('sqlite3').verbose();
// Can pass callback to Database method for error handling
const db = new Database(':memory:', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Database connected!')
  }
});

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
    });
});

// Can also error handle on db.close
db.close((error) => {
  if (error) {
    console.log(error);
  } else {
  console.log('Database closed.');
  };
});
