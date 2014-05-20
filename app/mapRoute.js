var directionsService = new google.maps.DirectionsService();

function calcRoute(start, end, callback) {
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            callback(result);
        }
    });
}