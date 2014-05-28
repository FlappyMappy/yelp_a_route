//this method takes a unique places ID
//and requests details from google maps
//and passes results to callback

module.exports = function placesDetailRequest(placeID, map, callback) {

	(new google.maps.places.PlacesService(map)).getDetails({

			reference: placeID
		}, function (result, status) {
				if (status === google.maps.DirectionsStatus.OK) {

					callback(result);

				} else {
					console.log("placesDetailRequest Error:" + status);
				}
			}
	);

};
