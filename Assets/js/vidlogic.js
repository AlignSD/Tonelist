import {APIKey} from '../../config'

//ready's page upon load
$(document).ready(function () {
});

//function to set page upon load

setPage();

function setPage() {
   //pulls storage bands from local storage
  var storedBands = JSON.parse(localStorage.getItem("bands"));
  //checks if storage bands is null. If not, renders bandlist. If so, sets the key and then the array to empty in local storage
  if (storedBands !== null) {
    bands = storedBands;
    renderBandList();
  } else {
    localStorage.setItem("bands", "[]");
  }
}

//when a band is searched, push the value into local storage, clear the searched band and reder the list of bands
$('#bandSearchButton').on('click', function (event) {
  event.preventDefault();
  var bandStorage = $('#bandSearch').val().trim();
  bands.push(bandStorage);
  document.getElementById('bandSearch').value = '';
  renderBandList();
});

//when a band in the list has the "x" mark clicked, it will take the data attribute name, which should match the band name, and compare to the array, filtering it out
$("#searchedBands").on('click',".delete", function(event) {
  var target = $(event.target).closest(".collection-item").attr("data-name");
  bands = bands.filter(band => band !== target);
  renderBandList();
})

//renders bandlist

function renderBandList() {
  
  //pulls bands from local storage
  localStorage.setItem("bands", JSON.stringify(bands));
  //variable to storage template literal
  let cardMarkUp = "";

   //for loop to cycle through bands array, then put each item into various HTML elements in template literal
  for (let i = 0; i < bands.length; i++) {
    let element = bands[i];
    cardMarkUp +=
      `
  <li class="collection-item" data-name="${element}"><div>${element}<a href="#!" class="secondary-content simrequest" data-name="${element}"><i class="material-icons">music_video</i></a><a href="#!" class="secondary-content delete"><i class="material-icons">close</i></a></div></li>
    ` ;
    //adds template literal to html ID "searched bands"
  } $("#searchedBands").html(cardMarkUp);
};

//event listener to take clicked on band and send it through specific video API function
$(".collection").on("click", ".simrequest", function () {
  var clickedArtist = $(this).attr("data-name");
  console.log(this);
  $("#similarA").empty();
  specificArtistvideo(clickedArtist);
 
});

//function finds video based on artist clicked
function specificArtistvideo (clickedArtist) {
  
  //array of alphabet characters to help randomize search
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    //random letter from alphabet array
    alphaRandom = alphabet[Math.floor(Math.random() * alphabet.length)];


    
    //random number to randomize which response is used
    var randomNumber = Math.floor(Math.random()*5);

    //youtube api variable with variables defined to specify call
    var queryURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=5&q=" + clickedArtist + " music " + alphaRandom + "&type=video&key=" + APIKey;
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

//pull new random video on page load
newVideo();

function newVideo() {
  
  //takes random band from bands array

  var bandsRandom = bands[Math.floor(Math.random() * bands.length)];

  //array of alphabet characters to help randomize search
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  
  //random letter from alphabet array
  alphaRandom = alphabet[Math.floor(Math.random() * alphabet.length)];


  //random number to pull a random video
  var randomNumber = Math.floor(Math.random()*5);
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

    //changes attributes to make href youtube
    $("#carouselitem1").attr("src", videoPlay);
  });
}

//when next button is clicked it picks another random video
$("#nextButton").click(function() {
newVideo();
});