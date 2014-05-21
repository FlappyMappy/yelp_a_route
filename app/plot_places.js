// plot_places takes an array of objects (parsed from the google json)
// and uses each object's "lat" and "lng" to create an array of map markers.

function plot_places (placesJSON, map) {
  var marker = new Array();  // the array to hold the map marker data
  var total_markers = 0;     // total markers in our array so far

  _.each(placesJSON, function (place) {
      
    (function () {

      var newMarker = new google.maps.Marker({
        
        // for now, just get the name and location
        position: place.geometry.location,
        title: place.name,
        map: map,
        icon: place.icon
      });

      var newInfoWindow = new google.maps.InfoWindow({
        content: "<b>Name: </b>" + place.name
      });

      console.log(place.name);

      google.maps.event.addListener(newMarker, 'click', function() {
        newInfoWindow.open(map,newMarker);
      });

    })();
  });
};
