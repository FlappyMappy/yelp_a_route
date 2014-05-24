//This function will take a polyline and return a polyline
//that starts at mile startMile and ends at 
//endMile

var milesToMeters = require('./milesToMeters');

module.exports = function polylineMileSplit(polyline, startMile, endMile){

	startMeter = milesToMeters(startMile);
	endMeter = milesToMeters(endMile);
	newPolyline = [];

	//hold a reference to the method to make it easier to read. Results in meters
	var distance = google.maps.geometry.spherical.computeDistanceBetween;

	var i;
	for (i = 0; i < polyline.length; i++) {

		var metersFromPLStartToCurrent = distance(polyline[0], polyline[i]);

		if (metersFromPLStartToCurrent >= startMeter){
			if (metersFromPLStartToCurrent <= endMeter){
				newPolyline.push(polyline[i]);
			} else {
				return newPolyline;
			};
		};
	};
	return newPolyline;
};