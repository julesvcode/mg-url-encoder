// MAIN VARIABLES

const outputResult = document.getElementById('output');
const outputCopy = document.getElementById('output-copy');

const imageWidth = document.querySelector('.ImageWidth');
const linkLibrary = document.getElementById("library");

// CHECKBOXES
const imageCheckbox = document.querySelector('#image');
const fontCheckbox = document.querySelector('#font');
const iconCheckbox = document.querySelector('#icon');

// DISPLAY WIDTH PROPERTY IF IMAGE
imageCheckbox.addEventListener('change', function() {
    if (this.checked) {
        imageWidth.style.display = "block";
    } else {
        imageWidth.style.display = "none";
    }
});

// LIBRARY
const storedLibrary = localStorage.getItem("libraryitems");
if (linkLibrary) {
    linkLibrary.innerHTML = storedLibrary;
};


function encodeFunction() {

    // RETRIEVE VALUES FROM INPUTS
    const urlInput = document.getElementById('input').value;
    const imageWidthValue = document.getElementById('width').value;

    // CUSTOMISE IMAGE URL
    const urlPrefix = "https://musicglue-images-prod.global.ssl.fastly.net/resize?url=";
    const urlSuffix = "&width=" + imageWidthValue + "&mode=contain";
    
    // GENERATE OUTPUT
    let finalOutput;

    // PICK ASSET ICON FOR LIBRARY
    let assetIcon;

    // ENCODE URL
    if (imageCheckbox.checked === true && fontCheckbox.checked === false && iconCheckbox.checked === false) {
        const encodedUrl = encodeURIComponent(urlInput);
        finalOutput = urlPrefix + encodedUrl + urlSuffix;
        outputResult.value = finalOutput;
        assetIcon = "image";
    } else if (fontCheckbox.checked === true && imageCheckbox.checked === false && iconCheckbox.checked === false) {
        finalOutput = urlInput.replace("musicgluewwwassets.s3.amazonaws.com", "musicglue-wwwassets.global.ssl.fastly.net");
        outputResult.value = finalOutput;
        assetIcon = "text_fields";
    } else if (iconCheckbox.checked === true && fontCheckbox.checked === false && imageCheckbox.checked === false) {
        finalOutput = urlInput.replace("musicgluewwwassets.s3.amazonaws.com", "musicglue-wwwassets.global.ssl.fastly.net");
        outputResult.value = finalOutput;
        assetIcon = "language";
    }  else {
        alert("ERROR! You need to tick at least one of the check boxes")
    }

    

    // SAVE TO LIBRARY
    linkLibrary.insertAdjacentHTML("afterbegin", `
    <div class="library__row">
        <div class="row__icon">
            <a id="library-url-copy">
            <span class="material-symbols-outlined" >
                link
            </span>
            </a>
        </div>
        <div class="row__url" id="library-url">
            ${finalOutput}
        </div>
        <div class="row__copy">
            
            <span class="material-symbols-outlined">
                <a class="thumbnail" href="#thumb">
                    ${assetIcon}
                    <span>
                        <img width="250px" src="${finalOutput}">
                    </span>
                </a>
            </span>

        </div>
    </div>
        `);

}



const saveToLocalStorage = () => {
    localStorage.setItem("libraryitems", linkLibrary.innerHTML);
};


const button = document.getElementById('encode');
button.addEventListener("click", encodeFunction);
button.addEventListener("click", saveToLocalStorage);

// Copy output to clipboard
outputCopy.addEventListener("click", function() {
    outputResult.select();
    document.execCommand("Copy");
});

