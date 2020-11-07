let bandSearch = document.querySelector("#bandSearch");
let bandSearchButton = document.querySelector("#bandSearchButton");
let bands = [];

renderLastRegistered();

// function displayMessage() {
// }

function renderLastRegistered() {
  var lastBands = localStorage.getItem("bands")
  

  // Fill in code here to retrieve the last email and password.
  // If they are null, return early from this function
  if (!lastBands) {
    alert("Please Fill out fields")
    return false;
  } 
  // Else set the text of the userEmailSpan and userPasswordSpan 
    // else (bandSearch.textContent = lastBands);
  // to the corresponding values form local storage
  
}
bandSearchButton.addEventListener("click", function(event) {
  event.preventDefault();
    var bands = document.querySelector("#bandSearch").value;
  
  localStorage.setItem("bands", bands);
  
  renderLastRegistered();   
  }

);