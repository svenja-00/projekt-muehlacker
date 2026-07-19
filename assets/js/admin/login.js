// ===================================================
// Projekt Mühlacker
// Login
// ===================================================

const loginForm =
    document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    // Test-Login
    if (
        username === "admin" &&
        password === "muehlacker"
    ) {

        window.location.href =
            "admin.html?dashboard";

    }

    else {

        alert(
            "Benutzername oder Passwort ist falsch."
        );

    }

});