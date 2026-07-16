// ===================================================
// Projekt Mühlacker
// Galerie
// ===================================================

const galleryCategories = [

    {
        id: "all",
        name: "Alle"
    },

    {
        id: "abriss",
        name: "Abriss"
    },

    {
        id: "aussen",
        name: "Außen"
    },

    {
        id: "dach",
        name: "Dach"
    },

    {
        id: "geruest",
        name: "Gerüst"
    },

    {
        id: "haus",
        name: "Haus"
    }

];

let activeCategory = "all";


// ===================================================
// Start
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

    renderCategoryButtons();
loadGallery("all");
});


// ===================================================
// Kategorien
// ===================================================

function renderCategoryButtons(){

    const container =
        document.getElementById("gallery-categories");

    container.innerHTML = "";

    galleryCategories.forEach(category=>{

        const button =
            document.createElement("button");

        button.className = "gallery-filter";

        if(category.id === activeCategory){

            button.classList.add("active");

        }

        button.textContent = category.name;

        button.addEventListener("click",()=>{

            activeCategory = category.id;

            renderCategoryButtons();

            loadGallery(category.id);

        });

        container.appendChild(button);

    });

}


// ===================================================
// Galerie laden
// ===================================================

async function loadGallery(category){

    const response =
        await fetch("assets/data/gallery.json");

    const data =
        await response.json();

    let images = data.images;

    if(category !== "all"){

        images = images.filter(image =>

            image.category === category

        );

    }

    renderGallery(images);

}

// ===================================================
// Galerie anzeigen
// ===================================================

function renderGallery(images){

    const grid =
        document.getElementById("gallery-grid");

    grid.innerHTML = "";

    images.forEach((image, index)=>{

        const card =
            document.createElement("div");

        card.className = "gallery-card";

        card.innerHTML = `

            <img

                src="${image.image}"

                alt="Projekt Mühlacker"

                loading="lazy"

            >

        `;

        // Bild anklicken
        card.addEventListener("click",()=>{

            openLightbox(images, index);

        });

        grid.appendChild(card);

    });

}
