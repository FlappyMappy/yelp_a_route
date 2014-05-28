
//paint the route
module.exports = function paintRoute (routes, routeRenderer) {
  if(routeRenderer instanceof google.maps.DirectionsRenderer) {
    routeRenderer.setDirections(routes);
  }
};
