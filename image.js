const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const uploadButton = document.getElementById('upload-button');
const brightnessSlider = document.getElementById('brightnessSlider');
const contrastSlider = document.getElementById('contrastSlider');
const grayscaleSlider = document.getElementById('grayscaleSlider');
const hueRotateSlider = document.getElementById('hueRotateSlider');
const saturationSlider = document.getElementById('saturationSlider');
const sepiaSlider = document.getElementById('sepiaSlider');
const sourceImage = document.getElementById('sourceImage'); // Reference to the <img> tag

let image = new Image();
let originalImage = null;

function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            originalImage = e.target.result; // Save the original image
        };
        reader.readAsDataURL(file);
    }
}

image.onload = () => {
    // Once the image is loaded, draw it on the canvas
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Update the <img> tag with the uploaded image
    sourceImage.src = image.src;
};

function applyFilter() {
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    const grayscale = grayscaleSlider.value;
    const hue = hueRotateSlider.value;
    const saturation = saturationSlider.value;
    const sepia = sepiaSlider.value;

    const filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        grayscale(${grayscale}%)
        hue-rotate(${hue}deg)
        saturate(${saturation}%)
        sepia(${sepia}%)
    `;
    context.filter = filter;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function resetImage() {
    if (originalImage) {
        image.src = originalImage;
        image.onload = () => {
            context.filter = 'none';
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Update the <img> tag with the original image
            sourceImage.src = originalImage;

            // Reset sliders
            brightnessSlider.value = 100;
            contrastSlider.value = 100;
            grayscaleSlider.value = 0;
            hueRotateSlider.value = 0;
            saturationSlider.value = 100;
            sepiaSlider.value = 0;
        };
    }
}

function saveImage() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Example preset filters
function brightenFilter() {
    brightnessSlider.value = 150;
    contrastSlider.value = 110;
    applyFilter();
}

function bwFilter() {
    grayscaleSlider.value = 100;
    contrastSlider.value = 120;
    applyFilter();
}

function funkyFilter() {
    hueRotateSlider.value = 180;
    saturationSlider.value = 150;
    applyFilter();
}

function vintageFilter() {
    sepiaSlider.value = 80;
    brightnessSlider.value = 110;
    applyFilter();
}

// Event listeners for sliders
brightnessSlider.addEventListener('input', applyFilter);
contrastSlider.addEventListener('input', applyFilter);
grayscaleSlider.addEventListener('input', applyFilter);
hueRotateSlider.addEventListener('input', applyFilter);
saturationSlider.addEventListener('input', applyFilter);
sepiaSlider.addEventListener('input', applyFilter);
