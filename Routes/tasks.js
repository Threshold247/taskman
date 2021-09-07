const { query } = require("express");
const express = require("express");
let router = express.Router();
const app = express();
const { Pool } = require("pg");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool({});

router
  .route("/")
  .get(function (req, res) {
    console.log(req.originalUrl)
    pool.query("SELECT * FROM tasks", (error, result) => {
      res.json(result.rows);
    })
})

  router
    .route("/:id")
    .get('/tasks/:id', function(req, res) {
  	   console.log(req.originalUrl)
  	    const {id} = req.params
  	    const query = `SELECT * FROM tasks WHERE id =${id}`
        pool.query(query, (error, result) => {
          res.json(result.rows);
    })
})


module.exports = router;
