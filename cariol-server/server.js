if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

const indexRouter = require('./src/routes/index')
const Router = require('./src/routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    dbname: process.env.DATABASE_NAME,
})

const db = mongoose.connection

db.on('error', error => console.error("Lỗi rồi : " + error))
db.once('open',() => console.log('Connected to Mongoose'))

app.use(express.json())

app.use('/', indexRouter)

app.use('/api', cors(), Router)

app.listen(process.env.PORT || 3000)