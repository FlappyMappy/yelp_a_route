//parses the full resolution path polyline
//from a routes result object. This is instead
//of using overview polyline which is a low resolution
//path
//route - a single route from a directions search result object
//returns - a high resolution path polyline

module.exports = function parseFullPath(route) {

	var fullPath = [];

	route.legs.forEach(function(leg){
		leg.steps.forEach(function(step){
			step.lat_lngs.forEach(function(point){
				fullPath.push(point);
			});
		});
	});

	return fullPath;

};
