//autocomplete function
$( function(){
  //items array
  var trash = [
    "Plastic Bottle",
    "Cell Phone",
    "Battery",
    "Chemicals",
    "Textile",
    "Aluminum Can",
    "Lego",
    "Paper",
    "Light Bulb",
    "Glass",
    "Plastic Bag",
    "Foam",
    "Carton",
    "Wrapper",
    "Straw"
  ];
  $( "#inputTrash" ).autocomplete({ //jquery autocomplete function lmao??
    source: trash
 });
});

//every variable
//input and search
var inputTrash = document.getElementById("inputTrash");
var searchBtn = document.getElementById("searchButton");
//name of object and picture
var title = document.getElementById("title");
var picture = document.getElementById("picture");
//information
var generalInfo = document.getElementById("generalInfo");
var recycleInfo = document.getElementById("recyclableInfo");
//information title
var infoTab = document.getElementById("infoTab");
var recycleTab = document.getElementById("recycleTab");
//different pages
var postPage = document.getElementById("postPage");
var searchPage = document.getElementById("searchPage");
var errorPage = document.getElementById("errorPage");
var mapButton = document.getElementById("mapNav");

var home = document.getElementById("homeBtn");
var backArrow = document.getElementById("backArrow");

//listen for search
searchBtn.addEventListener("click",function search(){
  /*change what is displayed based on search
    so basically everything is the same page
    but text content is different lmao*/
  var input = inputTrash.value.toLowerCase();
  backArrow.style.display = 'block';
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
    recycleInfo.textContent = "Aluminum cans are recyclable in many basic recycling centers.";
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
  else if(input=="clothing"||input=="shirt"||input=="clothes"||input=="textiles"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Clothing";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/91MR26Sa4zL._UL1500_.jpg";
    generalInfo.textContent = "Clothing (also known as clothes, apparel and attire) is a collective term for items worn on the body.";
    recycleInfo.textContent = "Used clothing is accepted in many locations such as Goodwill, H&M, and Green Tree.";
  }
  else if(input=="paper"||input=="papers"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Paper";
    picture.src = "http://tmib.com/wp-content/uploads/2014/08/stack-of-paper.jpg";
    generalInfo.textContent = "Paper is a thin material produced by pressing together moist fibres of cellulose pulp and drying them.";
    recycleInfo.textContent = "Paper can be recycled and turned into other paper goods.";
  }
  else if(input=="chemicals"||input=="corrosive"||input=="chemical"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Chemicals";
    picture.src = "https://www.arozone.com/content/dam/aro/global/img/landing-page/chem-comp-guide/chemical-flasks.png";
    generalInfo.textContent = "A compound or substance that has been purified or prepared, especially artificially.";
    recycleInfo.textContent = "Chemicals are recyclable, but must be brought to a special chemical collection center to be recycled.";
  }
  else if(input=="cell phone"||input=="mobile phone"||input=="cellphone"||input=="mobile phone"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Cell Phone";
    picture.src = "https://images-na.ssl-images-amazon.com/images/I/618opfUobFL._SY550_.jpg";
    generalInfo.textContent = "A mobile phones a portable telephone that can make and receive calls over a radio frequency link.";
    recycleInfo.textContent = "Mobile phones are able to be recycled at the end of their life cycles.";
  }
  else if(input=="glass"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Glass";
    picture.src = "https://www.azom.com/images/news/NewsImage_46880.jpg";
    generalInfo.textContent = "Glass is a non-crystalline amorphous solid that is often transparent and has widespread practical, technological, and decorative usage.";
    recycleInfo.textContent = "Glass is recyclable, but must be brought to a special glass collection center to be recycled.";
  }
  else if(input=="lego"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Lego";
    picture.src = "https://d1902livswy8rb.cloudfront.net/dimg/670x670/dimg/xl_29189294-lego-brick-piles-resize.jpg";
    generalInfo.textContent = "Lego is a line of plastic construction toys that are very popular among children.";
    recycleInfo.textContent = "Lego can be recycled under any recycling centers that accept plastic.";
  }
  else if(input=="plastic bag"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Plastic Bag";
    picture.src = "https://5.imimg.com/data5/ON/VU/MY-3526621/plastic-bag-500x500.jpg";
    generalInfo.textContent = "A plastic bag is a type of container made of thin, flexible, plastic film, nonwoven fabric, or plastic textile.";
    recycleInfo.textContent = "Plastic bags can be reused to carry items or can be recycled at common places like Walmart.";
  }
  else if(input=="foam"||input=="styrofoam"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Foam";
    picture.src = "https://www.joann.com/on/demandware.static/-/Sites-joann-product-catalog/default/dw5f30dd4c/images/hi-res/11/11178126.jpg";
    generalInfo.textContent = "Foam is a substance formed by trapping pockets of gas in a liquid or solid.";
    recycleInfo.textContent = "Foam must be brought to foam recycling centers to be recycled.";
  }
  else if(input=="carton"||input=="cartons"||input=="cardboard"||input=="cardboard box"||input=="box"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Carton";
    picture.src = "https://kemelcartons.com/wp-content/uploads/2017/10/moving-cartons-new-600x600.jpg";
    generalInfo.textContent = "A carton is a box or container usually made of paperboard and sometimes of corrugated fiberboard.";
    recycleInfo.textContent = "Cartons can be emptied and placed into the house trash bins.";
  }
  else if(input=="wrapper"||input=="wrappers"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Wrapper";
    picture.src = "https://s3.amazonaws.com/tc-global-prod/uploaded_images/us/images/1434/original/clifbar-mainimage.jpg";
    generalInfo.textContent = "A wrapper is a piece of paper, plastic, or foil covering and protecting something sold.";
    recycleInfo.textContent = "Wrappers are not accepted at recycling centers, but can be upcycled or you can contact Terracycle to recycle them.";
    mapButton.style.display = "none";
  }
  else if(input=="straw"||input=="straws"){
    searchPage.style.display = 'none';
    postPage.style.display = 'block';
    title.textContent = "Straw";
    picture.src = "https://previews.123rf.com/images/koya79/koya791211/koya79121100137/16597888-drinking-straw-isolated-on-white.jpg";
    generalInfo.textContent = "A drinking straw or drinking tube is a small pipe that allows its user to more conveniently consume a beverage.";
    recycleInfo.textContent = "Technically, plastic straws are recyclable but are not accepted in recycling centers due to their small size.";
    mapButton.style.display = "none";
  }
  else if(input.length==0){
    //do nothing 
  }
  else{
    searchPage.style.display = "none";
    postPage.style.display = "none";
    errorPage.style.display = "block";
  }
});

function checkSubmit(e) {
  if(e && e.keyCode == 13) {
     search();
  }
}

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

mapNav.addEventListener('click',function(){
  window.location.href = "../MapReal/map.html";
});

home.addEventListener('click', function(){
  window.location.href = "../Nav/nav.html";
});

backArrow.addEventListener('click',function(){
  postPage.style.display="none";
  errorPage.style.display="none";
  searchPage.style.display="block";
  backArrow.style.display='none';
});

