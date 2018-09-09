let markers=[
  //First marker object
  {
    coordinate:{lat:36.7783,lng:-119.4179},
    iconImage:'grossJeffrey.png',
    content:'<h1> DANGER!! Jeffrey spotted!! </h1>'
  }
];
getPosition(initMap);
  function getPosition(callBack){
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
          callBack();
    })
  }else{ //error handling if permission is not given
      handleLocationError(false, infoWindow, map.getCenter());
      callBack();
    }
  }

  function geocodeLatLng(geocoder, map, infowindow) {
    var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }





function initMap(){
  //Array of marker objects. SEPARATE EACH OBJECT WITH A COMMA

    //Second marker object
    /*
    {
      coordinate:{lat:32.7157,lng:-117.1611},
      iconImage:'will.png',
      content:'<h1> DANGER!! William spotted!! </h1>'
    }
    */

//add user's current position to array of markers

    //map options
    let options = {
      zoom:100, //zoom level of the map
      center:{lat:36.7783,lng:-119.4179} //since the longitude is West, you need a negative sign. If east, you can leave it as positive.
    }

    //new map object
    let map = new
    google.maps.Map(document.getElementById('map'),options); //map object. We passed in 2 arguements, the div that the map will be placed in, as well as the options (zoom and starting lng and lat)

    /*
    //Add marker on map
    let marker=new google.maps.Marker({
      position:{lat:36.7783,lng:-119.4179}, //exact coordinates where you want to land
      map:map, //set the map you want this to set to
    });

    //info tab
    let infoWindow = new google.maps.InfoWindow({ //will not work without the infoWindow event listener
      content:'<h1> E Waste Day!!</h1> '
    })
    marker.addListener('click',function(){ //callback function
      infoWindow.open(map, marker); //pass in map and marker variables
    });
    */

    //Loop through the array of marker objects

    for(let i=0;i<markers.length;i++){
      addMarker(markers[i]);
    }


    /* Original way of adding marker object on the map individually
    addMarker({
      coordinate:{lat:36.7783,lng:-119.4179},
      iconImage:'grossJeffrey.png',
      content:'<h1> DANGER!! Jeffrey spotted!! </h1>'
    });
    addMarker({
      coordinate:{lat:32.7157,lng:-117.1611},
      iconImage:'will.png',
      content:'<h1> DANGER!! William spotted!! </h1>'
    });
    */
    //IMAGES MUST BE KEPT IN SAME FOLDER AS THE HTML
    // Add Marker Function

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
}
