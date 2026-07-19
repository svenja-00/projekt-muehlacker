// ===================================================
// Projekt Mühlacker
// Aufgaben
// ===================================================

let tasks = [];

// ---------------------------------------------------
// Daten laden
// ---------------------------------------------------

async function loadTasks() {

    try {

        const response = await fetch("assets/data/tasks.json");

        tasks = await response.json();

        console.log("Aufgaben geladen", tasks);

    }

    catch (error) {

        console.error("Fehler beim Laden der Aufgaben", error);

    }

}