const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

// initilaization
const app = express()

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'osama0000',
    database : 'Movies'
})


// middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))



// ROUTES
// create a movie review
app.post("/api", (req,res)=>{
    const data = req.body;
    const sql_query = "INSERT INTO movies_reviews (movie_name , movie_review) VALUES (?,?);"
    db.query(sql_query , [data.movieName , data.review], (err , result)=>{
        console.log(err || result);
    })
})

// get back with all movies reviews 
app.get("/api/get", (req,res)=>{
    const sql_query = "SELECT * FROM movies_reviews";
    db.query(sql_query , (err , result)=>{
        console.log(" result equal :" , result);
        res.send(result)
    })
})

// delete a movie 
app.delete("/api/delete", (req,res)=>{
    const index = req.body.id;
    const sql_query = "DELETE FROM movies_reviews WHERE id = ? ";
    db.query(sql_query ,[index] ,(err , result)=>{
        console.log(" result equal :" , err||result);
        res.send(result)
    })
    console.log(index);

})

app.put("/api/update", (req,res)=>{
    const index = req.body.id;
    const update = req.body.update;
    console.log(index , update);
    const sql_query = "UPDATE movies_reviews SET movie_review = ? WHERE id = ? ";
    db.query(sql_query ,[update , index] ,(err , result)=>{
        console.log(" result equal :" , err||result);
        res.send(result)
    })
    

})



app.listen(3001 , ()=>{
    console.log("running");
})



// const sql_query = "INSERT INTO movies_reviews (movie_name , movie_review) VALUES ('hitman' , 'good movie');"

/* const run_query = (query) =>{
    db.query(query || sql_query , (err , result)=>{
        console.log(err);
    })
}
run_query();
*/
