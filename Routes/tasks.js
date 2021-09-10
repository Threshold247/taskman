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
	.get(async function(req, res) {
		console.log(req.method,req.originalUrl)
		try {
			const result = await pool.query("SELECT * FROM tasks");
			const data = await res.json(result.rows);
		
		}catch(error) {
			 console.log(error);
		}
})
	.post(async function (req,res) {
		console.log(req.method,req.originalUrl)
		try {
			const {description, day, reminder} =req.body;
			const addTaskQuery = "INSERT INTO tasks (description,day,reminder) VALUES ($1,$2,$3)";

			const result = await pool.query(addTaskQuery, [description,day,reminder]);
			const data = await res.json(result.rows);
		} catch(error) {
			console.log(error);
		}
})

router
    .route("/:id")
    .get(async function (req, res) {
  	 console.log(req.method,req.originalUrl)
  	    try {
			const {id} = req.params
			const query = "SELECT * FROM tasks WHERE id =$1";
			const result = await pool.query(query, [id]);
			const data = await res.json(result.rows)
			
		}catch(error){
			console.log(error);
		}	
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
