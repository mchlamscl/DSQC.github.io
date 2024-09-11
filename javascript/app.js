var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 25000;

nextBtn.onclick = function () {
    showSlider('next');
    showElementsByClass('item'); // Pass the class name as a string
}

prevBtn.onclick = function () {
    showSlider('prev');
    showElementsByClass('item'); // Pass the class name as a string
}

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function showElementsByClass(item) {
    var elements = document.querySelectorAll('.' + item);
    elements.forEach(function (element) {
        element.style.display = 'inline-block'; // Or 'inline-block', 'inline', depending on your needs
    });
}

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Touch event handling for mobile
let startX, endX;

carousel.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', function () {
    if (startX > endX + 50) {
        // Swipe left to go to the next slide
        showSlider('next');
    } else if (startX < endX - 50) {
        // Swipe right to go to the previous slide
        showSlider('prev');
    }
});

// Start the initial animation 
resetTimeAnimation();
