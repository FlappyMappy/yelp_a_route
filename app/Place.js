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

  this.infoWindow = new google.maps.InfoWindow({
    content: "<b>Name: </b>" + this.placeJSON.name
  });

  google.maps.event.addListener(this.marker, 'click', function() {

    that.infoWindow.open(mapObject.map, that.marker);
    
    if (mapObject.openInfoWindow!==null){
      mapObject.openInfoWindow.close();
      console.log("closing info");
    };

    mapObject.openInfoWindow = that.infoWindow;

  });
};
