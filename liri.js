debugger;
var twitterKeysPage = require("./keys.js");
var spotifyQuery = require('spotify');
var request = require('request');
var fs = require('fs');
var task = process.argv[2];
var fourthItem = process.argv[3];

function initializer(){
  switch(task) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSpotifyQuery();
      break;
    case "movie-this":
      getMovie();
      break;
    case "do-what-it-says":
      txtFile();
      break;
    case "nasty-beats":
      console.log("Boots and cats and boots and cats and boots and cats and boots and cats");
      console.log("http://www.virtualdrumming.com/drums/windows/hip-hop-drum-kits.html")
      break;
    default:
      console.log("Please enter a valid command! Liri understands my-tweets, spotify-this-song 'song title', movie-this 'movie title', and do-what-it-says.")
  };
};

function getTweets(){
    var params = {screen_name: 'jeffshap1'};
    twitterKeysPage.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        console.log("Here are your last 20 tweets:");
        for (var i = 0; i < 20; i++) {
          console.log((i+1)+". "+tweets[i].text);
          var twitterTweets = {
            userTweets: tweets[i].text
          };
          fs.appendFile("./log.txt"," " + twitterTweets.userTweets + " " + task + " ", "utf8", function(err){
            if (err) {
              console.log(err);
            } else if (!err) {
              console.log(twitterTweets.userTweets);
              console.log(task);
            };
          });
        };
      } else if (error) {
        console.log(error);
      };
    });
};

function getSpotifyQuery(){
  if (fourthItem === undefined) {
      fourthItem = "what's my age again";
      console.log(fourthItem);
  }; 
  spotifyQuery.search({ type: 'track', query: fourthItem }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {
      console.log("Are any of these songs what you are looking for?");
      console.log("");
      for (var i = 0; i < data.tracks.items.length; i++) {
        console.log("Song: " +data.tracks.items[i].name);
        console.log("Artist: " +data.tracks.items[i].artists[0].name);
        console.log("Album: "+data.tracks.items[i].album.name);
        console.log("Link: "+data.tracks.items[i].href);
        console.log("");
        var songInfo = {
          song: data.tracks.items[i].name,
          artist: data.tracks.items[i].artists[0].name,
          album: data.tracks.items[i].album.name,
          link: data.tracks.items[i].href
        };
        fs.appendFile("./log.txt", " " + songInfo.song + " " + songInfo.artist + " " + songInfo.album + " " + songInfo.link + " " + " " + task + " " + fourthItem + " ", "utf8", function(err){
          if (err) {
            console.log(err);
          } else if (!err) {
            console.log(songInfo);
            console.log(task);
          };
        });
        };
      };
    });
  };

function getMovie(){
  if (fourthItem === undefined) {
    fourthItem = "Mr. Nobody";
  };
  request('http://www.omdbapi.com/?t='+fourthItem+'&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    console.log("Title: "+body.Title);
    console.log("Year: "+body.Year);
    console.log("imdb Rating: "+body.imdbRating);
    console.log("Country: "+body.Country);
    console.log("Language: "+body.Language);
    console.log("Plot: "+body.Plot);
    console.log("Actors: "+body.Actors);
    console.log("RottenTomatoes Rating: "+body.tomatoRating);
    console.log("RottenTomatoes Link: "+body.tomatoURL);
    console.log("");
    var movieInfo = {
      title: body.Title,
      year: body.Year,
      imdbRating: body.imdbRating,
      country: body.Country,
      language: body.Language,
      plot: body.Plot,
      actors: body.Actors,
      rottentomatoesrating: body.tomatoRating,
      rottentomatoeslink: body.tomatoURL
    };
    fs.appendFile("./log.txt", " " + movieInfo.title + " " + movieInfo.year + " " + movieInfo.imdbRating + " " + movieInfo.country + " " + movieInfo.language + " " + movieInfo.plot + " " + movieInfo.actors + " " + movieInfo.rottentomatoesrating + " " + movieInfo.rottentomatoeslink + " " + task, "utf8",function(err){
      if (err) {
        console.log(err);
      } else if (!err) {
        console.log(movieInfo);
        console.log(task);
      };
    });
  };
  });
};

function txtFile(){
  fs.readFile("./random.txt", "utf8", function(err, data){
    if (err) {
      throw err;
    } else if (!err) {
      dataSplit = data.split(",");
      task = dataSplit[0];
      fourthItem = dataSplit[1];
      initializer();
    };
  });
};

initializer();