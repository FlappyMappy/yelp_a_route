// json_array will be a 2-dimensional array, with each cell containing a json string.
// The outside dimension will have one row for each buffer request (bounding box) returned
// by google places.
// Each row will contain one cell for each place returned by that request.
// Each cell will contain one json string, representing one place.

function parse_places_array (json_array)
  {
  // we must create an array of objects to hold the result data
  var places_data = new Array();

  var total_places = 0;  // total places we've parsed into the object array
  
  // we need a two-dimensional loop to traverse the array
  for (var request_index = 0; request_index < json_array.length; request_index += 1)
    {
    for (var place_index = 0; place_index < json_array[request_index].length; place_index += 1)
      {
      places_data[total_places] = JSON.parse (json_array[json_index]);
      total_places += 1;
      }
    }
  return total_places;
  }
  
