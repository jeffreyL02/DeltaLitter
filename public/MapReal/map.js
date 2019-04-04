
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
let latitude; //user's current latitude
let longitude; //user's current longitude
let userRadius;
let allEvents = []; //store all events from database
let userId;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user successful!!");
  } else {
    console.log("user error!")
  }
});



//home button
document.getElementById("homeBtn").addEventListener('click', function(){
  window.location.href = "../Nav/nav.html"
})

function initMapp() {
    //by default, ask permission for current location to center map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center
    });
      //get current location if permission given
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        console.log('dum');
          latitude=position.coords.latitude;
          console.log("this is user's current latitude: "+latitude);
          longitude=position.coords.longitude;
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
          markers.push(userLocationMarker); //pushes user's location marker object to markers array
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
      userRadius=getMapRadius(); //contains radius specified by slider
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
      userRadius=getMapRadius(); //contains radius specified by slider
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
      userRadius=getMapRadius(); //contains radius specified by slider
      let keySearch="chemical reycling";
      request={
        location: center,
        radius: '8047', //distance in meters from the center of the map
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });
    document.getElementById('clothing').addEventListener('click', function() {
      if(center==null){ //if permission was not given when prompted for geolocation
        centerNull();
      }
      userRadius=getMapRadius(); //contains radius specified by slider
      let keySearch="clothing recycling";
      request={
        location: center,
        radius: '8047', //distance in meters from the center of the map
        query: keySearch
      };
      let service = new google.maps.places.PlacesService(map); //places service in places API
      service.textSearch(request, callback);
    });
    document.getElementById('events').addEventListener('click',function(){
      refreshMarkers(); //refresh map markers
      userRadius=getMapRadius(); //contains radius specified by slider
      let ref = FIREBASE_DATABASE.ref('events');
      ref.on('value', gotData, errData)

      function gotData(data){
        let events=data.val();
        let keys=Object.keys(events);
        refreshMarkers(); //refresh map markers
        for(let i=0;i<keys.length; i++){
          let k=keys[i];
          let currentAddress=events[k].address;
          let geocoder=new google.maps.Geocoder();
          // console.log(events[k].address)
          geocoder.geocode({ 'address': currentAddress}, function(results,status){
            if (status == 'OK') {
              console.log(results[0].place_id); //get place id 
              let eventLat=results[0].geometry.location.lat();
              let eventLng=results[0].geometry.location.lng();
              if(calcSearchRad(eventLat,eventLng,latitude,longitude,"M")<userRadius){ //latitude and longitude are the user's coords.

                let eventDist=calcSearchRad(eventLat,eventLng,latitude,longitude,"M"); //event distance from user
                console.log(eventDist);
                let roundedEventDist=eventDist.toFixed(1); //rounded event distance
                let markerLocation={
                  lat:eventLat,
                  lng:eventLng
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: markerLocation,
                    animation: google.maps.Animation.DROP
                });
                markers.push(marker);
                limitBounds(); //calling autoscroll function
                console.log("limiting bounds at marker: "+ markers.length)
                console.log('pushing events marker')
                marker.addListener('click', toggleBounce);
                google.maps.event.addListener(marker, 'click', function() {
                        //STYLE HERE BIG BRAIN JEFFREY
                  let currDesc=events[k].desc; //event description
                  let eventAddress=events[k].address; //address
                  let eventDate=events[k].date; //date
                  let endTime=events[k].endTime; //end Time
                  let startTime=events[k].startTime; //start time

                  infowindow.setContent('<div><strong>' + events[k].name + '</strong><br>' +'<p><strong> Address </strong></p>'+eventAddress+ '<p><strong>Event Date: </strong></p>'+eventDate+'<p><strong>Start Time: </strong></p>'+startTime+'<p><strong> End Time: </strong></p>'+endTime+'<p> <strong>Linear Distance: </strong></p>'+'</div>'+roundedEventDist+" miles from your current location"+'<div><strong>Event Description: </strong</div>'+currDesc);
                  infowindow.open(map, this);
                  infowindow.setOptions({maxWidth:325});
                });
                function toggleBounce() {
                  if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function(){ marker.setAnimation(null); }, 750);
                  }
                }
              }
            }
          else{
            console.log("event is not within user's specified radius");
          }
        })
         document.getElementById('hamMenuBackground').style.display = 'none';
      }
    }
    function errData(data){
      console.log('error!')
      console.log(data);
    }
  })
  function limitBounds(){ //auto scroll to fit all markers on map
    console.log("limit bounadaries")
    console.log(markers.length);
    //creating boundaries for map, to center around all markers.
    let bounds= new google.maps.LatLngBounds();
    for(let i=0;i<markers.length;i++){
      bounds.extend(markers[i].getPosition()); //extending bounds to each marker object's coordinates
      //getPosition() is needed to get coords from the marker object
    }
    map.fitBounds(bounds);
  }
  function refreshMarkers(){
    for (var i = 1; i < markers.length; i++) { //loop through to delete each marker first from google maps
      markers[i].setMap(null);
    }
    console.log('clearing marker array in events')
    markers.splice(1,markers.length-1); //delete all markers except for the user's location marker to reload new marker results.
  }
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
    console.log("Markers length: "+markers.length);
    refreshMarkers(); //refresh all map markers
          console.log('size of markers after emptying array.'+markers.length);
          if(status == google.maps.places.PlacesServiceStatus.OK){
            console.log("number of results: "+results.length);
              //pushing markers to array
              for (var i = 0; i < results.length; i++) {
                  console.log(results[i].geometry.location.lat());
                  //testing marker's distance from user's location. If location is out of bounds, locations are not pushed to marker array.
                  let markerLat=results[i].geometry.location.lat(); //marker's latitude
                  let markerLng=results[i].geometry.location.lng(); //marker's longitude
                  console.log("User radiusss: "+userRadius)
                  if(calcSearchRad(markerLat,markerLng,latitude,longitude,"M")<userRadius){ //latitude and longitude are the user's coords.
                    markers.push(createMarker(results[i])); //pushing marker objects into an array. This allows for marker deletion at refresh.
                    console.log(markers.length);
                    limitBounds();
                  }
              }
              /*
              //creating boundaries for map, to center around all markers.
              let bounds= new google.maps.LatLngBounds();
              for(let i=0;i<markers.length;i++){
                bounds.extend(markers[i].getPosition()); //extending bounds to each marker object's coordinates
                //getPosition() is needed to get coords from the marker object
              }
              map.fitBounds(bounds);
              */
          }
    document.getElementById('hamMenuBackground').style.display = 'none';
  }
  //creates markers and info window for each location passed in by callback
  function createMarker(place) {
          let markerLat=place.geometry.location.lat();
          let markerLng=place.geometry.location.lng();
          let placeId;
          let distance=calcSearchRad(markerLat,markerLng,latitude,longitude,"M");
          let roundedDist=distance.toFixed(1); //round distance to 1 decimal place
          var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
              animation: google.maps.Animation.DROP
          });
          var latlng = {lat: markerLat, lng: markerLng}; //lat and lng object to be passed into geocoder 
          
          marker.addListener('click', toggleBounce);
          google.maps.event.addListener(marker, 'click', function() { //retrieve place id with provided lat and lng object 
            geocoder.geocode({'location': latlng}, function(results, status) { 
              if (status === 'OK') {
                if (results[0]) { //since there's a lot of choices for address results, we choose the first one
                  placeId=results[0].place_id; 
                  // let link = "https://www.google.com/maps/search/?api=1&query=" + markerLat + "," + markerLng;
                  let link="https://www.google.com/maps/search/?api=1&query="+markerLat+","+markerLng+"&query_place_id="+placeId; //link that contains the location's coordinates and place id
                  infowindow.setContent('<div style="margin-bottom: 2vh; color: #58c074; font-size: 4.5vh; text-align:center; font-weight: bold;">'
                  + place.name + '</div><p style="color: #58c074; font-size: 3vh;"><strong>Address:</strong></p><p style="color: #58c074; font-size:2.25vh; margin-left: 3.5vw;">' + place.formatted_address + '</p>'+'<p style="color: #58c074; font-size: 3vh;"><strong>Rating:</strong></p><p style="color: #58c074; font-size:2.25vh; margin-left: 3.5vw;">'+place.rating + '</p><p> <strong style="color: #58c074;>Linear Distance: </strong></p>'+'</div><p style="margin-top:2vh; color: #58c074; font-size: 2.5vh;">'+roundedDist+' miles from your current location</p>'+link.link(link)+'<button type="button" id="saveLocation" >Save this location!</button>'); //InfoWIndow Information
                  
                  //SAVE LOCATION BUTTON
                  document.getElementById('saveLocation').addEventListener('click', function() { //SAVE MAP MARKER BUTTON
                    console.log("saveLocation Button has been pressed");
                    firebase.auth().onAuthStateChanged(function(user) { //waits until current user is fully initialized, before trying to capture user ID 
                      if (user) { //tests to make sure current user is not null
                        console.log("user successful!!");
                        userId=firebase.auth().currentUser.uid; //get the current user's id 
                        console.log(userId);
                          FIREBASE_DATABASE.ref('events/' + userId+'/savedLocations/').push(latlng).then( //pushes intended marker to database (latlng object )
                            console.log('marker coordinates successfully saved!!')).catch(function(error){console.log("Marker save FAILED!");
                          });
                      }  
                      else{ //if current user is not detected 
                        console.log("user error!")
                      }
                    });
                  });

                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            }); 
            infowindow.open(map, this);
            infowindow.setOptions({maxWidth:400}); //set max width of the info window to 200 px.
            console.log('actual position');
            console.log(longitude);
            console.log(latitude);
              
              
          });
          return marker;
          function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ marker.setAnimation(null); }, 750);
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
    return slider.value;
    /*
    return slider.value/0.00062137;
    */
    //ADD CONVERSION FROM MILES TO METERS
  }

  function calcSearchRad(lat1, lon1, lat2, lon2, unit){
    /*
    let lat1=33.997516
    let lon1=-117.946597
    let lat2=33.994182
    let lon2=-117.930880
    console.log(distance(lat1,lon1,lat2,lon2,"M"))
    */
    	let radlat1 = Math.PI * lat1/180
    	let radlat2 = Math.PI * lat2/180
      let theta = lon1-lon2
    	let radtheta = Math.PI * theta/180
    	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	if (dist > 1) {
    		dist = 1;
    	}
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60 * 1.1515
    	if (unit=="K") { dist = dist * 1.609344 }
    	if (unit=="N") { dist = dist * 0.8684 }
    	return dist

  }
  // listen for the window resize event & trigger Google Maps to update too
  window.onresize = function() {
    var currCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
  };

//dont touch this kyle
let name;
let events={};
const FIREBASE_DATABASE = firebase.database();
function createRandomId(){
  let rand = "";
  for (let i = 0; i < 10; i++) {
    rand += Math.round((Math.random() * (20 + 1)) + 1).toString();
  }
  return rand;
}
let randID;

document.getElementById("submitEvent").addEventListener('click', function(){ //SUBMIT EVENT BUTTON 
  events={
    name: document.getElementById('name').value,
    desc: document.getElementById("desc").value,
    address: document.getElementById("address").value,
    date: document.getElementById("date").value,
    startTime: document.getElementById("startTime").value,
    endTime: document.getElementById("endTime").value
  }
  firebase.auth().onAuthStateChanged(function(user) { //waits until current user is fully initialized, before trying to capture user ID 
    if (user) { //tests to make sure current user is not null
      console.log("user successful!!");
      userId=firebase.auth().currentUser.uid; //get the current user's id 
      console.log(userId);
        FIREBASE_DATABASE.ref('events/' + userId+'/createdEvents/').push(events).then( //changed from set to push, so that data is added and not overridden
                                                                      //pushes each event to database under the current user's id 
          console.log('Event pushed successfully under user ID !!')).catch(function(error){console.log("Database failed!");
        });
        FIREBASE_DATABASE.ref('events/' + createRandomId()).set(events).then( //pushes each event to database directly under event without user id, so that all users can see the event
          console.log('Event pushed successfully under events!!')).catch(function(error){console.log("Database failed!");
        });
    }  
    else{ //if current user is not detected 
      console.log("user error!")
    }
  });
  
    
  document.getElementById('eventForm').reset();
  document.getElementById('eventModalBack').style.display = 'none';
  document.getElementById('hamMenuBackground').style.display = 'none';
});

