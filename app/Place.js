module.exports = function Place (placeJSON, map) {
  this.placeJSON = placeJSON;
  this.infoWindow = null;
  this.marker = null;

  this.paintPlace = function paintPlace (map) {

    var that = this;

    this.marker = new google.maps.Marker({

        // for now, just get the name and location
        position: this.placeJSON.geometry.location,
        title: this.placeJSON.name,
        map: map,
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

      //make info window close when the next one is opened

    google.maps.event.addListener(this.marker, 'click', function() {

      that.infoWindow.open(map, that.marker);
    });

    this.setMap = function setMap (map) {
      that.marker.setMap(null);
    };
  };
};
