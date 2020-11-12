var cardMarkUp = "";
//var cardMarkUp2 = "";
var simAPic = "";
let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
let artistlist = document.querySelector("#artistList");
let similarA = document.querySelector("#similarA")
let bands = [];

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

$("#searchedBands").on('click',".collection-item", function(event) {
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
    <li class="collection-item avatar" data-name="${element}">
    <img src="" alt="" class="circle">
    <span class="title col 9">${element}</span>
    <a href="#!" >
    <i class="material-icons">call_split</i></a>
    <a href="#!" ><i class="material-icons">close</i></a>
  </li>
    ` ;
  } $("#searchedBands").html(cardMarkUp);
};
// toneLoad();

// function toneLoad () {

//   document.getElementById('artistList').value='';

//   for (let index = 0; index < bands.length; index++) {
//     element = bands[index];
//     console.log(element);
//     cardMarkUp +=

//     `
//       <a class="collection-item" data-name="${element}">${element}</a>
//     `
//   }
//   $("#artistList").html(cardMarkUp)
// }

$(".collection").on("click", ".collection-item", function () {
  var clickedArtist = $(this).attr("data-name");
  console.log(clickedArtist);
  $("#similarA").empty();
  similarAristsearch(clickedArtist);

});

$('#similarA').on('click', '.addButton', function () {
  var simA2add = $(this).attr("data-name");
  bands.push(simA2add);
  console.log(bands);
  renderBandList();
});

function similarAristsearch(clickedArtist) {


  var APIKey3 = "390492-tonelist-LIO11GZ3"
  var queryURL3 = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + clickedArtist + "&limit=5&verbose=1" + "&k=" + APIKey3;

  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function (response3) {
    console.log(response3);

    var similarArtists;
    var similarAteaser;
    var similarAwiki;
    var simAPic;
    var cardMarkUp2;

    for (let i = 0; i < response3.Similar.Results.length; i++) {
      
      similarArtists = response3.Similar.Results[i].Name;
      
      var queryURL5 = "https://rest.bandsintown.com/artists/" + similarArtists + "?app_id=codingbootcamp";
      $.ajax({
        url: queryURL5,
        method: "GET"
      }).then(function (response5) {
        similarArtists = response3.Similar.Results[i].Name;
        similarAteaser = (response3.Similar.Results[i].wTeaser);
        similarAwiki = (response3.Similar.Results[i].wUrl)

        simAPic = (response5.image_url);

        cardMarkUp2 =
        `
          <div class="card">
            <div class="card-image">
              <img src="${simAPic}">
                <span class="card-title">${similarArtists}</span>
                <a class="addButton btn-floating halfway-fab waves-effect waves-light red" data-name="${similarArtists}">
                <i class="material-icons">add</i>
                </a>
            </div>
            <div class="card-content black-text">
              <p>${similarAteaser}</p>
            </div>
          </div>
        `
        $("#similarA").append(cardMarkUp2);
      });


    };
  });
};
