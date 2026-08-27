"use strict";

var form = document.getElementById("login-form");
var message = document.getElementById("login-message");

var ADMIN_EMAIL = "admin@smartlocalmarketplace.com";
var ADMIN_PASSWORD = "admin123";

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        var password = document
            .getElementById("password")
            .value;

        if (
            email !== ADMIN_EMAIL ||
            password !== ADMIN_PASSWORD
        ) {
            message.textContent =
                "Invalid admin email or password.";

            message.className = "error";

            return;
        }

        localStorage.setItem(
            "smartLocalMarketplaceAdminLoggedIn",
            "true"
        );

        message.textContent =
            "Login successful. Redirecting...";

        message.className = "success";

        setTimeout(function () {
            window.location.href =
                "admin-dashboard.html";
        }, 700);
    });
}