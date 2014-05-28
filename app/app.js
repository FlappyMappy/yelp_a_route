
var $ = require('jquery');
var _ = require('underscore');

var MapObject = require('./MapObject');
var calcRoute = require('./calcRoute');
var paintRoute = require('./paintRoute');
var Places = require('./Places');
var parseFullPath = require('./parseFullPath');
var polylineToBBox = require('./polylineToBBox');
var bboxToPlacesReqArr = require('./bboxToPlacesReqArr');
var polylineMileSplit = require('./polylineMileSplit');
var executePlacesReqArr = require('./executePlacesReqArr');
var placesDetailRequest = require('./placesDetailRequest');
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

  //adds/removes types from the search options object when boxes clicked
  $(".option-checkbox").on("change", function(){
    var option = $(this).val();
    if($(this).is(":checked")){
      mapObject.searchOptions.types.push(option);
      console.log("added " + option + " type");
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

      //gets first 10 miles of directions path
      var placesPathSegment = polylineMileSplit(parseFullPath(res.routes[0]), 0, 10);

      var bboxArray = polylineToBBox(placesPathSegment, mapObject.searchDistance);

      var placesReqArray = bboxToPlacesReqArr(bboxArray, mapObject.searchOptions, mapObject.map);

      executePlacesReqArr(placesReqArray, function (result) {
        _.each(result, function (placeJSON) {
          mapObject.places.addPlace(placeJSON, mapObject);
        });
      });

      //combine all of bboxArray into one bbox that will be start viewport

      mapObject.map.setCenter(placesPathSegment[0]);
      mapObject.map.setZoom(11);

    }, mapObject.map);

  });
});
