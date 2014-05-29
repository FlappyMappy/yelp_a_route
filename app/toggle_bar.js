var $ = require ("jquery");

// if the user clicks the toggle bar
$("#toggle-bar").click (function ()
{
  // change the text on the bar from "list view" to "map view" and vice versa
  if ($("#list-box").css ("display") == "none")
  {
    $(this).html ("M<br>A<br>P<br><br>V<br>I<br>E<br>W");
  }
  else
  {
    $(this).html ("L<br>I<br>S<br>T<br><br>V<br>I<br>E<br>W");
  }
  // and show/hide the list view window
  $("#list-box").fadeToggle();
});
