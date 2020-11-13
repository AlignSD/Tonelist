let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
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

})

$(".collection").on("click", ".simrequest", function () {
  var clickedArtist = $(this).attr("data-name");
  console.log(clickedArtist);
  $("#bandNametitle").text(clickedArtist);
  $("#similarA").attr("data-artist-name", clickedArtist);

  let widgetMarkUp = `<script charset="utf-8" src="https://widget.bandsintown.com/main.min.js"></script><a id= "similarA" class="bit-widget-initializer" data-artist-name="${clickedArtist}" data-display-local-dates="false" data-display-past-dates="false" data-auto-style="false" data-text-color="white" data-link-color="#00B4B3" data-background-color="rgba(0,0,0,0)" data-display-limit="15" data-display-start-time="false" data-link-text-color="#FFFFFF" data-display-lineup="false" data-display-play-my-city="true" data-separator-color="rgba(124,124,124,0.25)"></a>`;

  $("#index-banner .container").append(widgetMarkUp);
});

$("#searchedBands").on('click', ".delete", function (event) {
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
     <li class="collection-item" data-name="${element}"><div>${element}<a href="#!" class="secondary-content simrequest" data-name="${element}"><i class="material-icons">date_range</i></a><a href="#!" class="secondary-content delete"><i class="material-icons">close</i></a></div></li>
    `  ;
  } $("#searchedBands").html(cardMarkUp);
}

