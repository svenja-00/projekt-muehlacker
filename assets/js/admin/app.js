// ===================================================
// Projekt Mühlacker
// Projektverwaltung
// ===================================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("Projektverwaltung gestartet");

    await loadTasks();
    await loadGallery();

    initNavigation();

});


// ===================================================
// Navigation
// ===================================================

function initNavigation(){

    const links = document.querySelectorAll(".admin-link");

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            links.forEach(item=>item.classList.remove("active"));

            link.classList.add("active");

            const page = link.dataset.page;

            switch(page){

                case "dashboard":

                    location.reload();

                    break;

                case "tasks":

                    renderTasksView();

                    break;

                case "gallery":

                    alert("Galerie folgt");

                    break;

                case "timeline":

                    alert("Bautagebuch folgt");

                    break;

                case "settings":

                    alert("Einstellungen folgen");

                    break;

            }

        });

    });

}