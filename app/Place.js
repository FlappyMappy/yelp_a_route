var placesDetailRequest = require('./placesDetailRequest');
var _ = require('underscore');
var template = require('./template.hbs');

module.exports = function Place (placeJSON, mapObject) {
  var that = this;
  this.placeJSON = placeJSON;

  this.marker = new google.maps.Marker({

      // for now, just get the name and location
      position: this.placeJSON.geometry.location,
      title: this.placeJSON.name,
      map: mapObject.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3,
        strokeWeight: 1,
        fillOpacity: 1,
        fillColor: "red"
      }
    });

google.maps.event.addListener(this.marker, 'click', function() {

  if (mapObject.openInfoWindow!==null){
    mapObject.openInfoWindow.close();
    console.log("closing info");
  };
  console.dir(placeJSON.reference);
  placesDetailRequest(placeJSON.reference, mapObject.map, function(result){
    console.dir(result);
    console.dir(template(result));
    that.infoWindow = new google.maps.InfoWindow({
      content: template(result)
    });
    mapObject.openInfoWindow = that.infoWindow;
    mapObject.openInfoWindow.open(mapObject.map, that.marker);
  });

});
};
