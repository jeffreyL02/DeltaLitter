const firebaseDB = firebase.database();
const firebaseAuth = firebase.auth();
let btnSignUp = document.getElementById("btnSignup");
let btnLogin = document.getElementById("btnLogin");
let ref = firebaseDB.ref("users");
let nameList = [];
ref.on('child_added', function(snapshot, prevChildKey){
    let currentName = snapshot.val();
    nameList.push(currentName.name);
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
    }
    else if(alreadyExists){
        alert("username already exists");
    }
    else{
        alert("passwords don't match");
    }
});

btnLogin.addEventListener("click", function(){
    let loginName = document.getElementById("loginName");
    let isHere = false;
    let logEmail;
    ref.on('child_added', function(snapshot, prevChildKey){
        let currentName = snapshot.val();
        if(currentName.name === loginName){
            isHere = true;
            logEmail = currentName.mail;
        }
    })
});