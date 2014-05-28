
var clipPolylineToDestination = require('./clipPolylineToDestination');
var populatePlaces = require('./populatePlaces');

module.exports = function panToReload (mapObject) {

	google.maps.event.addListener(mapObject.map, 'dragend', function () {

    	mapObject.places.clearPlaces();

    	//get the activeRoute polyline and determine the point in the viewport
    	//closest to the origin


    	polyline = clipPolylineToDestination(mapObject.activeRoute, mapObject.map.getBounds());

    	populatePlaces(polyline, mapObject, 0);

	});

	
};