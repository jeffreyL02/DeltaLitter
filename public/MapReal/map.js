window.scrollTo(0,1);
let radius = document.getElementById("radius");
let value = document.getElementById("value");
value.innerHTML = radius.value;

radius.oninput = function() {
  value.innerHTML = this.value;
}

let markers=[];
let map;
let center;
let infowindow;
let request;
let keySearch;

function initMap() {
    //by default, ask permission for current location to center map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center
    });
      //get current location if permission given
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        console.log('dum');
          let latitude=position.coords.latitude;
          console.log("this is user's current latitude: "+latitude);
          let longitude=position.coords.longitude;
          console.log("this is user's current longitude: "+longitude);
          center={
            lat: latitude,
            lng: longitude
          }
          // set map center
          map.setCenter(center);
          map.setZoom(12);
          var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
          //displays a marker for user's current location on map
          var userLocationMarker = new google.maps.Marker({
          position: center,
          map: map,
          title: 'Hello World!',
          icon:image
          });

          //infoWindow for the user's current location marker
          var infowindow = new google.maps.InfoWindow({
            content: 'THIS IS YOUR CURRENT LOCATION'
          });
          //add an infowindow to show user's currrent location. Opens automatically
          infowindow.open(map, userLocationMarker);
      }) //end of get user's position function

      } else{ //error handling if permission is not given
      //center for map is set to default coordinates if permission not given
      console.log("Location permission not given ");
      center={
        lat: 34.0434944,
        lng: -117.95333120000001
      }
      map.setCenter(center);
      map.setZoom(12);
      handleLocationError(false, infoWindow, map.getCenter());
    }


    document.getElementById('recyclables').addEventListener('click', function() {
      console.log("center coords for recylables");
      console.log(center);
      let userRadius=getMapRadius(); //contains radius specified by slider
      if(center==null){ //if permission was not given when prompted for geolocation
        centerNull();
      }
      let keySearch="recyling center";
      console.log("marker radius " +userRadius);
      request={
        location: center,
        radius: `${userRadius}`, //distance in meters from the center of the map, using the radius specified by user in meters
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });

    document.getElementById('ewaste').addEventListener('click', function() {
      if(center==null){ //if permission was not given when prompted for geolocation
        centerNull();
      }
      let keySearch="e waste recycling";
      request={
        location: center,
        radius: '8047', //distance in meters from the center of the map
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });

    document.getElementById('chemicals').addEventListener('click', function() {
      if(center==null){ //if permission was not given when prompted for geolocation
        centerNull();
      }
      let keySearch="chemical reycling";
      request={
        location: center,
        radius: '8047', //distance in meters from the center of the map
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });
    document.getElementById('garbage').addEventListener('click', function() {
      if(center==null){ //if permission was not given when prompted for geolocation
        centerNull();
      }
      let keySearch="garbage disposal";
      request={
        location: center,
        radius: '8047', //distance in meters from the center of the map
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });

    //geocode variable to reverse geocode
    let geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
    //get current location


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

  //callback for nearbySearch
  function callback(results, status) {
    for (var i = 0; i < markers.length; i++) { //loop through to delete each marker first from google maps
          markers[i].setMap(null);
      }
      markers=[]; //delete the locations that were previously saved on the map
          console.log('size of markers after emptying array.'+markers.length);
          if(status == google.maps.places.PlacesServiceStatus.OK){
            console.log("number of results"+results.length);
              for (var i = 0; i < results.length; i++) {
                  markers.push(createMarker(results[i]));
                  console.log(markers.length);
              }
          }
    document.getElementById('hamMenuBackground').style.display = 'none';
  }


  //creates markers and info window for each location passed in by callback
  function createMarker(place) {

          let bounds  = new google.maps.LatLngBounds();
          var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
              animation: google.maps.Animation.DROP
          });

          marker.addListener('click', toggleBounce);
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '<br>'+'<p>Rating</p>'+place.rating+'</div>');
              infowindow.open(map, this);
          });
          return marker;
          function toggleBounce() {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
              }
  }﻿


    function currentPosition(){
      console.log("current position comes first");
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
    })
  }else{ //error handling if permission is not given
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  }
function geocodeLatLng(geocoder, map, infowindow) {
    console.log('geocode comes second.');
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
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  function centerNull (){ //function to set default coordinates for the map if gelocation permission was denied
    console.log('center was null')
    center={
      lat: 34.0434944,
      lng: -117.95333120000001
    }
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center
    });
  }
  function getMapRadius (){ //returns value from radius slider
    let slider=document.getElementById("radius");
    return slider.value/0.00062137;
    //ADD CONVERSION FROM MILES TO METERS
  }

const database = firebase.database();
var ref = database.ref("eventInfo");
var name = document.getElementById("name");
var desc = document.getElementById("desc");
var address = document.getElementById("address");
var date = document.getElementById("date");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var submitBtn = document.getElementById("submitEvent");
submitBtn.mousePressed(createEvent);
function createEvent(){
    var data{
      eventName:name.value,
      description:desc.value,
      eventAddress:address.value,
      eventDate:date.value,
      startingTime:startTime.value,
      endingTime:endTime.value
    }
    database.ref.push(data);
}
