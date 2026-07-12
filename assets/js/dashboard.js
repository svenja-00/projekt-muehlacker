// ===================================================
// Projekt Mühlacker
// Dashboard
// ===================================================

async function loadDashboard() {

    try {

        // Beide Dateien gleichzeitig laden
        const [siteResponse, tasksResponse] = await Promise.all([
            fetch("assets/data/site.json"),
            fetch("assets/data/tasks.json")
        ]);

        const site = await siteResponse.json();
        const tasks = await tasksResponse.json();

        renderConstructionDay(site, tasks);
        renderStats(site, tasks);

    }

    catch (error) {

        console.error("Dashboard konnte nicht geladen werden:", error);

    }

}

loadDashboard();


// ===================================================
// Baustellentag
// ===================================================

function renderConstructionDay(site, tasks) {

    const constructionDay = site.constructionDay;

    const constructionDate = constructionDay.date;

    const plannedTasks = [];

    tasks.groups.forEach(group => {

        group.categories.forEach(category => {

            category.tasks.forEach(task => {

                if (task.plannedFor === constructionDate) {

                    plannedTasks.push({

    group: group.title,

    icon: group.icon,

    title: task.title,

    status: task.status

});

                }

            });

        });

    });

    updateConstructionCard(constructionDay, plannedTasks);

renderConstructionDetails(plannedTasks);

}


// ===================================================
// Karte aktualisieren
// ===================================================

function updateConstructionCard(day, plannedTasks) {

    const date = new Date(day.date);

    const weekdays = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ];

    const dayName =
        weekdays[date.getDay()];

    document.getElementById("next-day").textContent =
        dayName;

    document.getElementById("next-date").textContent =
        date.toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("planned-tasks").textContent =
        `${plannedTasks.length} Aufgaben geplant`;

    document.getElementById("start-time").textContent =
        `${day.time} Uhr`;

    // Tage bis Baustellentag

    const today = new Date();

    today.setHours(0,0,0,0);

    const target = new Date(day.date);

    target.setHours(0,0,0,0);

    const diff =
        Math.ceil((target - today) / (1000 * 60 * 60 * 24));

    const status =
        diff === 0
            ? "Heute"
            : `In ${diff} Tagen`;

    document.getElementById("day-status").textContent =
        status;

}


// ===================================================
// Dashboardzahlen
// ===================================================

function renderStats(site, tasks) {

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

    const progress =
        Math.round(done / total * 100);

    document.getElementById("progress-value").textContent =
        `${progress}%`;

    document.getElementById("photo-count").textContent =
        site.stats.photos;

}
function renderConstructionDetails(plannedTasks){

    const container =
        document.getElementById("construction-details");

    container.innerHTML = "";

    const grouped = {};

    plannedTasks.forEach(task=>{

        if(!grouped[task.group]){

            grouped[task.group]=[];

        }

        grouped[task.group].push(task);

    });

    Object.keys(grouped).forEach(group=>{

        const section =
            document.createElement("div");

        section.className="day-group";

        section.innerHTML=`

            <h4>

                ${group}

            </h4>

            ${grouped[group].map(task=>`

                <div class="day-task">

                    <span class="day-dot ${task.status}"></span>

                    ${task.title}

                </div>

            `).join("")}

        `;

        container.appendChild(section);

    });

}

const nextDayCard =
document.querySelector(".next-day");

nextDayCard.addEventListener("click",()=>{

    nextDayCard.classList.toggle("open");

});