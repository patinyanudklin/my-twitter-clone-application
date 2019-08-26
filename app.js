const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
//const curUser = require('./models/currentUser')
const curUser = require('./routes/currentUser')
const users = require('./routes/users')
const tweets = require('./routes/tweets')

const logStream = fs.createWriteStream(path.join(__dirname,
	`${process.env.NODE_ENV||'development'}.log`), {flags: 'a'})


app.set('views', './views')
app.set('view engine', 'pug')

app.use(compression())
app.use(morgan('default', {stream: logStream}))
app.use(express.static('public'))

app.use('/users', users)
app.use('/tweets', tweets)

// check is logged in, go to users / 
app.get('/', function(request, response){
	response.redirect('/users')
})

app.all('*', function(request, response){
	response.send('Error')
})

module.exports = app