$( function(){
  var trash = [
    "Plastic Bottle",
    "Cell Phone",
    "Battery",
    "Chemicals",
    "Clothing",
    "Aluminum Can",
    "Lego",
    "Paper",
    "Plastic Wrap",
    "The quick brown fox jumped over the lazy dog" //so you get something no matter what letter you type lmao
  ];
  $( "#inputTrash" ).autocomplete({ //jquery autocomplete function lmao??
    source: trash
 });
});

var inputTrash = document.getElementById("inputTrash");
var searchBtn = document.getElementById("searchButton");
var bottlePage = document.getElementById("postPage");
var searchPage = document.getElementById("searchPage");

searchButton.addEventListener("click",function(){
  if(inputTrash.value ==  "Plastic Bottle"){
    searchPage.style.display = 'none';
    bottlePage.style.display = 'block';
  }
});

let home = document.getElementById("homeBtn");
home.addEventListener('click', function(){
  window.location.href = "../Nav/nav.html";
})
