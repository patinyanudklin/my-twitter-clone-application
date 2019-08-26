const request = require('supertest')
const express = require('express')

const users = require('./users')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')
app.use('/users', users)

describe('User Routes', function(){
	describe('GET /users/login', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 OK', async function(done){
				const response = await request(app).get('/users/login')
				expect(response.status).toBe(200)
				done()
			})
		})
	})
	describe('GET /users/sign_up', function(){
		describe('when request success', function(){
			it('should return HTTP Status 200 Found', async function(done){
				const response = await request(app).get('/users/sign_up')
				expect(response.status).toBe(200)
				done()
			})
		})
	})
})