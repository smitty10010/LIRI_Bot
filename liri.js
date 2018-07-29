//establish all the variables
require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var fs = require('fs');
var keys = require("./keys");
var twitterKeys = keys.twitter;
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

//large if statement to see the first argument
if (process.argv[2] === "spotify-this-song") {
    //looks for what the 3rd argument is
    if (process.argv[3]) {
        spotify.search({
            type: 'track',
            query: process.argv.slice(3).join(" "),
            limit: '20'
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //iterator that will show the first 20 results
            for (i = 0; i < data.tracks.items.length; i++) {
                console.log("\n=================\nArtist(s): " +
                    data.tracks.items[i].artists[0].name + "\nSong Title: " + data.tracks.items[i].name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\nAlbum: " + data.tracks.items[i].album.name);
            }
        });
    }
    //else it will look up a given song
    else {
        spotify.search({
            type: 'track',
            query: 'The Sign',
            limit: '20'
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (i = 0; i < data.tracks.items.length; i++) {
                console.log("\n=================\nArtist(s): " +
                    data.tracks.items[i].artists[0].name + "\nSong Title: " + data.tracks.items[i].name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\nAlbum: " + data.tracks.items[i].album.name);
            }
        });
    }
}
//if statment for the tweets function
else if (process.argv[2] === "my-tweets") {

    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    var params = {
        screen_name: 'nodejs'
    };
    client.get('search/tweets', {
        q: "smitty47081494",
        count: '20'
    }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("My recent 20 tweets: ");
            for (i = 0; i < tweets.statuses.length; i++)
                console.log(tweets.statuses[i].text);
        }
    });
}
//if statmenet for movies
else if (process.argv[2] === "movie-this") {
    if (process.argv[3]) {
        var movieTitle = process.argv.slice(3).join("+");
        // We then run the request module on a URL with a JSON
        request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {

                // Then we print out the response
                var response = JSON.parse(body);
                console.log("Movie Title: " + response.Title + "\nRelease Year: " + response.Year + "\nIMDB Rating: " + response.imdbRating + "\nRotten Tomatoes Rating: " + response.Ratings[1].Value + "\nCountry produced in: " + response.Country + "\nLanguage: " + response.Language + "\nPlot: " + response.Plot + "\nActors: " + response.Actors);
            }
        });
    }
    //if no movie is provided then it will look up mr nobody instead
    else {
        request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {

                // Then we print out the response
                var response = JSON.parse(body);
                console.log("Movie Title: " + response.Title + "\nRelease Year: " + response.Year + "\nIMDB Rating: " + response.imdbRating + "\nRotten Tomatoes Rating: " + response.Ratings[1].Value + "\nCountry produced in: " + response.Country + "\nLanguage: " + response.Language + "\nPlot: " + response.Plot + "\nActors: " + response.Actors);
            }
        });
    }
}
//if statement for reading file
else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
}