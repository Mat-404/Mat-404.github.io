// JavaScript code to create the slideshow

// Get the slideshow container
var slideshow = document.getElementById('slideshow');

// Get the images in the slideshow
var images = slideshow.getElementsByTagName('img');

// Keep track of the current image index
var currentImageIndex = 0;

// Function to switch to the next image
function nextImage() {
  // Remove the 'active' class from the current image
  images[currentImageIndex].classList.remove('active');

  // Increment the current image index
  currentImageIndex++;

  // If the current image index is greater than or equal to the number of images, reset it to 0
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }

  // Apply the 'active' class to the next image
  images[currentImageIndex].classList.add('active');
}

// Set an interval to switch to the next image every 5 seconds
setInterval(nextImage, 5000);