"use strict";
var placesDetailRequest = require("./placesDetailRequest");
var infoWindowTemplate = require("./templates/infowindow-template.hbs");
var placelistTemplate = require("./templates/placelist-template.hbs");
var placelistHeaderTemplate = require("./templates/placelist-header-template.hbs");
var $ = require ("jquery");
var ScrollTo = require("./vendor/jquery.scrollTo.min");
$.scrollTo = new ScrollTo();

module.exports = function Place (placeJSON, mapObject) {
  var that = this;
  //creates new marker on map
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
  this.element = placelistHeaderTemplate(placeJSON);

  // add each place to the list display
  $(".list-display").append (this.element);

  // placelist listener
  $("#" + placeJSON.reference).click(makeRequest);
  // marker listener
  google.maps.event.addListener(this.marker, "click", makeRequest);

  // defines the detail place request
  this.detailRequest = function detailRequest (callback) {
    placesDetailRequest(placeJSON.reference, mapObject.map, callback);
  };

  // if the request placelist/infowindow is not already open
  // close windows/placelist divs, make detail request, call other funcs
  function makeRequest() {
    if(mapObject.openInfoWindow !== that.infoWindow){
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
    $("#" + placeJSON.reference).append(placelistTemplate(result));
    var images = $(".images");
    if(result.photos){
      for(var i = 0; i < 3; i++){
        if(result.photos[i]){
          images.prepend("<img class='small-image' id='photo-" + i + "' src='" +
          result.photos[i].getUrl({"maxWidth": 100, "maxHeight": 70}) +
          "'>   ");
        }
      }
    }
    $(".places_details").slideUp(0);
    $(".places_details").slideDown(500);
    $(".list-display").scrollTo($("#" + placeJSON.reference), 1000);
  }

  //show photos big //right now only console-logs which photos was clicked
  $("#" + placeJSON.reference).on("click", ".small-image", function(){
    console.log($(this).prop("id"));
  });

  // cut off http://www and anything after the domain name
  function shortenWebsite(website) {
    var UrlParts = website.split("/");
    var shortUrl = UrlParts[2];
    if(shortUrl.indexOf("www") >= 0){
      return shortUrl.substring(4);
    }
    return shortUrl;
  }
};
