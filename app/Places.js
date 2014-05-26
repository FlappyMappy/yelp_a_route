var _ = require ('underscore');
var Place = require('./Place');

module.exports = function Places () {
  this.places = [];
  var that = this;

  this.clearPlaces = function clearPlaces () {
    _.each(that.places, function (place) {
      place.marker.setMap(null);
    });

    this.places = [];
  };

  this.addPlace = function addPlace (placeJSON, map) {
    this.places.push(new Place(placeJSON, map));
  };

  this.paintMarkers = function paintMarkers (map) {
    _.each(this.places, function (placeInst) {
      placeInst.paintPlace(map);
    });
  };
};
