'use strict';

module.exports = function getReqFunction (reqOptions, service) {

    return function(callback) {

        service.nearbySearch(reqOptions, function(result, status, pagination) {

            if (status == google.maps.places.PlacesServiceStatus.OK){

                callback(result, pagination);

            } else {

                throw("BBox to Places request failed:" + status);
            }
        });
    };
};
