var $ = require ("jquery");

$("#toggle-bar").click (function () {
  if ($("#list-box").css ("visibility") == "hidden")
  {
    $("#list-box").css ("visibility", "visible");
    $(this).html ("M<br>A<br>P<br><br>V<br>I<br>E<br>W");
  }
  else
  {
    $("#list-box").css ("visibility", "hidden");
    $(this).html ("L<br>I<br>S<br>T<br><br>V<br>I<br>E<br>W");
  }
});
