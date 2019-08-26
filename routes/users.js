const express = require('express')
const bodyParser = require('body-parser')
//const compression = require('compression')
const curUser = require('./currentUser')
//const helper = require('../models/helper')
const helper = require('../routes/helper')
//const {connect, User, Tweet} = require('../models')
const { users, tweets} = require('../models')
const router = express.Router()

const urlencodedParser = bodyParser.urlencoded({extended: true})
//router.use(compression())

const fallbackUrl = '/users/login'
//connect()

router.get('/login', function(request, response){

	response.render('users/login')
})

router.get('/sign_up', urlencodedParser, async function(request, response){
	response.render('users/signup')
})

router.post('/session', urlencodedParser,async function(request, response){
	// get username from response.body
	const {username, password} = request.body

	const user = await users.findOne({where:{username:username}, raw:true})
	console.log(user) 
	if(user == null ){
		response.send(`'${username}' doesn't existed!`)
	}

	if(user.password != password){
		response.send(`Incorrect password!`)
	}
	else if(user.username == username && user.password == password){
		curUser.set(username)
		response.redirect('/tweets')
	}else{
		response.send('Error')
	}
})

router.get('/', function(request, response){
	response.redirect(fallbackUrl)
})
router.post('/', urlencodedParser, async function(request, response){
	const {username, password} = request.body
	let isExisted = false
	const user = await users.findOrCreate({where:{username:username}, defaults: {password: password}})
	.then(([user, created]) => {
		console.log(user.get({plain: true}))
		console.log(created)
		isExisted = created
	})

	if(isExisted == false){
		response.send(`'${username}' is already existed!`)
	} else {
		response.redirect(fallbackUrl)
	}
})
router.all('*', function(request, response){
	response.redirect(fallbackUrl)
})

module.exports = router