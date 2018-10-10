//autocomplete function
$( function(){
  //items array
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
  ];
  $( "#inputTrash" ).autocomplete({ //jquery autocomplete function lmao??
    source: trash
 });
});

var inputTrash = document.getElementById("inputTrash");
var searchBtn = document.getElementById("searchButton");

var title = document.getElementById("title");
var picture = document.getElementById("picture");

var generalInfo = document.getElementById("generalInfo");
var recycleInfo = document.getElementById("recyclableInfo");
var reuseInfo = document.getElementById("reuseInfo");

var infoTab = document.getElementById("infoTab");
var recycleTab = document.getElementById("recycleTab");
var reuseTab = document.getElementById("reuseTab");

var postPage = document.getElementById("postPage");
var searchPage = document.getElementById("searchPage");

//listen for search
searchBtn.addEventListener("click",function(){
  /*change what is displayed based on search
    so basically everything is the same page
    but text content is different lmao*/
  if(inputTrash.value.toLowerCase()=="plastic bottle"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
  }
  if(inputTrash.value.toLowerCase()=="aluminum can"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Aluminum Can";
    picture.src = "https://jlbrooks.co.uk/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/d/-/d-coke-can_4.jpg";
    generalInfo.textContent = "An aluminum is a container for packaging made primarily of aluminum. It is commonly used for foods and beverages such as milk and soup but also for products such as oil, chemicals, and other liquids. Global production is 180 billion annually and constitutes the biggest single use of aluminum globally.";
    recycleInfo.textContent = "Aluminum cans are recyclable.";
  }
  if(inputTrash.value.toLowerCase()=="battery"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Battery";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/61tm1h%2BYAsL._SL1500_.jpg";
    generalInfo.textContent = "An electric battery is a device consisting of one or more electrochemical cells with external connections provided to power electrical devices such as flashlights, smartphones, and electric cars.";
    recycleInfo.textContent = "Batteries are recyclable. Batteries contain a number of heavy metals and toxic chemicals and disposing of them by the same process as regular trash has raised concerns over soil contamination and water pollution.";
  }
  /*if(inputTrash.value=="Clothing"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Clothing";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/61tm1h%2BYAsL._SL1500_.jpg";
    generalInfo.textContent = "lorem ipsum";
    recycleInfo.textContent = "lorem ipsume";
    reuseInfo.textContent = "lorem ipsum";
  }*/
});

//collapse on click
infoTab.addEventListener('click',function changeVis(){
  let text = document.getElementById("infoText");
  if(text.style.display=="none") {
    text.style.display = "block";
  }
  else{
    text.style.display = "none";
  }
});
recycleTab.addEventListener('click',function changeVis(){
  let text = document.getElementById("recycleText");
  if(text.style.display=="none") {
    text.style.display = "block";
  }
  else{
    text.style.display = "none";
  }
});

let home = document.getElementById("homeBtn");
home.addEventListener('click', function(){
  window.location.href = "../Nav/nav.html";
})

