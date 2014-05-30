//This function just gives me an overview_path array of points
//for the route.

module.exports = function calcRoute(start, end, callback, map) {

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    new google.maps.DirectionsService().route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            callback(result);
        } else {
            throw "Route request failed";
        }
    });
};


