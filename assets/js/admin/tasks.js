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
        return;

    }

    console.log("Aufgaben gespeichert");

}


// ===================================================
// Aufgabe finden
// ===================================================

function findTask(groupId, categoryTitle, taskTitle) {

    const group = tasks.groups.find(
        group => group.id === groupId
    );

    if (!group) return null;

    const category = group.categories.find(
        category => category.title === categoryTitle
    );

    if (!category) return null;

    return category.tasks.find(
        task => task.title === taskTitle
    );

}


// ===================================================
// Status ändern
// ===================================================

async function updateTaskStatus(
    groupId,
    categoryTitle,
    taskTitle,
    status
) {

    const task = findTask(
        groupId,
        categoryTitle,
        taskTitle
    );

    if (!task) return;

    task.status = status;

    await saveTasks();

}