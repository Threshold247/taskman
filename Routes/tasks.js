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
		console.log(req.method,req.originalUrl)
		pool
		.query("SELECT * FROM tasks")
		.then((result) => res.json(result.rows))
		.catch((error) => console.log(error));

})
	.post(function (req,res) {
		console.log(req.method,req.originalUrl)
		const {description, day, reminder} =req.body;
		const addTaskQuery = "INSERT INTO tasks (description,day,reminder) VALUES ($1,$2,$3)";

		pool
			.query(addTaskQuery, [description,day,reminder])
			.then((result) => res.send("Task Added"))
			.catch((error) => console.log(error));

})

router
    .route("/:id")
    .get(function (req, res) {
  	 console.log(req.method,req.originalUrl)
  	    const {id} = req.params
  	    const query = "SELECT * FROM tasks WHERE id =$1";
        pool
			.query(query, [id])
			.then((result) => res.json(result.rows))
			.catch((error) => console.log(error));
})

	.delete(function (req,res) {
	 console.log(req.method,req.originalUrl)
		const {id} =req.params
		const deleteTaskQuery = "DELETE FROM tasks WHERE id =$1";

		pool
			.query(deleteTaskQuery, [id])
			.then((result) => res.send("Task Deleted"))
			.catch((error)=>console.log(error));
})

module.exports = router;
