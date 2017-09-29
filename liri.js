let Twitter = require('twitter');
let spotify = require('spotify');
let userInput = process.argv[2];
let keys = require('./keys.js')

function myTweets() {
	let params = {
		'screen_name': 'NoahPerlmutter',
		'count': 20,
		//'exclude_replies': true,
	};
	let client = new Twitter({
		'consumer_key': keys.consumer_key,
		'consumer_secret': keys.consumer_secret,
		'access_token_key': keys.access_token_key,
		'access_token_secret': keys.access_token_secret,
	});

	

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for(i=0; i < params.count; i++) {
			if (!error) {
			console.log(tweets[i].text);
			} else {
			console.log(error);
			}
		}  
	});
}




switch(userInput) {
	case 'my-tweets':
		myTweets();
		break;

	case 'spotify-this-song':
		// function goes here
		break;

	case 'movie-this':
		// function goes here
		break;

	case 'do-what-it-says':
		// function goes here
		break;
}





// console.log(userInput);