let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let operation = process.argv[2];
let searchArg = process.argv[3];
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

function spotifyThisSong() {
	var spotify = new Spotify({
		id: '0e1c89782ee949b99cee411af77644fd',
		secret: '342b33f8f9284a428c7008d1b260646b'
		});
													// assign query to variable that targets user input
	spotify.search({ type: 'track', query: searchArg }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
			let songName = data.tracks.items[0].name;
			console.log(`Song Name: ${songName}`);

			let bandName = data.tracks.items[0].album.artists[0].name;
			console.log(`Band Name: ${bandName}`);

			let albumName = data.tracks.items[0].album.name;
			console.log(`Album Name: ${albumName}`);

			let url = data.tracks.items[0].external_urls.spotify;	
			console.log(`External Track URL: ${url}`);
			
			
			//JSON.stringify(data.tracks.items[0].album.artists[0].external_urls)
	});
}


switch(operation) {
	case 'my-tweets':
		myTweets();
		break;

	case 'spotify-this-song':
		spotifyThisSong();
		break;

	case 'movie-this':
		// function goes here
		break;

	case 'do-what-it-says':
		// function goes here
		break;
}





// console.log(userInput);