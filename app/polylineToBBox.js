//polyline is an array of google.maps.Point objects
//dist is distance from polyline in km that Bounding Boxes will
//surround

module.exports = function polylineToBBox(polyline, dist){

    if (dist<=0){
        throw "Distance must be greater than 0 KM";
    } else if (!polyline.length>0){  ///JSHINT: Confusing use of !
        throw "Polyline has no points";
    }

    return (new RouteBoxer).box(polyline, dist); //JSHINT: missing () invoking a constructor
};
