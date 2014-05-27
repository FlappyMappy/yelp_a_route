var Places = require('./Places');

//One instance of this object will be created and it will hold
//an array of places objects.
//Within searchOptions, types is an array of strings,
//keywords must be a string, but it may have several space-delimited values

module.exports = function mapObject (mapElement, mapOptions) {
  this.map = new google.maps.Map(mapElement, mapOptions);
  this.routeRenderer = new google.maps.DirectionsRenderer({map: this.map});
  this.places = new Places();
  this.searchDistance = 2;
  this.searchOptions = {
    types: [],
    keywords: ""
  };
  this.openInfoWindow = null;
};
