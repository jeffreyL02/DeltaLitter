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
    "Light Bulb"
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
var errorPage = document.getElementById("errorPage");

//listen for search
searchBtn.addEventListener("click",function(){
  /*change what is displayed based on search
    so basically everything is the same page
    but text content is different lmao*/
  var input = inputTrash.value.toLowerCase();
  if(input=="plastic bottle"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
  }
  else if(input=="aluminum can"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Aluminum Can";
    picture.src = "https://jlbrooks.co.uk/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/d/-/d-coke-can_4.jpg";
    generalInfo.textContent = "An aluminum is a container for packaging made primarily of aluminum.";
    recycleInfo.textContent = "Aluminum cans are recyclable.";
  }
  else if(input=="battery"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Battery";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/61tm1h%2BYAsL._SL1500_.jpg";
    generalInfo.textContent = "An electric battery is a device consisting of one or more electrochemical cells to hold electricity.";
    recycleInfo.textContent = "Batteries are recyclable. Chemicals within them are advised to not be trashed.";
  }
  else if(input=="light bulb"||input=="lightbulb"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Light Bulb";
    picture.src = "https://cdn.connox.com/m/100030/215601/media/umage/Idea-Leuchtmittel/umage-Idea-LED-Leuchtmittel-E27-6-W-klar.jpg";
    generalInfo.textContent = "An incandescent light bulb is an electric light with a wire filament that when heated, glows.";
    recycleInfo.textContent = "Incandescent light bulbs are recylable. Common stores, such as Home Depot and Ikea, will accept used bulbs.";
  }
  else if(input=="clothing"||input=="shirt"||inputTrash=="clothes"||inputTrash.value.toLowerCase()=="textiles"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Clothing";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/91MR26Sa4zL._UL1500_.jpg";
    generalInfo.textContent = "Clothing (also known as clothes, apparel and attire) is a collective term for items worn on the body.";
    recycleInfo.textContent = "Used clothing is accepted in many locations such as Goodwill, H&M, and Green Tree.";
  }
  else if(input=="paper"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Paper";
    picture.src = "http://tmib.com/wp-content/uploads/2014/08/stack-of-paper.jpg";
    generalInfo.textContent = "Paper is a thin material produced by pressing together moist fibres of cellulose pulp and drying them.";
    recycleInfo.textContent = "Paper can be recycled and turned into other paper goods.";
  }
  else if(input=="chemicals"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Chemicals";
    picture.src = "https://www.euclidchemical.com/media/1224/admixtures-euclid-chemical.jpg";
    generalInfo.textContent = "A compound or substance that has been purified or prepared, especially artificially.";
    recycleInfo.textContent = "Chemicals must be brought to special chemical collection center to be thrown away.";
  }
  else if(input=="cell phone"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Cell Phone";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/618opfUobFL._SY550_.jpg";
    generalInfo.textContent = "A mobile phones a portable telephone that can make and receive calls over a radio frequency link.";
    recycleInfo.textContent = "Mobile phones are able to be recycled at the end of their life cycles.";
  }
  else if(input.length==0){
    //do nothing 
  }
  else{
    searchPage.style.display = "none";
    errorPage.style.display = "block";
  }
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

