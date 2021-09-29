const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const tasks = require('./Routes/tasks.js');
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
			}
  });

app.get('/', function(req,res) {
	res.send('Welcome');
 })
app.use('/tasks',tasks);


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("server running", PORT);
});
