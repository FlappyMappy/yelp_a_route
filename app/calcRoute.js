//This function just gives me an overview_path array of points
//for the route.

paintRoute = require('./paintRoute.js');

function calcRoute(start, end, callback, map) {

    var directionsRender = new google.maps.DirectionsRenderer({map: map});

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    new google.maps.DirectionsService().route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRender.setDirections(result);
            var route = result;
            var dirRenderer = directionsRender

            //we need to actually paint the route,
            //how does this work the first time around?
            callback(result, route, dirRenderer;
        } else {
            throw "Calculating route request failed";
        }
    });
}

