var twitterKeysPage = require("./keys.js");
//console.log(twitterKeysPage);
var task = process.argv[2];


switch(task) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    console.log("you have selected spotify");
    break;
  case "movie-this":
    console.log("movies movies movies");
    break;
  case "nasty-beats":
    console.log("Boots and cats and boots and cats and boots and cats and boots and cats");
    break;
};

function getTweets(){
  console.log("you have selected my tweets");
    var params = {screen_name: 'jeffshap1'};
    twitterKeysPage.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        console.log(tweets);
      }
    });
};

/*var params = {screen_name: 'jeffshap1'};
twitterKeysPage.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});*/