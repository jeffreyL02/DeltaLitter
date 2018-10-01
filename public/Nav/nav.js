//Enables invisible camera button
window.scrollTo(0,1);
let camera = document.getElementById('camera');
let invisBtn = document.getElementById('invisBtn');

camera.addEventListener('click', function(){
  invisBtn.click();
});

//navigation portion
let search = document.getElementById("search");
let map = document.getElementById("map");
search.addEventListener('click', function(){
  window.location.href = "../Search/search.html";
})
map.addEventListener('click', function(){
  window.location.href = "../MapReal/map.html";
})

//Vision API
let reader = new FileReader();
let picture;

//Info needed for image recognition
let keyWords = ["plastic", "glass", "electronic", "bottle"];
let imgProfile = {
  type:"",
  recyclability:"",
  dumpLocation:"",
  reUseFactor:""
}
let counter = 0;
let largestScore = 0;

//necessary json for API
var img = {
  "requests": [
    {
      "image": {
        "content": ""
      },
      "features": [
        {
          "type": "LABEL_DETECTION"
        }
      ]
    }
  ]
};
let stringified;
let VisionInfo;
let VisionDesc = [];
let VisionScore = [];

  reader.addEventListener('load', function(){
    img.requests[0].image.content = btoa(reader.result);  //encodes the picture, puts in object img
    console.log(img);
    stringified = JSON.stringify(img);  //turns img into a string
    httpPostSync("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyChzwkDB5dABRGzGoUKQkSAzM5DCSVBhNw", stringified, function (text) {VisionInfo = JSON.parse(text); })
    console.log(VisionInfo);
    for(let i = 0; i < VisionInfo.responses[0].labelAnnotations.length; i++){
      VisionDesc.push(VisionInfo.responses[0].labelAnnotations[i].description);
      VisionScore.push(VisionInfo.responses[0].labelAnnotations[i].score);
    }
    for(let i = 0; i < keyWords.length;i++){
      counter = 0;
      while(counter < VisionDesc.length){
        if(VisionDesc[counter] == keyWords[i] && VisionScore[counter] > largestScore){
          imgProfile.type = keyWords[i];
          imgProfile.recyclability = true;
        }
        counter++;
      }
    }
    console.log(imgProfile);
  }, false);

    invisBtn.addEventListener('change', function(){
      invisBtn = document.getElementById("invisBtn");
      picture = invisBtn.files[0];  //reads image file
      console.log(picture);
      reader.readAsBinaryString(picture); //activates filerader to read image as binary string
    })


//HTTP requests function for API
function httpPostSync(theUrl, body, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("POST", theUrl, false); // false for synchronous
  xmlHttp.send(body);
}
