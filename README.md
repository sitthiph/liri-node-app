# LIRI-Node.js-Application
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.



**The goal of LIRI** is quite simple, by **reducing its user's self-navigating** and **automatically solve the problem at hand**. This will reduce the need for the user to manually do things themselves and save time. Great example is "movie-this". To look up the movie's information, users had to open up a browsers and use their choice of search engine to find what they're looking for. <u>With LIRI, you have no need to. Just type the name and it's there</u>.



The app is organized in 3 categories:

1. Command Prompt's start up.
2. HTTP Request via API.
3. Displaying and Logging data.



**To run the app**, simply launch liri.js with your Node.JS. There will be 3 component when running it.

First part of the prompt is the "Action". This is what LIRI will determine what to do with the next prompt data. The Second part of the prompt is the "Request". This part is what LIRI will use as a additional information to what the user want.

Ex with Git Bash:

```
node liri.js "Spotify-This-Song" "I want it that way"
```

Imported APIs and component:

* Axios
* Node's File System
* Spotify API
* Opensource Movie Database