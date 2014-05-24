// Updated to handle a single buffer request per call.

// parse_places_array is called once for each google places request (once for each bounding box).
// json_array will be an array with each cell containing a json string, representing one place.

var plot_places = require('./plot_places');

module.exports = function parse_places_array (placesJSON, pagination, map) {



	//call any functions that want this data
	//call paint to google maps

	//console.log(placesJSON);
	plot_places(placesJSON, map);



	// console.log("results done");
	// console.log(places_data);

	//call function that holds and populates list div

};