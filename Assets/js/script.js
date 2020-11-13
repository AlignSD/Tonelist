// vars for html elements

let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
//array to hold tonelist band
let bands = [];

//ready's page upon load
$(document).ready(function () {
});

//function to set page upon load
setPage();

// sets local storage for sidenav
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

})

//when a band in the list has the calendar mark clicked, it will take the data attribute name and sent it through the bands in town widget
$(".collection").on("click", ".simrequest", function () {

  //variable define data-name based on what was clicked
  var clickedArtist = $(this).attr("data-name");

  $("#bandNametitle").empty();
  $(".bit-widget-container").remove();

  //adds clicked article to title name
  $("#bandNametitle").text(clickedArtist);

  //adds attribute based on what was clicked
  $("#similarA").attr("data-artist-name", clickedArtist);

  //sets the template literal w/ variables
  let widgetMarkUp = `<script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script><a id= "similarA" class="bit-widget-initializer" data-artist-name="${clickedArtist}" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="white" data-link-color="#00B4B3" data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>`;

  //add widget to page
  $("#index-banner .container").append(widgetMarkUp);
});

//when a band in the list has the "x" mark clicked, it will take the data attribute name, which should match the band name, and compare to the array, filtering it out
$("#searchedBands").on('click', ".delete", function (event) {
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
     <li class="collection-item" data-name="${element}"><div>${element}<a href="#!" class="secondary-content simrequest" data-name="${element}"><i class="material-icons">date_range</i></a><a href="#!" class="secondary-content delete"><i class="material-icons">close</i></a></div></li>
    `  ;
    //adds template literal to html ID "searched bands"
  } $("#searchedBands").html(cardMarkUp);
}

