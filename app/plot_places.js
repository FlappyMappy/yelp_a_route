// plot_places takes an array of objects (parsed from the google json)
// and uses each object's "lat" and "lng" to create an array of map markers.


var _ = require('underscore');

module.exports = function plot_places (placesJSON, map) {
  var marker = new Array();  // the array to hold the map marker data
  var total_markers = 0;     // total markers in our array so far

  _.each(placesJSON, function (place) {

    (function () {



      var newMarker = new google.maps.Marker({
        
        // for now, just get the name and location
        position: place.geometry.location,
        title: place.name,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 3,
          strokeWeight: 1,
          fillOpacity: 1,
          fillColor: "red"
        }
      });

      var newInfoWindow = new google.maps.InfoWindow({
        content: "<b>Name: </b>" + place.name
      });

      //make info window close when the next one is opened


      google.maps.event.addListener(newMarker, 'click', function() {
        
        newInfoWindow.open(map,newMarker);
      });

    })();
  });
};
