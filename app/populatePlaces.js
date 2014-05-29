var polylineMileSplit = require('./polylineMileSplit');
var polylineToBBox = require('./polylineToBBox');
var bboxToPlacesReqArr = require('./bboxToPlacesReqArr');
var executePlacesReqArr = require('./executePlacesReqArr');
var _ = require('underscore');

module.exports = function populatePlaces (polyline, mapObject, startMiles) {
		
	      //gets first 10 miles of directions path
      var placesPathSegment = polylineMileSplit(polyline, 0, 10);

      var bboxArray = polylineToBBox(placesPathSegment, mapObject.searchDistance);

      var placesReqArray = bboxToPlacesReqArr(bboxArray, mapObject.searchOptions, mapObject.map);

      executePlacesReqArr(placesReqArray, function (result) {
        _.each(result, function (placeJSON) {
          mapObject.places.addPlace(placeJSON, mapObject);
        });
      });
};