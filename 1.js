// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydatabase'
};
const conn = mysql.createConnection(config);
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Check if user already exists
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      if (result.length > 0) {
        res.status(400).send('User already exists!');
      } else {
        // Insert new user into database
        const sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
        conn.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(200).send({ success: true });
          }
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
