//This function paints an array of points
//for the route to the map.

module.exports = function paintRoute(route, dirRenderer) {

    dirRenderer.setDirections(route);

};
