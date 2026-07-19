// ===================================================
// Aufgabenansicht
// ===================================================

function renderTasksView() {

    console.log("renderTasksView gestartet");
    const container = document.querySelector(".admin-dashboard");

    if (!container) return;

    let html = `

        <div class="card card-padding">

            <div class="tasks-header">

                <h2>Aufgaben</h2>

                <button class="button-primary">

                    + Neue Aufgabe

                </button>

            </div>

    `;

    tasks.groups.forEach(group => {

        let total = 0;
        let done = 0;

        group.categories.forEach(category => {

            category.tasks.forEach(task => {

                total++;

                if (task.status === "done") {

                    done++;

                }

            });

        });

        html += `

            <div class="task-group">

                <div class="task-group-header">

                    <h3>

                        ${group.icon}
                        ${group.title}

                    </h3>

                    <span>

                        ${done} / ${total}

                    </span>

                </div>

        `;

        group.categories.forEach(category => {

            html += `

                <h4>

                    ${category.title}

                </h4>

                <ul class="task-list">

            `;

            category.tasks.forEach(task => {

                let icon = "⬜";

                if(task.status === "done"){

                    icon = "✅";

                }

                if(task.status === "doing"){

                    icon = "🟡";

                }

                html += `

    <li
        class="task-item"
        data-group="${group.id}"
        data-category="${category.title}"
        data-task="${task.title}"
    >

        <span class="task-status">

            ${icon}

        </span>

        <span class="task-title">

            ${task.title}

        </span>

    </li>

`;

            });

            html += `

                </ul>

            `;

        });

        html += `

            </div>

        `;

    });

    html += `

        </div>

    `;

    container.innerHTML = html;
        initTaskEvents();
}

// ===================================================
// Aufgaben-Events
// ===================================================

function initTaskEvents() {
console.log("initTaskEvents gestartet");
    const taskItems = document.querySelectorAll(".task-item");

    taskItems.forEach(item => {

        item.addEventListener("click", () => {

    toggleTaskStatus(

        item.dataset.group,
        item.dataset.category,
        item.dataset.task

    );

});

    });

}

function toggleTaskStatus(groupId, categoryTitle, taskTitle) {

    const group = tasks.groups.find(g => g.id === groupId);

    if (!group) return;

    const category = group.categories.find(c => c.title === categoryTitle);

    if (!category) return;

    const task = category.tasks.find(t => t.title === taskTitle);

    if (!task) return;

    switch (task.status) {

        case "todo":
            task.status = "doing";
            break;

        case "doing":
            task.status = "done";
            break;

        default:
            task.status = "todo";
            break;
    }

    renderTasksView();

}