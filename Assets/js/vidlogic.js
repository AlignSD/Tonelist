var toneList = ["Queen", "Led Zeppelin", "David Bowie", "Pink Floyd"];

newVideo();

function newVideo() {
  
  var tonelistRandom = toneList[Math.floor(Math.random() * toneList.length)];
  console.log(tonelistRandom);
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    alphaRandom = alphabet[Math.floor(Math.random() * alphabet.length)];
    console.log(alphaRandom);
    var APIKey = "AIzaSyDijGkYfBA0SGFZt9yWG70joV9ToxFWMC4";
    var randomNumber = Math.floor(Math.random()*5);
        console.log(randomNumber);
    // Here we are building the URL we need to query the database
    var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=5&q=" + tonelistRandom + " music " + alphaRandom + "&type=video&key=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        console.log(response);
        var videoName = (response.items[randomNumber].snippet.title)
        var videoPlay = ("https://www.youtube.com/embed/" + (response.items[randomNumber].id.videoId))

    // // Transfer content to HTML
    $("#videoName").html("<h1>" + videoName + "</h1>");
    console.log(videoPlay);

    $("#carouselitem1").attr("src", videoPlay);
  });
}
      
$("#nextButton").click(function() {
newVideo();
});