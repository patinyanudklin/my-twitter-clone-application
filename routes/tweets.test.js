const request = require('supertest')
const express = require('express')

const tweets = require('./tweets')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')
app.use('/tweets', tweets)

describe('Tweet Routes', function(){
	describe('GET /tweets/', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 OK', async function(done){
				const response = await request(app).get('/tweets/')
				expect(response.status).toBe(200)
				expect(response.text).toMatchSnapshot()
				done()
			})
		})
	})
	describe('GET /tweets/search', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 Found', async function(done){
				const response = await request(app).get('/tweets/search')
				expect(response.status).toBe(200)
				done()
			})
		})
	})
	describe('GET /tweets/new', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 OK', async function(done){
				const response = await request(app).get('/tweets/new')
				expect(response.status).toBe(200)
				expect(response.text).toMatchSnapshot()
				done()
			})
		})
	})
	describe('GET /tweets/:id', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 OK', async function(done){
				const response = await request(app).get('/tweets/1')
				expect(response.status).toBe(200)
				expect(response.text).toMatchSnapshot()
				done()
			})
		})
	})
	
})