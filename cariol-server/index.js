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
client = new MongoClient("mongodb+srv://doadmin:W6x9V4S5Lo3872KC@ledoannghilinh-9d081a9b.mongo.ondigitalocean.com/admin?tls=true&authSource=admin"); 
client.connect(); 
database = client.db("cariol");       
accountsCollection = database.collection("accounts"); 
app.get("/accounts",cors(),async (req,res)=>{    
    const result = await accountsCollection.find({}).toArray(); 
    res.send(result) 
    } 
    ) 