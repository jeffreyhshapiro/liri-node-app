var twitterKeysPage = require("./keys.js");
var spotifyQuery = require('spotify');
var request = require('request');
var task = process.argv[2];
var fourthItem = process.argv[3];


switch(task) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    getSpotifyQuery();
    break;
  case "movie-this":
    console.log("movies movies movies");
    getMovie();
    break;
  case "nasty-beats":
    console.log("Boots and cats and boots and cats and boots and cats and boots and cats");
    console.log("http://www.virtualdrumming.com/drums/windows/hip-hop-drum-kits.html")
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
  if (fourthItem = "undefined") {
      fourthItem = "what's my age again"
    }; 
  spotifyQuery.search({ type: 'track', query: fourthItem }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else if (!err) {
      console.log("Are any of these songs what you are looking for?");
      console.log("");
      for (var i = 0; i < data.tracks.items.length; i++) {
        console.log("Song: " +data.tracks.items[i].name);
        console.log("Artist: " +data.tracks.items[i].artists[0].name);
        console.log("Album: "+data.tracks.items[i].album.name);
        console.log("Link: "+data.tracks.items[i].href);
        console.log("");
        };
      };
    });
  };

function getMovie(){
  request('http://www.omdbapi.com/?t='+fourthItem+'&y=&plot=short&r=json', function (error, response, body) {
  if (fourthItem === 'undefined') {
    fourthItem = "Mr. Nobody";
  } else if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    console.log("Title: "+body.Title);
    console.log("Year: "+body.Year);
    console.log("imdb Rating: "+body.imdbRating);
    console.log("Country: "+body.Country);
    console.log("Language: "+body.Language);
    console.log("Plot: "+body.Plot);
    console.log("Actors: "+body.Actors);
  };
  });
};