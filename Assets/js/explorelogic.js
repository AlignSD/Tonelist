//vars for template literals and strings 

var cardMarkUp = "";
var simAPic = "";

// vars for html elements
let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
let artistlist = document.querySelector("#artistList");
let similarA = document.querySelector("#similarA")

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
  <li class="collection-item" data-name="${element}"><div>${element}<a href="#!" class="secondary-content simrequest" data-name="${element}"><i class="material-icons">call_split</i></a><a href="#!" class="secondary-content delete"><i class="material-icons">close</i></a></div></li>
    ` ;
    //adds template literal to html ID "searched bands"
  } $("#searchedBands").html(cardMarkUp);
};

//event listener to take clicked on band and send it through similar artist API function
$(".collection").on("click", ".simrequest", function () {
  var clickedArtist = $(this).attr("data-name");
  $("#similarA").empty();
  similarAristsearch(clickedArtist);
 
});

//adds similar artists to the bands array when the red "+" button is clicked
$('#similarA').on('click', '.addButton', function () {
  var simA2add = $(this).attr("data-name");
  bands.push(simA2add);
  renderBandList();
});

//function to generate the similar artist list
function similarAristsearch(clickedArtist) {

  //calls "taste dive" api

  var APIKey3 = "390492-tonelist-LIO11GZ3"
  var queryURL3 = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + clickedArtist + "&limit=5&verbose=1" + "&k=" + APIKey3;

  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function (response3) {

    //variables of responses to be stored

    var similarArtists;
    var similarAteaser;
    var similarAwiki;
    var simAPic;
    var cardMarkUp2;

    for (let i = 0; i < response3.Similar.Results.length; i++) {
      
      //defines similar artist before the bandsintown api call 
      similarArtists = response3.Similar.Results[i].Name;
      
      //call to bands in town to get the similar artist pic using the similiar artist array
      var queryURL5 = "https://rest.bandsintown.com/artists/" + similarArtists + "?app_id=codingbootcamp";
      $.ajax({
        url: queryURL5,
        method: "GET"
      }).then(function (response5) {

        //values from similar artists API call stored to variables
        similarArtists = response3.Similar.Results[i].Name;
        similarAteaser = (response3.Similar.Results[i].wTeaser);
        similarAwiki = (response3.Similar.Results[i].wUrl)
        //images from bands in town API call stored to 
        simAPic = (response5.image_url);
        
        //template literal definition with variables from both API calls inserted
        cardMarkUp2 =
        `
          <div class="card">
            <div class="card-image">
              <img src="${simAPic}">
                <span class="card-title teal lighten-2">${similarArtists}</span>
                <a class="addButton btn-floating halfway-fab waves-effect waves-light red" data-name="${similarArtists}">
                <i class="material-icons">add</i>
                </a>
            </div>
            <div class="card-content black-text left-align">
              <p>Wikipedia excerpt: "${similarAteaser}</p>
            </div>
            <div class="card-action">
                <a class="red-text" href="${similarAwiki}">Full Wikipedia Article</a>
              </div>
          </div>
        `
        //add template literal to html
        $("#similarA").append(cardMarkUp2);
      });


    };
  });
};
