var _ = require ('underscore');
var Place = require('./Place');

module.exports = function Places () {
  this.places = [];
  var that = this;

  this.clearPlaces = function clearPlaces () {
    
    if (that.places.length>0){
      _.each(that.places, function (place) {
        place.marker.setMap(null);
      });
    };

    this.places = [];
  };

  this.addPlace = function addPlace (placeJSON, mapObject) {
    this.places.push(new Place(placeJSON, mapObject));
  };
};
