let twitter = require('twitter');
let spotify = require('spotify');
let userInput = process.argv[2];
let keys = require('./keys.js')

function myTweets() {
	// client.get('statuses/user_timeline', // URL for my twitter account w/ API goes here)
 //  .then(function (tweet) {
 //    console.log(tweet);
 //  })
 //  .catch(function (error) {
 //    throw error;
 //  })

// twttr.widgets.createTimeline(
//   {
//     sourceType: "list",
//     ownerScreenName: "TwitterDev",
//     slug: "national-parks"
//   },
//  console.log(this.sourceType);
// );

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