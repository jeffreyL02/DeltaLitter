window.scrollTo(0,1);
const firebaseDB = firebase.database();
const firebaseAuth = firebase.auth();
let btnSignUp = document.getElementById("btnSignup");
let btnLogin = document.getElementById("btnLogin");
let ref = firebaseDB.ref("users");
let land2 = document.getElementById('land');
let signup2 = document.getElementById('signupPg');
let nameList = [];
let mailList = [];
ref.on('child_added', function(snapshot, prevChildKey){
    let currentName = snapshot.val();
    nameList.push(currentName.name);
    mailList.push(currentName.mail);
})

btnSignUp.addEventListener('click', function(){
    let pw = document.getElementById("signPass").value;
    let repw = document.getElementById("signRePass").value;
    let username = document.getElementById("signName").value;
    let alreadyExists = false;
    for(let i = 0; i < nameList.length; i++){
        if(username == nameList[i]){
            alreadyExists = true;
        }
    }

    if(pw === repw && !(alreadyExists)){
        let email = document.getElementById("signMail").value;
        let userObj = {
            name: username,
            mail: email
        };
        const promise = firebaseAuth.createUserWithEmailAndPassword(email, pw).then(function(user) {
            firebaseDB.ref('users/' + user.uid).set(userObj).then(
                function() {
                    console.log('User data successfully stored')
                }).catch(function(error) {
                    console.log(error);
                });
            });
            promise.catch(e => alert(e.message));
            promise.then(function(){
                signup2.style.display = 'none';
                land2.style.display = 'block';
            })
    }
    else if(alreadyExists){
        alert("username already exists");
    }
    else{
        alert("passwords don't match");
    }
});

btnLogin.addEventListener("click", function(){
    let loginName = document.getElementById("logName").value;
    let logpw = document.getElementById("logPass").value;
    let logMail;
    let nameNotThere = true;
    for(let i = 0; i < nameList.length; i++){
        if(loginName == nameList[i]){
            logMail = mailList[i];
            nameNotThere = false;
        }
    }
    if(nameNotThere){
        alert("Not a account");
    }
    else{
        const PROMISE = firebaseAuth.signInWithEmailAndPassword(logMail, logpw)
        .then(function () {
            window.location.href = "../Nav/nav.html";
        }).catch(e => {
            console.log(e.message);
        });;
    }
});
