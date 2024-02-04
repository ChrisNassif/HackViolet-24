let BLUR_LEVELS = ["0px", "4px"];

function elementBlur(elem) {
        elem.style.filter = "blur(" + BLUR_LEVELS[1] + ")";
        elem.setAttribute("is-blurred", "true");
}

function elementUnblur(elem) {
    //elem.style.filter = "blur(" + BLUR_LEVELS[0] + ")";
    elem.style.filter = "none";
    elem.setAttribute("is-blurred", "false");
    void elem.offsetHeight;
}

function checkIfElementsAreMisogynistic(elem) {
    // Placeholder for real implementation
    return elem.innerText === "hi";
}

function onTabLoaded() {
    let allElements = document.querySelectorAll("*");
    for (let i = 0; i < allElements.length; i++) {
        let elem = allElements[i];
        if (elem.innerText && elem.textContent && elem.innerText.trim().length > 0 && checkIfElementsAreMisogynistic(elem)) {
            elementBlur(elem);
        }
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'TabLoaded') {
        onTabLoaded();
    }
});

document.addEventListener("click", function(event) {
    if (event.target.getAttribute("is-blurred") === "true") {   
        elementUnblur(event.target);
    }
}, true);

