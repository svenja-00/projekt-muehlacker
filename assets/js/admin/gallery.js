// ===================================================
// Projekt Mühlacker
// Galerieverwaltung
// ===================================================

let gallery = [];

async function loadGallery(){

    try{

        const response =
            await fetch("assets/data/gallery.json");

        gallery =
            await response.json();

        console.log("Galerie geladen", gallery);

    }

    catch(error){

        console.error(
            "Fehler beim Laden der Galerie",
            error
        );

    }

}