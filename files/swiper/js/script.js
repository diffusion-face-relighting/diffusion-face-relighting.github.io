var swiper_relit = new Swiper("#s1", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  preloadImages: false,
  loop: false,
  // rewind:true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
    dynamicMainBullets: 4,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper_relit = new Swiper("#s2", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  preloadImages: false,
  loop: false,
  // rewind:true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
    dynamicMainBullets: 4,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper_rot = new Swiper(".s4", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  // loop: true,
  // loopedSlides:9,
  preloadImages: false,
  loop: false,
  // rewind:true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
    dynamicMainBullets: 4,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiper_rot.on('slideChange', function() {
  // Get the active slide
  var activeSlide = swiper_rot.slides[swiper_rot.activeIndex];

  // Check if the previously active slide contains a video element with class "vidmov"
  var prevVideoEl = swiper_rot.slides[swiper_rot.previousIndex].querySelector('.vidrot');
  if (prevVideoEl) {
    // If there is a video element on the previous slide, pause it
    prevVideoEl.pause();
  }

  // Check if the active slide contains a video element with class "vidmov"
  var videoEl = activeSlide.querySelector('.vidrot');
  if (videoEl) {
    // If there is a video element, play it
    videoEl.play();
  }
});

var swiper_movie = new Swiper(".s3", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  // loop: true,
  // loopedSlides:9,
  preloadImages: false,
  loop: false,
  // rewind:true,
  centerSlide: 'true',
  fade: 'true',
  followFinger: false,
  grabCursor: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
    dynamicMainBullets: 4,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiper_movie.on('slideChange', function() {
  swiper_movie.slides[swiper_movie.previousIndex].querySelectorAll('.vidmov').forEach((el) => {
    el.pause();
  });
  swiper_movie.slides[swiper_movie.activeIndex].querySelectorAll('.vidmov').forEach((el) => {
    el.play();
  });
});

swiper_movie.allowTouchMove = false;
const lastBullet = swiper_movie.pagination.bullets[swiper_movie.pagination.bullets.length - 1];

const defaultImage = 'https://em-content.zobj.net/source/microsoft-teams/337/upside-down-face_1f643.png';
const selectedImage = 'https://em-content.zobj.net/source/microsoft-teams/337/party-popper_1f389.png';

// Set the default background image for the last bullet
lastBullet.style.backgroundImage = `url(${defaultImage})`;
lastBullet.style.backgroundSize = 'contain';
lastBullet.style.backgroundRepeat = 'no-repeat'; // Set background-repeat to no-repeat
lastBullet.style.backgroundPosition = 'center'; // Set background-position to center
lastBullet.style.width = '45px';
lastBullet.style.height = '25px';
lastBullet.innerHTML = ''; // Remove any existing content from the bullet element
lastBullet.style.transform = 'translateY(-5px)';

// Set the display and justify-content properties for the swiper-pagination container element
swiper_movie.pagination.el.style.display = 'flex';
swiper_movie.pagination.el.style.justifyContent = 'center';

// Add a listener for the swiper slideChange event
swiper_movie.on('slideChange', function() {
  // Get the index of the currently active slide
  const activeIndex = swiper_movie.realIndex;

  // Check if the last bullet is currently active
  if (activeIndex === swiper_movie.pagination.bullets.length - 1) {
    // Replace the background image with the selected state image
    lastBullet.style.backgroundImage = `url(${selectedImage})`;
  } else {
    // Replace the background image with the default image
    lastBullet.style.backgroundImage = `url(${defaultImage})`;
  }
});

// swiper_movie.allowTouchMove = false;
// const lastBullet = swiper_movie.pagination.bullets[swiper_movie.pagination.bullets.length - 1];

// const newImage = document.createElement('img');
// newImage.src = 'https://em-content.zobj.net/source/microsoft-teams/337/upside-down-face_1f643.png';
// newImage.style.width = '40px';
// newImage.style.height = '40px';

// // Replace the background of the last bullet with the new image
// lastBullet.style.backgroundImage = `url(${newImage.src})`;
// lastBullet.style.backgroundSize = 'contain';
// lastBullet.style.width = '40px';
// lastBullet.style.height = '20px';
// lastBullet.innerHTML = ''; // Remove any existing content from the bullet element
// // lastBullet.appendChild(newImage);

// console.log("GGGG", lastBullet);
