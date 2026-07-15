// ===============================
// Mobile Menü
// ===============================

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeButton = document.querySelector(".close-menu");

// Menü öffnen
menuButton.addEventListener("click", () => {

    mobileMenu.classList.add("open");

});

// Menü schließen
closeButton.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

});

// Beim Klick auf einen Menüpunkt schließen
document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});