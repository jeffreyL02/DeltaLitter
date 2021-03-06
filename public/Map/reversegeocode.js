let markers=[
  //First marker object
  {
    coordinate:{lat:36.7783,lng:- 119.4179}
  }
];
let center;
let infowindow;
let request;
  function initMap() {
    let center={lat: 34.0434944, lng: -117.95333120000001};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center
    });
    //locations of nearby coffee shops
    request={
      location: center,
      radius: '8047', //distance in meters from the center of the map
      types: ['reycling_center']
    };
    let service = new google.maps.places.PlacesService(map); //places service in places API
    service.nearbySearch(request, callback);
    //geocode variable to reverse geocode
    let geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
    //get current location
    currentPosition();
    document.getElementById('submit').addEventListener('click', function() {
      currentPosition();
      geocodeLatLng(geocoder, map, infowindow);
    })
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
          if(status == google.maps.places.PlacesServiceStatus.OK){
              for (var i = 0; i < results.length; i++) {
                  markers.push(createMarker(results[i]));
          }
      }
  }

  //creates markers and info window for each location passed in by callback
  function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });

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
