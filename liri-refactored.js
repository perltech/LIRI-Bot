let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');
let fs = require('file-system');
let operation = process.argv[2];
let searchArg = process.argv[3];
let keys = require('./keys.js')


// MOVE Spotify keys to secret keys file

function myTweets() {
	let params = {
		'screen_name': 'NoahPerlmutter',
		'count': 20,
		//'exclude_replies': true,
	};
	let client = new Twitter({
		'consumer_key': keys.twitterKeys.consumer_key,
		'consumer_secret': keys.twitterKeys.consumer_secret,
		'access_token_key': keys.twitterKeys.access_token_key,
		'access_token_secret': keys.twitterKeys.access_token_secret,
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
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
		});

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
	});

}


function displayMovieInfo(movie) {
	console.log(`Title: ${movie.Title}`);
	console.log(`Year Released: ${movie.Year}`);
	console.log(`IMDB Rating (because that's as legit as it gets and no spammers): ${movie.Ratings[0].Value}`);
	console.log(`Rotten Tomatoes Rating (the legit one): ${movie.Ratings[1].Value}`);
	console.log(`Country of Release: ${movie.Country}`);
	console.log(`Language: ${movie.Language}`);
	console.log(`Plot Summary: ${movie.Plot}`);
	console.log(`Actors: ${movie.Actors}`);
}

function movieThis() {
	if(searchArg){
		request('http://www.omdbapi.com/?t=' + searchArg + '&apikey=40e9cece', function (error, response, body) {
			var json = JSON.parse(body);
			//console.log('error:', error);
			//console.log('statusCode:', response && response.statusCode);
			//console.log('body:', JSON.parse(body));

			// console.log(`Title: ${json.Title}`);
			// console.log(`Year Released: ${json.Year}`);
			// console.log(`IMDB Rating (because that's as legit as it gets and no spammers): ${json.Ratings[0].Value}`);
			// console.log(`Rotten Tomatoes Rating (the legit one): ${json.Ratings[1].Value}`);
			// console.log(`Country of Release: ${json.Country}`);
			// console.log(`Language: ${json.Language}`);
			// console.log(`Plot Summary: ${json.Plot}`);
			// console.log(`Actors: ${json.Actors}`);
			displayMovieInfo(json)
		});
	} else {
		request('http://www.omdbapi.com/?t=Mr.+Nobody&apikey=40e9cece', function (error, response, body) {
				var json = JSON.parse(body);
				//console.log('error:', error);
				//console.log('statusCode:', response && response.statusCode);
				//console.log('body:', JSON.parse(body));

				// console.log(`Title: ${json.Title}`);
				// console.log(`Year Released: ${json.Year}`);
				// console.log(`IMDB Rating (because that's as legit as it gets and no spammers): ${json.Ratings[0].Value}`);
				// console.log(`Rotten Tomatoes Rating (the legit one): ${json.Ratings[1].Value}`);
				// console.log(`Country of Release: ${json.Country}`);
				// console.log(`Language: ${json.Language}`);
				// console.log(`Plot Summary: ${json.Plot}`);
				// console.log(`Actors: ${json.Actors}`);
				displayMovieInfo(json);
		});
	}

}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {

	  if (error) {
	    return console.log(error);
	  }

	  //console.log(data);
	  let dataArr = data.split(",");
	 // console.log(dataArr);

	  operation = dataArr[0];
	  searchArg = dataArr[1];

	  //console.log(operation);
	  //console.log(searchArg);
	  spotifyThisSong();
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
		movieThis();
		break;

	case 'do-what-it-says':
		doWhatItSays();
		break;
}





// console.log(userInput);