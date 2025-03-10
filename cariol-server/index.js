const express = require('express'); 
const app = express(); 
const port = 3002; 
const morgan=require("morgan") 
app.use(morgan("combined")) 
const bodyParser=require("body-parser") 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
const cors=require("cors"); 
app.use(cors()) 
app.listen(port,()=>{ 
console.log(`My Server listening on port ${port}`) 
}) 
app.get("/",(req,res)=>{ 
res.send("This Web server is processed for MongoDB") 
}) 
const { MongoClient, ObjectId } = require('mongodb'); 
client = new MongoClient("mongodb+srv://ngannh22411c:RqiRhKKhKcSUhEiX@group7.zpydo.mongodb.net/"); 
client.connect(); 
database = client.db("cariol");       
productsCollection = database.collection("products");
app.get("/products",cors(),async (req,res)=>{    
    const result = await productsCollection.find({}).toArray(); 
    res.send(result) 
    } 
    )
blogsCollection = database.collection("blogs");
app.get("blogs",cors(),async (req,res)=>{    
    const result = await blogsCollection.find({}).toArray(); 
    res.send(result) 
    } 
    )