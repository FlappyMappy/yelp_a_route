var placesDetailRequest = require('./placesDetailRequest');
var _ = require('underscore');
var template = require('./template.hbs');
var $ = require ("jquery");
var jQuery = $;
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

  function expandListPlace() {
    // remove any detail spans already open
    $(".places_details").remove();
    var place = $("#" + placeJSON.reference);

    that.detailRequest (function (result) {
      // insert a span tag in the side panel containing the detailed text
      place.after ("<div class='places_details'>"
                        + "<br>" + result.vicinity
                        + "<br>" + result.formatted_phone_number
                        + "<br>" + result.rating + " / 5 Stars (" + result.user_ratings_total + " user reviews)"
                        + "<br><a href='" + result.website + "' target='_newtab'>" + result.website + "</a>"
                        + "<br><br>" + result.reviews[0].text
                        + "<br><br>" + result.reviews[1].text
                        + "</div>");
    $(".list-display").scrollTo(place, 2000);
    });
  }

  function infoWindow() {
    if (mapObject.openInfoWindow!==null){
      mapObject.openInfoWindow.close();
    }

    that.detailRequest(function(result){
      that.infoWindow = new google.maps.InfoWindow({
        content: template(result)
      });
      mapObject.openInfoWindow = that.infoWindow;
      mapObject.openInfoWindow.open(mapObject.map, that.marker);
    });
  }

  function infoWindowAndExpandList() {
    expandListPlace();
    infoWindow();
  }

  $("#" + placeJSON.reference).click(infoWindowAndExpandList);

  google.maps.event.addListener(this.marker, 'click', infoWindowAndExpandList);

};
