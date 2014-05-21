
//Function takes an array of bounding boxes and options and
//returns an array of request functions that accept a callback
//and pass it results and pagination of google places
//
//
//Return [function(callback)] where callback will be passed results, pagination
//Params bboxArray - array of google maps bounding boxes
//Params options - options object for locations search
//Params map - google.maps.Map object


function bboxToPlacesReqArr(bboxArray, options, map){

	var service = new google.maps.places.PlacesService(map);

	var reqArr = [];

	var i;
	for (i=0; i<bboxArray.length; i++) {
		
		var req = (function() {
			var reqOptions = {
				bounds: bboxArray[i]
			};

			return function(callback) {

				service.nearbySearch(reqOptions, function(result, status, pagination) {
					
					if (status == google.maps.places.PlacesServiceStatus.OK){

						callback(result, pagination, map);

					} else {
						throw("BBox to Places request failed");
					};
				});
			};
		})();
		
		reqArr.push(req);
	};

	return reqArr;
};