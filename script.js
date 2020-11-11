let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
let bands = [];

$( document ).ready(function() {
  console.log( "ready!" );
});
setPage();
function setPage() {
  var storedBands = JSON.parse(localStorage.getItem("bands"));
  console.log(storedBands);

  if(storedBands !== null) {
    bands = storedBands;
    renderBandList();
  } else {
    localStorage.setItem("bands", "[]");
  }
}


$('#bandSearchButton').on('click',function(event) {
  event.preventDefault();
  var bandStorage = $('#bandSearch').val().trim();
  bands.push(bandStorage);
  localStorage.setItem("bands", JSON.stringify(bands));
  document.getElementById('bandSearch').value='';;
  renderBandList();



})
 function renderBandList() {
   let cardMarkUp = "";

  for (let i = 0; i < bands.length; i++) {
    let element = bands[i];
    cardMarkUp += 
    `
    <li class="collection-item avatar">
    <img src="images/yuna.jpg" alt="" class="circle">
    <span class="title">${element}</span>
    <p>First Line <br>
       Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
    ` ;
  } $("#searchedBands").html(cardMarkUp);
 } 

 