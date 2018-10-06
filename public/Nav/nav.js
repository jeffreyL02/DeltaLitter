/*
if(document.getElementById('picture').offsetHeight < document.getElementById('picture').offsetWidth){
  document.getElementById('picture').setAttribute('style','transform:rotate(90deg)');
}
keith put this in ur code when you pull the image into the html
*/

//Enables invisible camera button
window.scrollTo(0,1);
let camera = document.getElementById('camera');
let invisBtn = document.getElementById('invisBtn');

camera.addEventListener('click', function(){
  invisBtn.click();
});

//navigation portion
let homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener('click', function(){
  document.getElementById("postPage").style.display = "none";
  document.getElementById("navPage").style.display = "block";
  homeBtn.style.display = "none";
}) 
let search = document.getElementById("search");
let map = document.getElementById("map");
search.addEventListener('click', function(){
  window.location.href = "../Search/search.html";
})
map.addEventListener('click', function(){
  window.location.href = "../MapReal/map.html";
});
//Vision API
let reader = new FileReader();
let picture;

//Info needed for image recognition
let keyWords = ["plastic", "glass", "electronic", "plastic", "aluminum"];
let primaryTrash = ["bottle", "battery", "can"];
let waterBottleGenInfo = "The plastic bottle is generally made of plastic and is used by people to drink water.";
let batteryGenInfo = "Batteries work through electric currents to power certain items.";
let sodaCanGenInfo = "Soda cans are generally made of aluminum and contain soda for humans to consume.";
let GenInfoList = [waterBottleGenInfo, batteryGenInfo, sodaCanGenInfo];
let imgProfile = {
  name:"",
  type:"",
  recyclability:"",
  dumpLocation:"",
  reUseFactor:""
}
console.log(imgProfile);
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
let postPic = document.getElementById("picture");
let context;
let currentLength;

  reader.addEventListener('load', function(){
    imgProfile = {
      type: "Unknown Material",
      name: "Unable to identify",
      genInfo: "There is currently no info on this item.",
      recyclability: "Unable to be recycled.",
      dumpLocation: "",
      reUseFactor: ""
    }
    img.requests[0].image.content = btoa(reader.result);  //encodes the picture, puts in object img
    console.log(img);
    stringified = JSON.stringify(img);  //turns img into a string
    currentLength = VisionDesc.length;
    for (let i = 0; i <= currentLength; i++) {
      VisionDesc.pop();
      VisionScore.pop();
    }
    httpPostSync("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyChzwkDB5dABRGzGoUKQkSAzM5DCSVBhNw", stringified, function (text) {VisionInfo = JSON.parse(text); })
    console.log(VisionInfo);
    //pushes all elements of json info into custom arrays
    for(let i = 0; i < VisionInfo.responses[0].labelAnnotations.length; i++){
      VisionDesc.push(VisionInfo.responses[0].labelAnnotations[i].description);
      VisionScore.push(VisionInfo.responses[0].labelAnnotations[i].score);
    }
    determineRecyclability();
    console.log(imgProfile);
    createPostPage();
  }, false);

    invisBtn.addEventListener('change', function(){
      invisBtn = document.getElementById("invisBtn");
      picture = invisBtn.files[0];  //reads image file
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


//elements to fill in for post page
let genInfo = document.getElementById("generalInfo");
let recycleInfo = document.getElementById("recyclableInfo");
let reuseInfo = document.getElementById("reuseInfo");
let title = document.getElementById("title");

function createPostPage(){
  imgProfile.name = VisionDesc[0];
  console.log(determineGenfInfo());
  imgProfile.genInfo = GenInfoList[determineGenfInfo()];
  postPic.src = window.URL.createObjectURL(picture);
  title.innerHTML = imgProfile.name;
  genInfo.innerHTML = imgProfile.genInfo;
  recycleInfo.innerHTML = imgProfile.recyclability;
  document.getElementById("postPage").style.display = "block";
  document.getElementById("navPage").style.display = "none";
  homeBtn.style.display = "block";
}

let trashCount = 0;
let handledDesc = "";
function determineGenfInfo(){
  for(let i = 0; i < VisionDesc.length; i++){
    for(let j = 0; j < primaryTrash.length; j++){
      while(trashCount < primaryTrash.length){
        handledDesc =  VisionDesc[i].slice(VisionDesc[i].search(primaryTrash[trashCount]), VisionDesc[i].length);
        if(handledDesc == primaryTrash[j]){
          return j;
        }
        trashCount++;
      }
      trashCount = 0;
    }
  }
}

let reCounter = 0;
function determineRecyclability(){
  for (let i = 0; i < keyWords.length; i++) {
    counter = 0;
    while (counter < VisionDesc.length) {
        while(reCounter < keyWords.length){
          if (VisionDesc[counter].slice(VisionDesc[counter].search(keyWords[reCounter]), keyWords[reCounter].length) == keyWords[i]) {
            imgProfile.type = keyWords[i];
            imgProfile.recyclability = "Able to be recycled.";
          }
          reCounter++;
        }
      counter++;
      reCounter = 0;
    }
  }
}