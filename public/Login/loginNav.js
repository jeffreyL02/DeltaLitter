const FIREBASE_DATABASE = firebase.database();
const FIREBASE_AUTH = firebase.auth();

let login = document.getElementById('loginPg');
let loginBtn = document.getElementById('loginBtn');
let signup = document.getElementById('signupPg');
let signupBtn = document.getElementById('signupBtn');
let land = document.getElementById('land');
let loginBtnAction = document.getElementById('btn_action_login');
let SignUpBtnAction = document.getElementById("btn_action_signUp");

loginBtn.addEventListener('click', function(){
  land.style.display = 'none';
  login.style.display = 'block';
});
signupBtn.addEventListener('click', function(){
  land.style.display = 'none';
  signup.style.display = 'block';
});
loginBtnAction.addEventListener('click', function(){
  let txtUsername = document.getElementById('logName');
  let txtPassword = document.getElementById('logPass');
  let username = txtUsername.value();
  let pw = txtPassword.value();
  const promise = FIREBASE_AUTH.signInWithCustomToken(username, pw)
    .then(function (user) {

    })
      
});
SignUpBtnAction.addEventListener('click', function(){
  let SignName = document.getElementById('signName').value;
  let Signpw = document.getElementById('signPass').value;
  let ReSignpw = document.getElementById('signRePass').value;
  if(Signpw === ReSignpw){
    let userObj = {
      name: SignName,
      password: Signpw
    };
    
  }
})
