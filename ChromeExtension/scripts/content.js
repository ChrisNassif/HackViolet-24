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

async function predictSentiment(data) {
    const url = "http://127.0.0.1:8000/predict";
    const headers = {
      "Content-Type": "application/json"
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      const text = await response.text();
      return text; // This returns the promise result to the caller
    } catch (error) {
      console.error('Error:', error);
      throw error; // This allows the caller to catch the error
    }
  }

  
  
  // Usage example
  const data = {"data": "I hate women"};
  predictSentiment(data)
    .then(output => console.log(output))
    .catch(error => console.error(error));
  



function readDocumentText(elem) {

}

function checkIfElementsAreMisogynistic(elem) {
    // Stores document text --> x = readDocumentText(elem)
    // Split it by sentences and store in list
    // traverse each sentence in the list and pass it to predictSentiment()
        // store each flagged sentence and the returns it.


    




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

