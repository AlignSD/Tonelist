var toneList = ["Queen", "Led Zeppelin", "David Bowie", "Pink Floyd"];
var tonelistRandom = toneList[Math.floor(Math.random() * toneList.length)];
console.log(tonelistRandom);
var APIKey = "AIzaSyDijGkYfBA0SGFZt9yWG70joV9ToxFWMC4";
// Here we are building the URL we need to query the database
var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=5&q=" + tonelistRandom + "&type=video&key=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    console.log(response);
    var randomNumber = Math.floor(Math.random()*5);
    console.log(randomNumber);
    var videoName = (response.items[randomNumber].snippet.title)
    var videoPlay = ("https://www.youtube.com/embed/" + (response.items[randomNumber].id.videoId))


    // // Transfer content to HTML
    $("#videoName").html("<h1>" + videoName + "</h1>");
    console.log(videoPlay);

    $("#carouselitem1").attr("src", videoPlay);

  });