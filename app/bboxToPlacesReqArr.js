"use strict";
/*global google:false */
//Function takes an array of bounding boxes and options and
//returns an array of request functions that accept a callback
//and pass it results and pagination of google places
//
//
//Return [function(callback)] where callback will be passed results, pagination
//Params bboxArray - array of google maps bounding boxes
//Params options - options object for locations search
//Params map - google.maps.Map object


module.exports = function bboxToPlacesReqArr(bboxArray, options, map){

	var service = new google.maps.places.PlacesService(map);

	var reqArr = [];

	var i;

	for (i=0; i<bboxArray.length; i++) {

		var req = getReqFunction(bboxArray[i]);

		reqArr.push(req);
	}


	function getReqFunction (bbox) {
		return (function() {
			var reqOptions = {
				types: options.types,
				keyword: options.keyword,
				openNow: options.openNow,
				minPriceLevel: options.minPriceLevel,
				maxPriceLevel: options.maxPriceLevel
			};

			reqOptions.bounds = bbox;

			return function(callback) {

				service.nearbySearch(reqOptions, function(result, status, pagination) {

					if (status == google.maps.places.PlacesServiceStatus.OK){

						callback(result, pagination, map);

					} else {

						throw("BBox to Places request failed:" + status);
					}
				});
			};
		})();
	}

	return reqArr;
};
