const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const path=require('path');


const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));




const db=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database:"movie-info"
})
db.connect((err)=>{
    if(err){
        console.log("Error connection",err);
    }
    else{
console.log("Connected to the database")
    }
})


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.get("/movie_bangla",(req,res)=>{
    const query="select * from movie_bangla";
    db.query(query,(err,results)=>{
        if(err){
            console.error("Error",err);
          res.status(500).send(err.message); 
        }
        else{
            res.json(results);
        }
    })
})
app.post("/addmovie",(req,res)=>{
    const {Movie_Name,Genre,Year,IMDb_Rating,Director_ID}=req.body;
    console.log("Received:", req.body); 
    const query="insert into movie_bangla (Movie_Name,Genre,Year,IMDb_Rating,Director_ID) values(?,?,?,?,?)";
    db.query(query,[Movie_Name,Genre,Year,IMDb_Rating,Director_ID],(err,results)=>{
        if(err){
            console.error("Error",err);
            res.status(500).send("Error");
        }
        else{
            res.send("Movie added successfully");
        }
    })
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT} `)
})