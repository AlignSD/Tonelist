var toneList = ["Queen", "Led Zeppelin", "David Bowie", "Pink Floyd"];
var cardMarkUp = "";
var cardMarkUp2 = "";

toneLoad();
function toneLoad () {
  
  $("#artistList").empty();

  for (let index = 0; index < toneList.length; index++) {
    element = toneList[index];
    console.log(element);
    cardMarkUp +=
    <li class="collection-item avatar">
        <img src="images/yuna.jpg" alt="" class="circle">
        <span class="title">Title</span>
        <p>First Line <br>
             Second Line
      </p>
    
    `
      <a class="collection-item" data-name="${element}">${element}</a>
    `
  }
  $("#artistList").html(cardMarkUp)
}

$(".collection-item").on("click",function() {
  $("#similarA").empty();
  var clickedArtist = $(this).attr("data-name");
  console.log(clickedArtist);
  similarAristsearch(clickedArtist);
  
});

$("#addButton").on("click",function() {
  
  var simA2add = $(this).attr("data-name");
  toneList.push(simA2add);
  console.log(toneList);
  $("#artistList").empty()
  toneLoad();
  
  // working
  // toneList.push("Yaz");
  // console.log(toneList);
  
  
  // console.log(toneList);
  
});

function similarAristsearch (clickedArtist) {
    var APIKey3 = "390492-tonelist-LIO11GZ3"
    var queryURL3 =  "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q="+ clickedArtist + "&limit=5&verbose=1" + "&k=" + APIKey3;

    $.ajax({
      url:queryURL3,
      method:"GET"
    }).then(function(response3){
      console.log(response3);

      var similarArtists;
      var similarAteaser;
      var similarAwiki;
      var simAPic;

      for (let i = 0; i < response3.Similar.Results.length; i++) {
        similarArtists = response3.Similar.Results[i].Name;
        similarAteaser = (response3.Similar.Results[i].wTeaser);
        similarAwiki = (response3.Similar.Results[i].wUrl)


        var queryURL5 = "https://rest.bandsintown.com/artists/" + similarArtists + "?app_id=codingbootcamp";
        $.ajax({
        url:queryURL5,
        method:"GET"
        }).then(function(response5){
         
          simAPic = (response5.thumb_url);
          console.log(simAPic);

        });

        cardMarkUp2 +=
        `
        <div class="card">
          <div class="card-image">
            <img src="${simAPic}">
              <span class="card-title">${similarArtists}</span>
              <a id="addButton" class="btn-floating halfway-fab waves-effect waves-light red" data-name="Yaz"><i class="material-icons">add</i></a>
              </div>
          <div class="card-content black-text">
          <p>${similarAteaser}</p>
          </div>
        </div>
        `
      }
     ;
  $("#similarA").html(cardMarkUp2);
});

}