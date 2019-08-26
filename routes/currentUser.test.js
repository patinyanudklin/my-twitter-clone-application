const currentUser = require('./currentUser')

describe('CurrentUser Test', function(){
	describe('Set/Get current user', function(){
		describe('If set and get the current user', function(){
			it('The current user should contained and gave a correct value', async function(){
				const testUsername = 'patinyanudklin'
				currentUser.set(testUsername)
				expect(currentUser.username).toBe(testUsername)
				expect(currentUser.get()).toBe(testUsername)
			})
		})
	})
})