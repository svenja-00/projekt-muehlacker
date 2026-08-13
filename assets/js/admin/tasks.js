// ===================================================
// Projekt Mühlacker
// Aufgaben
// ===================================================

let tasks = [];


// ===================================================
// Aufgaben laden
// ===================================================

async function loadTasks() {

    const { data, error } = await db
        .from("tasks")
        .select("data")
        .eq("id", "tasks")
        .single();

    if (error) {

        console.error("Fehler beim Laden:", error);
        return;

    }

    tasks = data.data;

    document.getElementById("admin-progress").textContent =
        calculateProgress() + "%";

    document.getElementById("admin-tasks").textContent =
        calculateOpenTasks();

    console.log("Aufgaben geladen", tasks);

}


// ===================================================
// Aufgaben speichern
// ===================================================

async function saveTasks() {

    const { error } = await db
        .from("tasks")
        .update({
            data: tasks
        })
        .eq("id", "tasks");

    if (error) {

        console.error("Fehler beim Speichern:", error);
        return false;

    }

    console.log("Aufgaben gespeichert");

    return true;

}


// ===================================================
// Fortschritt berechnen
// ===================================================

function calculateProgress() {

    let total = 0;
    let done = 0;

    tasks.groups.forEach(group => {

        group.categories.forEach(category => {

            category.tasks.forEach(task => {

                total++;

                if (task.status === "done") {

                    done++;

                }

            });

        });

    });

    if (total === 0) return 0;

    return Math.round(done / total * 100);

}


// ===================================================
// Offene Aufgaben berechnen
// ===================================================

function calculateOpenTasks() {

    let open = 0;

    tasks.groups.forEach(group => {

        group.categories.forEach(category => {

            category.tasks.forEach(task => {

                if (task.status !== "done") {

                    open++;

                }

            });

        });

    });

    return open;

}


// ===================================================
// Aufgabe finden
// ===================================================

function findTask(groupId, categoryTitle, taskTitle) {

    const group = tasks.groups.find(g => g.id === groupId);

    if (!group) return null;

    const category = group.categories.find(c => c.title === categoryTitle);

    if (!category) return null;

    return category.tasks.find(t => t.title === taskTitle);

}