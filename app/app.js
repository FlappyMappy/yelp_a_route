google.maps.event.addDomListener(window,'load',function() {

  var mapOptions = {
       center: new google.maps.LatLng( 39.8,-98.6),
       zoom: 4
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var searchDistance = 2;
  var searchOptions = {
    type: []
  };

  //adds/removes types from the seach options object when boxes clicked
  $("input[type=checkbox]").on("change", function(){
    var option = $(this).val();
    if($(this).is(":checked")){
      searchOptions.type.push(option);
    } else {
      var index = searchOptions.type.indexOf(option);
      searchOptions.type.splice(index,index+1);
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

    calcRoute($("#start").val(), $("#destination").val(), function(res){

      //gets first 10 miles of directions path
      var placesPathSegment = polylineMileSplit(parseFullPath(res.routes[0]), 0, 10);

      var bboxArray = polylineToBBox(placesPathSegment, searchDistance);

      var placesReqArray = bboxToPlacesReqArr(bboxArray, searchOptions, map);

      executePlacesReqArr(placesReqArray, parse_places_array);

    }, map);

  });
});