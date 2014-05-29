
var $ = require('jquery');
var _ = require('underscore');

var MapObject = require('./MapObject');
var calcRoute = require('./calcRoute');
var paintRoute = require('./paintRoute');
var Places = require('./Places');
var placesDetailRequest = require('./placesDetailRequest');
var panToReload = require('./panToReload');
var populatePlaces = require('./populatePlaces');
var parseFullPath = require('./parseFullPath');
var kilometersPerMile = 1.6;

google.maps.event.addDomListener(window,'load',function() {

  //create instance of our global object
  var mapObject = new MapObject(document.getElementById("zoom-map-canvas"),
    {
       center: new google.maps.LatLng( 39.8,-98.6),
       zoom: 4
    }
  );

  mapObject.routeRenderer.setOptions({
    preserveViewport: true
  });

  panToReload(mapObject);

  //adds/removes types from the search options object when boxes clicked
  $(".option-checkbox").on("change", function(){
    var option = $(this).val();
    if($(this).is(":checked")){
      mapObject.searchOptions.types.push(option);

    } else {
      var index = mapObject.searchOptions.types.indexOf(option);
      mapObject.searchOptions.types.splice(index,index+1);
    }
  });

  //ensures min price is never greater than max
  $("#min-price").on('change', function(){
    var min = $(this).val();
    var max = $("#max-price").val();
    if(min > max){
      $("#max-price").val(min);
    }
  });

  //restores main searchbox when clicked
  $("#new-route-button").on("click", function(){
    $('#route-box').removeClass('hide');
  });

  //starts route search based on search boxes when submit button clicked
  $(".search").on("submit", function(event){
    //preventDefault stops a new page from loading
    event.preventDefault();
    mapObject.searchDistance = $("#distances").val() * kilometersPerMile;
    mapObject.searchOptions.keyword = $("#keyword").val();
    mapObject.searchOptions.openNow = $("#open-checkbox").is(":checked") ? true : false;
    mapObject.searchOptions.minPriceLevel = $("#min-price").val();
    mapObject.searchOptions.maxPriceLevel = $("#max-price").val();


    $('#route-box').addClass('hide');

    mapObject.places.clearPlaces();

    calcRoute($("#start").val(), $("#destination").val(), function(res){
      //paint the route to the map
      paintRoute(res, mapObject.routeRenderer);

      //add the active route to the mapObject in full resolution
      //by parsing the individual leg polylines into one master polyine
      mapObject.activeRoute = parseFullPath(res.routes[0]);

      //call function that takes a polyline, mapObject
      //start point in miles and paints markers on map
      populatePlaces(mapObject.activeRoute, mapObject, 0);

      //center map on start point
      //and zoom to default zoom level
      mapObject.map.setCenter(mapObject.activeRoute[0]);
      mapObject.map.setZoom(11);

    }, mapObject.map);

  });
});
