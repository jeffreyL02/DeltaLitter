/*
Dont touch this kyle dang
*/
let radius = document.getElementById("radius");
let value = document.getElementById("value");
value.innerHTML = radius.value;

radius.oninput = function() {
  value.innerHTML = this.value;
}
/*
Dont touch this kyle dang
*/
let num=0;
let markers=[
  {
    coordinate:{lat:36.7783+0.5,lng:-119.4179+0.5},
  }
];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  //geocode variable to reverse geocode
  let geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  //get current location
  document.getElementById('submit').addEventListener('click', function() {
    currentPosition();
    geocodeLatLng(geocoder, map, infowindow);
  });
  for(let i=0;i<markers.length;i++){
    addMarker(markers[i]);
  }
  function addMarker(properties){ //passing in properties object
    let marker=new google.maps.Marker({
      position:properties.coordinate, //coordinates passed in
      map:map, //set the map you want this to set to
    });
    //Setting custom image for marker
    if(properties.iconImage){ //checks if the iconImage property inside properties is not undefined
      marker.setIcon(properties.iconImage); //set the marker to the custom icon
    }
    //check content for Marker
    if(properties.content){
      //info tab
      let infoWindow = new google.maps.InfoWindow({ //will not work without the infoWindow event listener
        content: properties.content
      })
      marker.addListener('click',function(){ //callback function
        infoWindow.open(map, marker); //pass in map and marker variables
      });
    }
  }
  function currentPosition(){
    num++;
    console.log("running current Position"+num);
    var currentPosition;
    //get current location if permission given
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude=position.coords.latitude;
        let longitude=position.coords.longitude;
        currentPosition={
          coordinate:{lat:latitude,lng:longitude},
          content:'<h1> current location </h1>'
        }
        markers.push(currentPosition);
        console.log(markers.length);
      });
    }
    else{ //error handling if permission is not given
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
}
function geocodeLatLng(geocoder, map, infowindow) {
  let latData=markers[markers.length-1].coordinate.lat;
  let longData=markers[markers.length-1].coordinate.lng;
  var latlng = {lat: latData, lng: longData};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) { //since there's a lot of choices for address results, we chose the first one
        map.setZoom(11);
        var marker = new google.maps.Marker({ //creates a marker at specified location
          position: latlng,
          map: map
        });
        infowindow.setContent("Address: "+results[0].formatted_address); //info window for the marker will contain the first formatted address
        infowindow.open(map, marker); //automatically opens the info window. However, usually you can add event listener for a click to open the window.
      }
      else {
        window.alert('No results found');
      }
    }
    else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
