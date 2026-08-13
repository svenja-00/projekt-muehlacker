console.log("tasks.js geladen");
console.log(db);
// ===================================================
// Projekt Mühlacker
// Öffentliche Aufgaben
// ===================================================

let taskGroups = [];


// ===================================================
// Aufgaben laden
// ===================================================

async function loadTasks() {

    console.log("loadTasks gestartet");

    try {

        const { data, error } = await db
            .from("tasks")
            .select("data")
            .eq("id", "tasks")
            .single();

        if (error) {

            console.error("Fehler beim Laden:", error);
            return;

        }

        taskGroups = data.data.groups;

        console.log("Aufgaben geladen", taskGroups);

        renderGroups(taskGroups);

    }

    catch (error) {

        console.error("Exception:", error);

    }

}


// ===================================================
// Gruppen rendern
// ===================================================

function renderGroups(groups) {

    const container =
        document.getElementById("tasks-container");

    if (!container) {

        console.warn("tasks-container nicht gefunden");
        return;

    }

    container.innerHTML = "";

    groups.forEach(group => {

        container.appendChild(
            createTaskCard(group)
        );

    });

}


// ===================================================
// Aufgabenkarte
// ===================================================

function createTaskCard(group) {

    const card = document.createElement("div");

    card.className =
        "task-card card card-padding card-hover";

    let totalTasks = 0;
    let doneTasks = 0;

    group.categories.forEach(category => {

        category.tasks.forEach(task => {

            totalTasks++;

            if (task.status === "done") {

                doneTasks++;

            }

        });

    });

    const percent =
        totalTasks === 0
            ? 0
            : Math.round(doneTasks / totalTasks * 100);

    card.innerHTML = `

        <div class="task-card-header">

            <div>

                <div class="task-icon">

                    ${group.icon}

                </div>

                <h3>

                    ${group.title}

                </h3>

                <p>

                    ${totalTasks} Aufgaben

                </p>

            </div>

            <span class="expand">

                +

            </span>

        </div>

        <div class="progress-bar">

            <div
                class="progress-fill"
                style="width:${percent}%">

            </div>

        </div>

        <div class="task-progress">

            ${percent}% erledigt

        </div>

        <div class="task-details">

            ${group.categories.map(category => `

                <div class="task-category">

                    <h4>${category.title}</h4>

                    <ul>

                        ${category.tasks.map(task => `

                            <li class="status-${task.status}">

                                <span class="status-dot"></span>

                                ${task.title}

                            </li>

                        `).join("")}

                    </ul>

                </div>

            `).join("")}

        </div>

    `;

    card.addEventListener("click", () => {

        card.classList.toggle("open");

    });

    return card;

}


// ===================================================
// Start
// ===================================================

loadTasks();