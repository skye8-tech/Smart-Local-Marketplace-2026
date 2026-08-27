"use strict";

var STORAGE_KEY = "smartLocalMarketplaceSellers";

var form = document.getElementById("seller-login-form");
var message = document.getElementById("login-message");

function getSellers() {
    var data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        var sellers = JSON.parse(data);

        return Array.isArray(sellers) ? sellers : [];
    } catch (error) {
        return [];
    }
}

function showMessage(text, type) {
    if (!message) {
        return;
    }

    message.textContent = text;
    message.className = "registration-message " + type;
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document
            .getElementById("seller-email")
            .value
            .trim()
            .toLowerCase();

        var password = document
            .getElementById("seller-password")
            .value;

        var sellers = getSellers();

        var seller = sellers.find(function (item) {
            return (
                item.email === email &&
                item.password === password
            );
        });

        if (!seller) {
            showMessage(
                "Invalid email or password.",
                "error"
            );
            return;
        }

        localStorage.setItem(
            "smartLocalMarketplaceCurrentSeller",
            seller.id
        );

        showMessage(
            "Login successful. Redirecting...",
            "success"
        );

        setTimeout(function () {
            window.location.href = "seller-dashboard.html";
        }, 700);
    });
}