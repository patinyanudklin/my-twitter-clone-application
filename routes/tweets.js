const express = require('express')
const bodyParser = require('body-parser')
//const compression = require('compression')
const methodOverride = require('method-override')
const curUser = require('./currentUser')
//const {connect, User, Tweet} = require('../models')
const { users, tweets} = require('../models')
const router = express.Router()
//connect()

//router.use(compression())
const urlencodedParser = bodyParser.urlencoded({extended: true})
const tweetsDB = require('./tweetsDatabase') 
router.use(methodOverride('_method'))
 
tweetsDB.initial()

const isCurUsersTweet = async function(tweetId){
	let curUserTweet = false
	await tweets.findOne({where:{id: tweetId}}).then(tweet=>{
		if(tweet.username == curUser.get()){
			curUserTweet = true
		}
	})
	return curUserTweet
}

/*********************ROUTE**********************/

router.get('/', async function(request, response){
	const {q} = request.query
	console.log(`GET/ query: ${q}`)
	let tweets = {}
	if(q){
		tweets = await tweetsDB.getTweetsBySearch(q)
	} else {
		tweets = await tweetsDB.getAllTweet()
	}
	response.render('tweets/tweetsList', {tweets})
}) 

router.get('/search', async function(request, response){
	const {q} = request.query
	console.log(`GET/search query: ${q}`)
	let tweets = {}
	if(q){
		tweets = await tweetsDB.getTweetsBySearch(q)
	} else {
		tweets = await tweetsDB.getAllTweet()
	}
	response.json({tweets: tweets})
})

/*router.post('/search', urlencodedParser, function(request, response){
	const {q} = request.body
	response.redirect(`/tweets?q=${q}`)
})*/

router.get('/new', function(request, response){
	response.render('tweets/newTweet')
})
router.post('/new', urlencodedParser, async function(request, response){
	const {tweet} = request.body
	console.log(`tw: ${tweet}`)
	await tweetsDB.create(curUser.username, tweet)
	// create new tweet then redirect
	response.redirect('/tweets')
})

router.get('/:id/edit', function(request, response){
	const {id} = request.params
	//console.log('id: '+id)
	response.render('tweets/editTweet', {id})
})

router.get('/:id', async function(request, response){
	// if the author of this tweet == curUser, go to edit.
	const {id} = request.params
	if(await isCurUsersTweet(id)){
		console.log(`${id} is ${curUser.username}'s tweet`)
		response.redirect(`/tweets/${id}/edit`)
	} else {
		//console.log(`${id} is NOT ${curUser.username}'s tweet`)
		let tweet = await tweetsDB.getTweetById(id)
		response.render('tweets/showTweet', {tweet})
	}
})

router.put('/:id', urlencodedParser, function(request, response){
	const {id} = request.params
	const {tweet} = request.body
	tweetsDB.update(curUser.username, id, tweet)
	response.redirect('/tweets')
})
router.delete('/:id', urlencodedParser, async function(request, response){
	const {id} = request.params
	await tweetsDB.delete(curUser.username, id)
	response.redirect('/tweets')
})

router.all('*', function(request, response){
	response.redirect('/tweets')
}) 

module.exports = router