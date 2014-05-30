"use strict";
var placesDetailRequest = require("./placesDetailRequest");
var infoWindowTemplate = require("./templates/infowindow-template.hbs");
var placelistTemplate = require("./templates/placelist-template.hbs");
var placelistHeader = require("./templates/placelist-header-template.hbs");
var $ = require ("jquery");
var ScrollTo = require("./vendor/jquery.scrollTo.min");
$.scrollTo = new ScrollTo();

module.exports = function Place (placeJSON, mapObject) {
  var that = this;
  this.marker = new google.maps.Marker({
    position: placeJSON.geometry.location,
    map: mapObject.map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 3,
      strokeWeight: 1,
      fillOpacity: 1,
      fillColor: "red"
    }
  });
  this.element = placelistHeader(placeJSON);

  // add each place to the list display
  $(".list-display").append (this.element);

  this.detailRequest = function detailRequest (callback) {
    placesDetailRequest(placeJSON.reference, mapObject.map, callback);
  };

  // closes windows/placelist divs, makes detail request, calls other funcs
  function makeRequest(result) {
    $(".places_details").remove();
    if (mapObject.openInfoWindow!==null){
      mapObject.openInfoWindow.close();
    }
    that.detailRequest (function (result) {
      var website = result.website;
      if (website){
        result.short_website = shortenWebsite(website);
      }
      infoWindow(result);
      expandListPlace(result);
    });
  }

  // passes result into info template, opens info window
  function infoWindow(result) {
    that.infoWindow = new google.maps.InfoWindow({
      content: infoWindowTemplate(result)
    });
    mapObject.openInfoWindow = that.infoWindow;
    mapObject.openInfoWindow.open(mapObject.map, that.marker);
  }

  // passes result into placelist template, appends to DOM and scrolls to it
  function expandListPlace(result) {
    var place = $("#" + placeJSON.reference);
    place.after (placelistTemplate(result));
    $(".list-display").scrollTo(place, 1000);
  }

  // shorten (visible) url at first "/" after http://
  function shortenWebsite(website) {
    if (website.length > 30){
      var urlPieces = website.split("/");
      return urlPieces[2];
    }
    return website.substring(website.indexOf("//")+2, website.length-1);
  }

  // placelist listener
  $("#" + placeJSON.reference).click(makeRequest);
  // marker listener
  google.maps.event.addListener(this.marker, "click", makeRequest);
};
