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

function predictSentiment(data) {
    console.log("PredictSentiment is running.");

    const url = "http://34.207.98.86:8000/predict";
    const headers = {
        "Content-Type": "application/json"
    };

    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.text()); // Convert response to text and return it
}

/*
function predictSentiment(data) {
    console.log("PredictSentiment is running.");

    const url = "http://34.207.98.86:8000/predict";
    const headers = {
        "Content-Type": "application/json"
    };

    // Create and return a new Promise
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(response => response.text()) // Convert response to text
        .then(text => resolve(text)) // Resolve the promise with the text
        .catch(error => {
            console.error('Error:', error);
            reject(error); // Reject the promise if an error occurs
        });
    });
}*/


function readDocumentText() {
    console.log("read text is running.");
    let allElements = document.querySelectorAll("*");
    const allElemTexts = {"data": ""}
    const elInners = [] // Array of strings

    for (let i = 0; i < allElements.length; i++) {  
        let elem = allElements[i];
        elInners.push(elem.innerText);
    }
    allElemTexts["data"] = elInners;
    return allElemTexts; // allElemTexts = {"data": ["ABC", "DEF", "GHI"...."XYZ"]};
}

function readDocumentObjs() {
    console.log("read obj is running.");
    let allElements = document.querySelectorAll("*");
    const allElems = {"data": ""}
    const els = [] // Array of elem objects

    for (let i = 0; i < allElements.length; i++) {  
        let elem = allElements[i];
        els.push(elem.innerText);
    }
    allElems["data"] = els;
    return allElems; // allElemTexts = {"data": ["ABC", "DEF", "GHI"...."XYZ"]};
}

function findMisogyny() {
    console.log("find miso is running.");
    allTexts = readDocumentText();
    console.log(allTexts);
    out = predictSentiment(allTexts["data"]);
    console.log(out);
    allObjs = readDocumentObjs();
    const allMisoObjs = []

    for(let i=0; i<out.length; i++)
    {
        if(out[i]){
            allMisoObjs.push(allObjs["data"][i]);
        }
    }
    return allMisoObjs;
}

function onTabLoaded() {
    console.log("onTabLoaded is running.");
    let allMisoElements = findMisogyny();
    for(let i=0; i<allMisoElements; i++){
        elementBlur(allMisoElements[i]);
    }

/*
    let allElements = document.querySelectorAll("*");
    for (let i = 0; i < allElements.length; i++) {
        let elem = allElements[i];
        if (elem.innerText && elem.textContent && elem.innerText.trim().length > 0 && checkIfElementsAreMisogynistic(elem)) {
            elementBlur(elem);
        }
    }*/
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

