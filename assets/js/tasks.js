// ===================================================
// Projekt Mühlacker
// Aufgaben laden
// ===================================================

async function loadTasks() {

    try {

        const response = await fetch("assets/data/tasks.json");

        const data = await response.json();

        renderGroups(data.groups);

    }

    catch(error){

        console.error(error);

    }

}

loadTasks();


// ===================================================
// Gruppen rendern
// ===================================================

function renderGroups(groups){

    const container =
        document.getElementById("tasks-container");

    container.innerHTML = "";

    groups.forEach(group=>{

        const card =
            createTaskCard(group);

        container.appendChild(card);

    });

}


// ===================================================
// Eine Aufgabenkarte erzeugen
// ===================================================

function createTaskCard(group){

    const card =
        document.createElement("div");

    card.className = "task-card";

    // ----------------------------
    // Fortschritt berechnen
    // ----------------------------

    let totalTasks = 0;

    let doneTasks = 0;

    group.categories.forEach(category=>{

        category.tasks.forEach(task=>{

            totalTasks++;

            if(task.status==="done"){

                doneTasks++;

            }

        });

    });

    const percent =
        Math.round(doneTasks / totalTasks *100);

    // ----------------------------

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

            <div class="progress-fill"

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

                ${category.tasks.map(task=>`

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
card.addEventListener("click",()=>{

    card.classList.toggle("open");

});
    return card;

}