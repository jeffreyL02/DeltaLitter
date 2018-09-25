let reuseTab = document.getElementById("reuseTab");
let infoTab = document.getElementById("infoTab");
let recycleTab = document.getElementById("recycleTab");
let reuseText = document.getElementById("reusabilityText");
let infoText = document.getElementById("infoText");
let recycleText = document.getElementById("recycleText");
reuseText.style.display="block";
infoText.style.display="block";
recycleText.style.display="block";
//reuseTab.addEventListener('click', changeVis(reuseText));
reuseTab.addEventListener('click',function changeVis(){
  let text = document.getElementById("reusabilityText");
  if(text.style.display=="none") {
    text.style.display = "block";
  }
  else{
    text.style.display = "none";
  }
});
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
/*function changeVis(x){
  if(x.style.display=="none") {
    x.style.display = "block";
  }
  else{
    x.style.display = "none";
  }
}*/
