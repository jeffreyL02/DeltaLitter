//Enables invisible camera button
window.scrollTo(0,1);
let camera = document.getElementById('camera');
let invisBtn = document.getElementById('invisBtn');

camera.addEventListener('click', function(){
  invisBtn.click();
});

//navigation portion
let map = document.getElementById("map");
map.addEventListener('click', function(){
  window.location.href = "../MapReal/map.html";
})

//Vision API
let reader = new FileReader();
let picture;
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

  reader.addEventListener('load', function(){
    img.requests[0].image.content = btoa(reader.result);  //encodes the picture, puts in object img
    console.log(img);
    stringified = JSON.stringify(img);  //turns img into a string
    httpPostAsync("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyChzwkDB5dABRGzGoUKQkSAzM5DCSVBhNw", stringified, function (text) { console.log(text); })
  }, false);

    invisBtn.addEventListener('change', function(){
      invisBtn = document.getElementById("invisBtn");
      picture = invisBtn.files[0];
      console.log(picture);
      reader.readAsBinaryString(picture);
    })


//HTTP requests function for API
function httpPostAsync(theUrl, body, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("POST", theUrl, true); // true for asynchronous
  xmlHttp.send(body);
}
