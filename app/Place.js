"use strict";
var placesDetailRequest = require("./placesDetailRequest");
var infoWindowTemplate = require("./template.hbs");
var placelistTemplate = require("./placelist-template.hbs");
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

  this.element = "<div class='place_name' id='" + placeJSON.reference + "'>" +
                   placeJSON.name + "</div><hr>";

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
      console.dir(result);
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
    $(".list-display").scrollTo(place, 2000);
  }

  // shorten (visible) url at first "/"" after http://
  function shortenWebsite(website) {
    if (website.length > 30){
      var urlPieces = website.split("/");
      return urlPieces[0] + "//" + urlPieces[2];
    }
    return website;
  }

  // placelist listener
  $("#" + placeJSON.reference).click(makeRequest);
  // marker listener
  google.maps.event.addListener(this.marker, "click", makeRequest);
};
