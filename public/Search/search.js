$( function(){
  var trash = [
    "Plastic",
    "Electronics",
    "Toast",
    "Breadboard",
    "Leon",
    "Trash",
    "Chemistry",
    "Mr Leon",
    "Mystery Mix Lab",
    "The quick brown fox jumped over the lazy dog" //so you get something no matter what letter you type lmao
  ];
  $( "#inputTrash" ).autocomplete({ //jquery autocomplete function lmao??
    source: trash
 });
});

let home = document.getElementById("homeBtn");
home.addEventListener('click', function(){
  window.location.href = "../Nav/nav.html";
})
