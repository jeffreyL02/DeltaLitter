var camera = document.getElementById("camera");
camera.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('/upload/' + file.name);
  var task = storageRef.put(file);
});
task.on('stage_changed',
  function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploader.value = percentage;
  },
  function error(err) {

  },
  function complete() {

  }
);
if(document.getElementById("form1").files.length == 0 ){
  console.log("no files selected");
}
else{
  document.getElementById("form1").submit();
}
