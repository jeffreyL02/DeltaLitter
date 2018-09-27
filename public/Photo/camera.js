const database = firebase.database();
var ref = database.ref("pictures");
var camera = document.getElementById("camera");
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(){
  var data{
    pic: camera.value();
  }
  ref.push(data);
});
