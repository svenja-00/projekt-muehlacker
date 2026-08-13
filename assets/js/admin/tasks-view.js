// ===================================================
// Aufgabenansicht
// ===================================================

function renderTasksView() {

    console.log("renderTasksView gestartet");

    const container = document.querySelector(".admin-dashboard");

    if (!container) return;

    let html = `

<div class="tasks-toolbar">

    <button id="add-task-btn" class="btn-primary">

        + Aufgabe hinzufügen

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

                    <h3>${group.icon} ${group.title}</h3>

                    <span>${done} / ${total}</span>

                </div>

        `;

        group.categories.forEach(category => {

            html += `

                <h4>${category.title}</h4>

                <ul class="task-list">

            `;

            category.tasks.forEach(task => {

                let icon = "⬜";

                if (task.status === "doing") icon = "🟡";
                if (task.status === "done") icon = "✅";

                html += `

                    <li
                        class="task-item"
                        data-group="${group.id}"
                        data-category="${category.title}"
                        data-task="${task.title}"
                    >

                        <span class="task-status">${icon}</span>

                        <span class="task-title">${task.title}</span>

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

    container.innerHTML = html;

initTaskEvents();
initAddTaskButton();

}


// ===================================================
// Aufgaben Events
// ===================================================

function initTaskEvents() {

    document.querySelectorAll(".task-item").forEach(item => {

        item.addEventListener("click", async () => {

            const task = findTask(

                item.dataset.group,
                item.dataset.category,
                item.dataset.task

            );

            if (!task) return;

            showTaskModal(task);

            

        });

    });

}
function initAddTaskButton() {

    const button = document.getElementById("add-task-btn");

    if (!button) return;

    button.addEventListener("click", () => {

        showTaskModal();

    });

}
function showTaskModal(task = null) {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `

<div class="modal">

    <h2>Neue Aufgabe</h2>

    <label>Titel</label>

    <input
        type="text"
        id="new-task-title"
        placeholder="z.B. Fensterbank montieren"
    >

    <label>Gruppe</label>

    <select id="new-task-group"></select>

    <label>Kategorie</label>

    <select id="new-task-category"></select>

    <label>Status</label>

    <select id="new-task-status">

        <option value="todo">Todo</option>
        <option value="doing">In Arbeit</option>
        <option value="done">Erledigt</option>

    </select>

    <div class="modal-buttons">

        <button id="cancel-task">Abbrechen</button>

        <button id="save-task" class="btn-primary">

            Speichern

        </button>

    </div>

</div>

`;

    document.body.appendChild(modal);
    if (task) {

    document.querySelector(".modal h2").textContent = "Aufgabe bearbeiten";

} else {

    document.querySelector(".modal h2").textContent = "Neue Aufgabe";

}
if (task) {

    document.getElementById("new-task-title").value = task.title;

}
if (task) {

    document.getElementById("new-task-status").value = task.status;

}
if (!task) {

    document.getElementById("new-task-title").focus();

}
    const groupSelect = document.getElementById("new-task-group");

tasks.groups.forEach(group => {

    groupSelect.innerHTML += `

        <option value="${group.id}">

            ${group.title}

        </option>

    `;

});

const categorySelect = document.getElementById("new-task-category");

function loadCategories() {

    const group = tasks.groups.find(g => g.id === groupSelect.value);

    categorySelect.innerHTML = "";

    group.categories.forEach(category => {

        categorySelect.innerHTML += `

            <option>

                ${category.title}

            </option>

        `;

    });

}

loadCategories();

groupSelect.addEventListener("change", loadCategories);

    document.getElementById("cancel-task").onclick = () => {

        modal.remove();

    };

    document.getElementById("save-task").onclick = async () => {

    const title = document
        .getElementById("new-task-title")
        .value
        .trim();

    if (!title) {

        alert("Bitte einen Titel eingeben.");
        return;

    }

    const status =
        document.getElementById("new-task-status").value;

    if (task) {

        // ===== Aufgabe bearbeiten =====

        task.title = title;
        task.status = status;

    } else {

        // ===== Neue Aufgabe =====

        const groupId =
            document.getElementById("new-task-group").value;

        const categoryTitle =
            document.getElementById("new-task-category").value;

        const group =
            tasks.groups.find(g => g.id === groupId);

        const category =
            group.categories.find(c => c.title === categoryTitle);

        category.tasks.push({

            title,
            status

        });

    }

    const success = await saveTasks();

    if (success) {

        modal.remove();

        renderTasksView();

    }

};

}