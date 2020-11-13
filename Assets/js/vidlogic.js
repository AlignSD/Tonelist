// var toneList = ["Queen", "Led Zeppelin", "David Bowie", "Pink Floyd"];

$(document).ready(function () {
  console.log("ready!");
});

setPage();

function setPage() {
  var storedBands = JSON.parse(localStorage.getItem("bands"));
  console.log(storedBands);

  if (storedBands !== null) {
    bands = storedBands;
    renderBandList();
  } else {
    localStorage.setItem("bands", "[]");
  }
}

$('#bandSearchButton').on('click', function (event) {
  event.preventDefault();
  var bandStorage = $('#bandSearch').val().trim();
  bands.push(bandStorage);
  document.getElementById('bandSearch').value = '';
  renderBandList();
});

$("#searchedBands").on('click',".delete", function(event) {
  var target = $(event.target).closest(".collection-item").attr("data-name");

  console.log("target: ", target)
  //get the band list
  bands = bands.filter(band => band !== target);
  renderBandList();
})

function renderBandList() {
  localStorage.setItem("bands", JSON.stringify(bands));
  let cardMarkUp = "";

  for (let i = 0; i < bands.length; i++) {
    let element = bands[i];
    cardMarkUp +=
      `
  <li class="collection-item" data-name="${element}"><div>${element}<a href="#!" class="secondary-content simrequest" data-name="${element}"><i class="material-icons">music_video</i></a><a href="#!" class="secondary-content delete"><i class="material-icons">close</i></a></div></li>
    ` ;
  } $("#searchedBands").html(cardMarkUp);
};

newVideo();

function newVideo() {
  
  var bandsRandom = bands[Math.floor(Math.random() * bands.length)];
  console.log(bandsRandom);
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    alphaRandom = alphabet[Math.floor(Math.random() * alphabet.length)];
    console.log(alphaRandom);
    var APIKey = "AIzaSyB9tAAyJN9_4lUe9OIbT98WOhWO3iomap0";
    var randomNumber = Math.floor(Math.random()*5);
        console.log(randomNumber);
    // Here we are building the URL we need to query the database
    var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=5&q=" + bandsRandom + " music " + alphaRandom + "&type=video&key=" + APIKey;
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