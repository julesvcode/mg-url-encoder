const output = document.getElementById('output');
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

function encodeFunction() {
    // RETRIEVE VALUES FROM INPUTS
    const url = document.getElementById('input').value;
    const imageWidthValue = document.getElementById('width').value;

    // CUSTOMISE URL
    const urlPrefix = "https://musicglue-images-prod.global.ssl.fastly.net/resize?url=";
    const urlSuffix = "&width=" + imageWidthValue + "&mode=contain";
    let finalOutput;

    // ENCODE URL
    if (imageCheckbox.checked === true && fontCheckbox.checked === false && iconCheckbox.checked === false) {
        const output = encodeURIComponent(url);
        finalOutput = urlPrefix + output + urlSuffix;
        document.getElementById('output').value = finalOutput;
    } else if (fontCheckbox.checked === true && imageCheckbox.checked === false && iconCheckbox.checked === false) {
        finalOutput = url.replace("musicgluewwwassets.s3.amazonaws.com", "musicglue-wwwassets.global.ssl.fastly.net");
        document.getElementById('output').value = finalOutput;
    } else if (iconCheckbox.checked === true && fontCheckbox.checked === false && imageCheckbox.checked === false) {
        finalOutput = url.replace("musicgluewwwassets.s3.amazonaws.com", "musicglue-wwwassets.global.ssl.fastly.net");
        document.getElementById('output').value = finalOutput;
    }  else {
        alert("ERROR! You need to tick at least one of the check boxes")
    }

    // SAVE TO LIBRARY
    linkLibrary.innerHTML += `<p>${finalOutput}</p>`;
}


const button = document.getElementById('encode');
button.addEventListener("click", encodeFunction);

outputCopy.addEventListener("click", function() {
    output.select();
    document.execCommand("Copy");
});
