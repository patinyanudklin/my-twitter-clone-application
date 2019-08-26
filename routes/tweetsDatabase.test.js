//const request = require('supertest')
const express = require('express')
const tweetDB = require('./tweetsDatabase')
//const pets = require('./pets')
/*
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')
app.use('/tweets', tweetDB)
*/

describe('Tweet Database Test', function(){
	describe('Create/Edit/Delete tweet', function(){
		describe('When create new/edit/delete tweet correctly', function(){
			it('The tweet should be added/updated/gone from the database', async function(done){
				
				const testAcct = 'Automated_Test001'
				const testMsg = 'This is the test message from  Automated_Test001' 
				await tweetDB.create( testAcct, testMsg)
				let result = await tweetDB.getTweetsBySearch(testMsg)

				// Test create
				expect(result['Automated_Test001'][0].tweet).not.toBeUndefined()
				expect(result['Automated_Test001'][0].tweet).toBe(testMsg)
				
				// Test Delete
				await tweetDB.delete('', result['Automated_Test001'][0].id)
				result = await tweetDB.getTweetsBySearch(testMsg)				
				expect(result['Automated_Test001']).toBeUndefined()
				done()
			})
		})
	})
	describe('Search Tweets by Id/Keyword', function(){
		describe('When search by Id', function(){
			it('The id of acquired tweet should be the same as we asked for', async function(){
				const author = 'patinya'
				const queryId = 1
				const result = await tweetDB.getTweetById(queryId)

				expect(result[author][0]).not.toBeUndefined()
				expect(result[author][0].id).not.toBeUndefined()
				expect(result[author][0].id).toBe(queryId)
			})
		})
		describe('When search by Keyword', function(){
			it('The acquired tweet should contained keyword', async function(){
				const author = 'patinya'
				const queryKeyword = 'Team 8'
				const result = await tweetDB.getTweetsBySearch(queryKeyword)

				expect(result[author][0]).not.toBeUndefined()
				expect(result[author][0].tweet).not.toBeUndefined()
				expect(result[author][0].tweet).toMatch(/Team 8/)
			})
		})
	})
})