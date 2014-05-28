
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


  var mapObject = new MapObject(document.getElementById("index-map-canvas"),
    {
       center: new google.maps.LatLng( 39.8,-98.6),
       zoom: 4,
       disableDefaultUI: true
    }
  );

  mapObject.routeRenderer.setOptions({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: 'black'
    }
  });


  var zoomMapObject = new MapObject(document.getElementById("zoom-map-canvas"),
    {
       center: new google.maps.LatLng( 39.8,-98.6),
       zoom: 4
    }
  );

  zoomMapObject.routeRenderer.setOptions({
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
  $("#min-price").on("change", function(){
    var min = $(this).val();
    var max = $("#max-price").val();
    if(min > max){
      $("#max-price").val(min);
    }
  });

  //ensures max price is never less than min
  $("#max-price").on("change", function(){
    var min = $("#min-price").val();
    var max = $(this).val();
    if(min > max){
      $("#min-price").val(max);
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
    console.log("Search from: " + $("#start").val());
    console.log("Search to: "   + $("#destination").val());
    console.log("Distance to search from route " + mapObject.searchDistance + "kms");
    console.log("opennow set to " + mapObject.searchOptions.openNow );
    console.log("Min price set to " + mapObject.searchOptions.minPriceLevel);
    console.log("Max price set to " + mapObject.searchOptions.maxPriceLevel);

    $('#route-box').addClass('hide');

    zoomMapObject.places.clearPlaces();

    calcRoute($("#start").val(), $("#destination").val(), function(res){
      //paint the route to the map
      console.dir(res);
      paintRoute(res, mapObject.routeRenderer);
      paintRoute(res, zoomMapObject.routeRenderer);

      //gets first 10 miles of directions path
      var placesPathSegment = polylineMileSplit(parseFullPath(res.routes[0]), 0, 10);

      var bboxArray = polylineToBBox(placesPathSegment, mapObject.searchDistance);

      var placesReqArray = bboxToPlacesReqArr(bboxArray, mapObject.searchOptions, mapObject.map);

      executePlacesReqArr(placesReqArray, function (result) {
        _.each(result, function (placeJSON) {
          zoomMapObject.places.addPlace(placeJSON, zoomMapObject);
        });
      });

      //combine all of bboxArray into one bbox that will be start viewport
      var oneBBOX = new google.maps.LatLngBounds(bboxArray[0].getSouthWest(),
            bboxArray[0].getNorthEast());

      var oneBBOX = bboxArray[0];
      _.each(bboxArray, function (bbox) {
        oneBBOX.extend(bbox.getNorthEast());
        oneBBOX.extend(bbox.getSouthWest());
      });

      zoomMapObject.map.fitBounds(oneBBOX);
      zoomMapObject.map.setCenter(placesPathSegment[0]);
      zoomMapObject.map.setZoom(11);

      indexMarker = new google.maps.Marker({

          // for now, just get the name and location
          position: placesPathSegment[0],
          map: mapObject.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeWeight: 1,
            fillOpacity: 1,
            fillColor: "red"
          }
      });

    }, mapObject.map);

  });
});
