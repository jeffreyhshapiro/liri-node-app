var twitterKeysPage = require("./keys.js");
var spotifyQuery = require('spotify');
var task = process.argv[2];
var song = process.argv[3];


switch(task) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    console.log("you have selected spotify");
    getSpotifyQuery();
    break;
  case "movie-this":
    console.log("movies movies movies");
    break;
  case "nasty-beats":
    console.log("Boots and cats and boots and cats and boots and cats and boots and cats");
    break;
};

function getTweets(){
    var params = {screen_name: 'jeffshap1'};
    twitterKeysPage.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        console.log("Here are your last 20 tweets:");
        for (var i = 0; i < 20; i++) {
          console.log((i+1)+". "+tweets[i].text);
        };
      } else if (error) {
        console.log(error);
      }
    });
};

function getSpotifyQuery(){
  spotifyQuery.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else if (!err) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        //console.log(data.tracks.items[i]);
        console.log(data.tracks.items.album[i].name);
        //console.log(data.tracks.items.artists.name[i]);
      };
      //artist
      //song name
      //album
      //preview of link of song

      //default whats my age again
    };
  });
};