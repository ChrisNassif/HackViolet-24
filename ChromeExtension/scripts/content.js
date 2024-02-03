let BLUR_LEVELS = ["0px", "4px"]

function toggleElementBlur(elem) {
    var elemIsBlurred = elem.getAttribute("isblurred") || false;

    if (elemIsBlurred) {
        elem.style.webkitFilter = "blur(" + BLUR_LEVELS[0] + ")";
    }
    else {
        elem.style.webkitFilter = "blur(" + BLUR_LEVELS[1] + ")";
    }

    elem.setAttribute("blur-level", !elemIsBlurred);
}

function checkIfElementsAreMisogynistic(elem) {
    if (elem.innerText == "hi") {
        return true;
    }
    return false;
}

function onTabLoaded() {
    let allElements = document.querySelectorAll("*");

    for (let i = 0; i < allElements.length; i++) {
        let elem = allElements[i];
        if (elem.innerText != undefined && elem.textContent != undefined && elem.innerText.length > 0 && checkIfElementsAreMisogynistic(elem)) {
            toggleElementBlur(elem);
        }
    }
}

document.querySelector("*").addEventListener(
    "click",
    function(event) {
        alert(typeof event.target.getAttribute("blur-level"));
        alert(event.target.getAttribute("blur-level"));
        // toggleElementBlur(event.target);
        if (event.target.getAttribute("blur-level") == "true") {
            toggleElementBlur(event.target);
        }
    },
    true
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'TabLoaded') {
        onTabLoaded();
    }
});