//takes a bounding box and a polyline and
//returns a new polyline where span between
//start point and what's visible in the polyline
//is clipped off

var _ = require('underscore');

module.exports = function clipPolylineToDestination (polyline, bbox) {
	
	var newPolyline = [];
	var copyLine = false;

	_.each(polyline, function (point) {

		if (copyLine) {
			newPolyline.push(point);
		} else if (bbox.contains(point)){
			copyLine = true;
			newPolyline.push(point);
		}
	});

	return newPolyline;
};
