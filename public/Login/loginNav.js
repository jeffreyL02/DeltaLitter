let login = document.getElementById('loginPg');
let loginBtn = document.getElementById('loginBtn');
let signup = document.getElementById('signupPg');
let signupBtn = document.getElementById('signupBtn');
let land = document.getElementById('land');
let backArrow = document.getElementById("backArrow");

loginBtn.addEventListener('click', function(){
  land.style.display = 'none';
  login.style.display = 'block';
  backArrow.style.display = 'block';
});

signupBtn.addEventListener('click', function(){
  land.style.display = 'none';
  signup.style.display = 'block';
  backArrow.style.display = 'block';
});

backArrow.addEventListener('click', function(){
  land.style.display = 'block';
  signup.style.display = 'none';
  login.style.display = 'none';
  backArrow.style.display = 'none';
});
