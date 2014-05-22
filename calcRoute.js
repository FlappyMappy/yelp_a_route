//This function just gives me an overview_path array of points
//for the route.
function calcRoute(start, end, callback, map) {
    clearBoxes();

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    new google.maps.DirectionsService().route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //call function to map polyline and pass in the polyline
            //object from the results
            //result.routes[0].overview_path

            callback(result);
        } else {
            throw "Route request failed";
        };
    });
};

