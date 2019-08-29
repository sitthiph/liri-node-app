//Node.js dependency.
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

// Get the two prompt from commandline.
const action = process.argv[2];
const request = process.argv[3];
// Use to add to log.txt
let logging = '';

run(action, request);

function run(action, request) {
    switch (action) {
        case "spotify-this-song":
            // Via promise
            spotify
                .search({ type: 'track', query: request })
                .then(function(response) {
                    spotifyFormatting(response);
                })
                .catch(function(err) {
                    console.log(err);
                });
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            fs.readFile("command.txt", "utf8", function (error, data) {
                if (error)
                    return console.log(error);
                let dataArr = data.split(",");
                let comAction = dataArr[0];
                let comRequest = dataArr[1];
                run(comAction, comRequest);
            });
            break;
    }
}

function movieThis() {
    axios.get("http://www.omdbapi.com/?t="+ request +"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            omdbFormatting(response.data);
        })
        .catch(function(error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request)
                console.log(error.request);
            else
                console.log("Error", error.message);
            console.log(error.config);
        });
}

function log(log) {
    let date = new Date();
    logging += `[${date.toTimeString()}]: ${log}`;
    fs.appendFile("log.txt", logging, function(err) {
        if (err)
            console.log(err);
    });
}

function spotifyFormatting(response) {
    let input = response.tracks.items[0];
    let artists = input.artists[0].name;
    let trackName = input.name;
    let link = input.external_urls.spotify;
    let album = response.tracks.items[0].album.name;
    for(let i = 1; i < input.album.artists.length; i++) {
        artists += `, ${input.album.artists[i].name}`;
    }
    console.log(`\t- Artist(s): ${artists}\n\t- The song's name: ${trackName}\n\t- A preview link of the song from Spotify: ${link}\n\t- The album that the song is from: ${album}`);
    log(`- Artist(s): ${artists} - The song's name: ${trackName} - A preview link of the song from Spotify: ${link} - The album that the song is from: ${album}`);
}

function omdbFormatting(data) {
    let name = data.Title;
    let year = data.Year;
    let imdbRating = data.imdbRating;
    let tomatoRating = data.Ratings[2].Value;
    let country = data.Country;
    let lang = data.Language;
    let desc = data.Plot;
    let actor = data.Actors;
    console.log(`\t- Title of the movie: ${name}\n\t- Year the movie came out: ${year}
    \t- IMDB Rating of the movie: ${imdbRating}\n\t- Rotten Tomatoes Rating of the movie: ${tomatoRating}
    \t- Country where the movie was produced: ${country}\n\t- Language of the movie: ${lang}\n\t- Plot of the movie: ${desc}\n\t- Actors in the movie: ${actor}`);
    log(`- Title of the movie: ${name} - Year the movie came out: ${year} - IMDB Rating of the movie: ${imdbRating} - Rotten Tomatoes Rating of the movie: ${tomatoRating} - Country where the movie was produced: ${country} - Language of the movie: ${lang} - Plot of the movie: ${desc} - Actors in the movie: ${actor}`);
}