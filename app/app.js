
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


google.maps.event.addDomListener(window,'load',function() {

  var mapOptions = {
       center: new google.maps.LatLng( 39.8,-98.6),
       zoom: 4
  };

  var mapObject = new MapObject(document.getElementById("map-canvas"), mapOptions);


  //adds/removes types from the seach options object when boxes clicked
  $("input[type=checkbox]").on("change", function(){
    var option = $(this).val();
    if($(this).is(":checked")){
      mapObject.searchOptions.type.push(option);
    } else {
      var index = mapObject.searchOptions.type.indexOf(option);
      mapObject.searchOptions.type.splice(index,index+1);
    }
  });

  //empties search box when clicked
  $(".search-box").on("focus", function(){
    $(this).val("");
  });

  //starts route search based on search boxes when submit button clicked
  $(".search").on("submit", function(event){
    //preventDefault stops a new page from loading
    event.preventDefault();
    searchDistance = $("#distances").val();
    console.log("Search from: " + $("#start").val());
    console.log("Search to: "   + $("#destination").val());
    console.log("Distance to search from route " + searchDistance);

    mapObject.places.clearPlaces();

    calcRoute($("#start").val(), $("#destination").val(), function(res){
      //paint the route to the map
      paintRoute(res, mapObject.routeRenderer);

      //gets first 10 miles of directions path
      var placesPathSegment = polylineMileSplit(parseFullPath(res.routes[0]), 0, 10);

      var bboxArray = polylineToBBox(placesPathSegment, searchDistance);

      var placesReqArray = bboxToPlacesReqArr(bboxArray, mapObject.searchOptions, mapObject.map);

      executePlacesReqArr(placesReqArray, function (result) {
        _.each(result, function (placeJSON) {
          mapObject.places.addPlace(placeJSON, mapObject);
        });
      });

    }, mapObject.map);

  });
});
