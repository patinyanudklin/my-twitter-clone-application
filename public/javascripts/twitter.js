$(function(){
	var card = function(author, tweet){
		return `
		<a href=/tweets/`+ tweet.id +` id="list">
			<div class="box" style="border-radius: 0px;">
	  			<strong> `+ author +` </strong>
	  			<small style="padding-left:10px;"> `+ tweet.createdAt +` </small>
	  			<div> `+ tweet.tweet +` </div>
			</div>
		</a>`
	}
	var input = $('[name="q"]')
	
	$('#search-box form').on('submit', function(event){
		var url = 'https://puppop.herokuapp.com/tweets/search'
		//var url = 'http://localhost:3000/tweets/search'
		var list = $('#list')
		var q = input.val()
		if(q) url = url + '?q=' + q
		event.preventDefault()
		$.ajax({
			url: url,
			success: function(data){
				list.empty()
				var tweetsList = data.tweets
				for(var author in tweetsList){
					for(var index in tweetsList[author]){
						list.append(card(author, tweetsList[author][index]))
					}
				}
			}
		})
	})

})