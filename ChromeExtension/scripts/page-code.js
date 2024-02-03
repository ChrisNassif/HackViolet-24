(function() {
  
var BLUR_LEVELS = ["0px", "4px", "20px"];

function toggleElementBlur(elm) {
    var elmBlurLevel = elm.getAttribute("blur-level") || 0;
    var nextBlurLevel = (elmBlurLevel + 1) % BLUR_LEVELS.length;

    elm.style.webkitFilter = "blur(" + BLUR_LEVELS[nextBlurLevel] + ")";

    elm.setAttribute("blur-level", nextBlurLevel);
}

document.querySelector("*").addEventListener(
    "click",
    function(event) {
        toggleElementBlur(event.target);
    },
    true
);

})();