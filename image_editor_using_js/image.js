
var image = document.getElementById('sourceImage');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var brightnessSlider = document.getElementById("brightnessSlider");
var contrastSlider = document.getElementById("contrastSlider");
var grayscaleSlider = document.getElementById("grayscaleSlider");
var hueRotateSlider = document.getElementById("hueRotateSlider");
var saturateSlider = document.getElementById("saturationSlider");
var sepiaSlider = document.getElementById("sepiaSlider");


function uploadImage(event) {

	image.src = URL.createObjectURL(event.target.files[0]);
	image.onload = function () {
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.crossOrigin = "anonymous";
		applyFilter();
	}
	
}

function applyFilter() {

var filterString ="brightness(" + brightnessSlider.value + "%" +") contrast(" + contrastSlider.value + "%" +") grayscale(" + grayscaleSlider.value + "%" +") saturate(" + saturateSlider.value + "%" +") sepia(" + sepiaSlider.value + "%" +") hue-rotate(" + hueRotateSlider.value + "deg" + ")";
context.filter = filterString;
context.drawImage(image, 0, 0);
}

function brightenFilter() {
	resetImage();
	brightnessSlider.value = 130;
	contrastSlider.value = 120;
	saturateSlider.value = 120;
	applyFilter();
}

function bwFilter() {
	resetImage();
	grayscaleSlider.value = 100;
	brightnessSlider.value = 120;
	contrastSlider.value = 120;
	applyFilter();
}

function funkyFilter() {
	resetImage();
	hueRotateSlider.value = Math.floor(Math.random() * 360) + 1;
	contrastSlider.value = 120;
	applyFilter();
}

function vintageFilter() {
	resetImage();
	brightnessSlider.value = 120;
	saturateSlider.value = 120;
	sepiaSlider.value = 150;
	applyFilter();
}

function resetImage() {
	brightnessSlider.value = 100;
	contrastSlider.value = 100;
	grayscaleSlider.value = 0;
	hueRotateSlider.value = 0;
	saturateSlider.value = 100;
	sepiaSlider.value = 0;
	applyFilter();
}

function saveImage() {
	
    var linkElement = document.getElementById('link'); 
	linkElement.setAttribute('download', 'edited_image.png');
	var canvasData = canvas.toDataURL("image/png")  
	canvasData.replace("image/png", "image/octet-stream")  
	linkElement.setAttribute('href', canvasData);   
	linkElement.click();   
	
}
