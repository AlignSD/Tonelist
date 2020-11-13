let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
let bands = [];

// document ready function
$( document ).ready(function() {
  console.log( "ready!" );
});
setPage();

// sets local storage for sidenav
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

// store what user inputs in local storage and save it when enter is pressed
$('#bandSearchButton').on('click',function(event) {
  event.preventDefault();
  var bandStorage = $('#bandSearch').val().trim();
  bands.push(bandStorage);
  localStorage.setItem("bands", JSON.stringify(bands));
// <<<<<<< patBranch
//   document.getElementById('bandSearch').value='';;
// =======
//   $('#bandSearch').empty();
//   document.getElementById('bandSearch').value='';
// >>>>>>> main
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

 