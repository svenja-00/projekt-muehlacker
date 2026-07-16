console.log("Lightbox.js geladen");

// ===================================================
// Projekt Mühlacker
// Lightbox
// ===================================================

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const closeButton =
    document.querySelector(".lightbox-close");

const prevButton =
    document.querySelector(".lightbox-prev");

const nextButton =
    document.querySelector(".lightbox-next");

    const counter =
    document.getElementById("lightbox-counter");

let currentImages = [];

let currentIndex = 0;

// ===================================================
// Swipe
// ===================================================

let touchStartX = 0;

let touchEndX = 0;


function updateCounter(){

    counter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}
// ===================================================
// Öffnen
// ===================================================

function openLightbox(images, index){

    console.log("Lightbox geöffnet", index);

    currentImages = images;

    currentIndex = index;

    lightboxImage.src =
        currentImages[currentIndex].image;

     updateCounter();

    lightbox.classList.add("open");

}


// ===================================================
// Nächstes Bild
// ===================================================

function nextImage(){

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;

    }

    lightboxImage.src =
        currentImages[currentIndex].image;
updateCounter();
}


// ===================================================
// Vorheriges Bild
// ===================================================

function previousImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
            currentImages.length - 1;

    }

    lightboxImage.src =
        currentImages[currentIndex].image;
updateCounter();
}

// ===================================================
// Schließen
// ===================================================

function closeLightbox(){

    lightbox.classList.remove("open");

}


// X

closeButton.addEventListener("click", closeLightbox);


// Hintergrund

lightbox.addEventListener("click",(event)=>{

    if(event.target === lightbox){

        closeLightbox();

    }

});

nextButton.addEventListener("click", nextImage);

prevButton.addEventListener("click", previousImage);

// ===================================================
// Swipe starten
// ===================================================

lightbox.addEventListener("touchstart",(event)=>{

    touchStartX = event.changedTouches[0].screenX;

});


// ===================================================
// Swipe Ende
// ===================================================

lightbox.addEventListener("touchend",(event)=>{

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});

// ESC

document.addEventListener("keydown",(event)=>{

    if(!lightbox.classList.contains("open")) return;

    if(event.key==="Escape"){

        closeLightbox();

    }

    if(event.key==="ArrowRight"){

        nextImage();

    }

    if(event.key==="ArrowLeft"){

        previousImage();

    }

});

// ===================================================
// Swipe erkennen
// ===================================================

function handleSwipe(){

    const distance =
        touchEndX - touchStartX;

    // mindestens 60 Pixel wischen
    if(Math.abs(distance) < 60){

        return;

    }

    if(distance < 0){

        nextImage();

    }

    else{

        previousImage();

    }

}