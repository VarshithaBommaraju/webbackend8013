
function navigationOpen() {
    var navigateFrom = document.getElementById("myNavigation");
    if (navigateFrom.className === "navbar") {
      navigateFrom.className += " responsive";
    } else {
      navigateFrom.className = "navbar";
    }
  }