module.exports = {
	username : '',
	set: function(username){
		this.username = username
		console.log('Set current user as: '+ username)
	},
	get: function(){
		return this.username
	}
}