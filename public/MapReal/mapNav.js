let ham = document.getElementById("hamburger");
let hamMenu = document.getElementById("hamMenuBackground");
ham.addEventListener("click", function(){
  hamMenu.style.display = "block";
});

let exit = document.getElementById("exitMenu");
exit.addEventListener("click", function(){
  hamMenu.style.display = "none";
});

let createEvent = document.getElementById('createEvent');
createEvent.addEventListener('click', function(){
  eventModalBack.style.display = "block";
});

let exitMod = document.getElementById('exitMod');
exitMod.addEventListener('click', function(){
  eventModalBack.style.display = "none";
  hamMenu.style.display = "none";
});
