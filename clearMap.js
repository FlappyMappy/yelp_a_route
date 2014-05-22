//app/clearBoxes.js

function clearMap () {
  if (bboxArray != null) {
    for (var i = 0; i <bboxArray.length; i++) {
      bboxArray[i].setMap(null);
    }
  }
  bboxArray = null;
};
