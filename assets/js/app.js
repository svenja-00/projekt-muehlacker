// ===============================
// Mobile Menü
// ===============================

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

// Menü öffnen / schließen
menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    menuButton.textContent =
        mobileMenu.classList.contains("open") ? "✕" : "☰";

});

// Beim Klick auf einen Menüpunkt schließen
document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuButton.textContent = "☰";

    });

});