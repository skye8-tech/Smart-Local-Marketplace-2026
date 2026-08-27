"use strict";

var STORAGE_KEY = "smartLocalMarketplaceSellers";

var form = document.getElementById("seller-registration-form");
var message = document.getElementById("registration-message");

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

function saveSellers(sellers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sellers));
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

        var sellerName = document.getElementById("seller-name").value.trim();
        var businessName = document.getElementById("business-name").value.trim();
        var email = document.getElementById("seller-email").value.trim().toLowerCase();
        var phone = document.getElementById("seller-phone").value.trim();
        var location = document.getElementById("seller-location").value;
        var category = document.getElementById("seller-category").value;
        var description = document.getElementById("business-description").value.trim();
        var password = document.getElementById("seller-password").value;
        var confirmPassword = document.getElementById("confirm-password").value;
        var terms = document.getElementById("seller-terms").checked;

        if (
            !sellerName ||
            !businessName ||
            !email ||
            !phone ||
            !location ||
            !category ||
            !description ||
            !password ||
            !confirmPassword
        ) {
            showMessage("Please fill in all fields.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match.", "error");
            return;
        }

        if (!terms) {
            showMessage("Please accept the Terms and Conditions.", "error");
            return;
        }

        var sellers = getSellers();

        var existingSeller = sellers.find(function (seller) {
            return seller.email === email;
        });

        if (existingSeller) {
            showMessage(
                "An account already exists with this email. Please login.",
                "error"
            );
            return;
        }

        var seller = {
            id: "seller-" + Date.now(),
            sellerName: sellerName,
            businessName: businessName,
            email: email,
            phone: phone,
            location: location,
            category: category,
            description: description,
            password: password,
            status: "Pending",
            verified: false,
            createdAt: new Date().toISOString()
        };

        sellers.push(seller);

        saveSellers(sellers);

        localStorage.setItem(
            "smartLocalMarketplaceCurrentSeller",
            seller.id
        );

        showMessage(
            "Seller account created successfully. Redirecting...",
            "success"
        );

        setTimeout(function () {
            window.location.href = "seller-dashboard.html";
        }, 1000);
    });
}