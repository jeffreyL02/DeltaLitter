let ham = document.getElementById("hamburger");
let hamMenu = document.getElementById("hamMenuBackground");
ham.addEventListener("click", function(){
  hamMenu.style.display = "block";
});

let exit = document.getElementById("exitMenu");
exit.addEventListener("click", function(){
  hamMenu.style.display = "none";
});
