"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var header = document.getElementById("header");
    var footer = document.getElementById("footer");

    var isPagesFolder =
        window.location.pathname.includes("/pages/");

    var homeLink =
        isPagesFolder
            ? "../index.html"
            : "index.html";

    var productLink =
        isPagesFolder
            ? "product.html"
            : "pages/product.html";

    var categoriesLink =
        isPagesFolder
            ? "catergories.html"
            : "pages/catergories.html";

    var contactLink =
        isPagesFolder
            ? "contact.html"
            : "pages/contact.html";

    var loginLink =
        isPagesFolder
            ? "login.html"
            : "pages/login.html";

    var cartLink =
        isPagesFolder
            ? "cart.html"
            : "pages/cart.html";


    if (header) {

        header.innerHTML = `

            <header class="header">

                <div class="container navbar">

                    <a href="${homeLink}" class="logo">
                        S<span>LM</span>
                    </a>


                    <nav class="nav">

                        <a href="${homeLink}">
                            Home
                        </a>

                        <a href="${productLink}">
                            Products
                        </a>

                        <a href="${categoriesLink}">
                            Categories
                        </a>

                        <a href="${contactLink}">
                            Contact
                        </a>

                    </nav>


                    <div class="nav-actions">

                        <form
                            class="search-box"
                            id="search-form"
                        >

                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search products..."
                                autocomplete="off"
                            >

                            <button type="submit">
                                🔍
                            </button>

                        </form>


                        <a
                            href="${cartLink}"
                            class="cart"
                        >

                            🛒

                            <span class="cart-count">
                                0
                            </span>

                        </a>


                        <a
                            href="${loginLink}"
                            class="login-btn"
                        >
                            Login
                        </a>

                    </div>


                    <button
                        class="menu-toggle"
                        type="button"
                    >
                        ☰
                    </button>

                </div>

            </header>

        `;

    }


    if (footer) {

        footer.innerHTML = `

            <footer class="footer">

                <div class="container">

                    <div class="footer-content">


                        <div class="footer-brand">

                            <h3>
                                Smart Local Marketplace
                            </h3>

                            <p>
                                Discover and shop from trusted
                                local sellers in your community.
                            </p>

                        </div>


                        <div class="footer-links">

                            <h4>
                                Quick Links
                            </h4>

                            <a href="${homeLink}">
                                Home
                            </a>

                            <a href="${productLink}">
                                Products
                            </a>

                            <a href="${categoriesLink}">
                                Categories
                            </a>

                            <a href="${contactLink}">
                                Contact
                            </a>

                        </div>


                        <div class="footer-links">

                            <h4>
                                Categories
                            </h4>

                            <a
                                href="${productLink}?category=fashion"
                            >
                                Fashion
                            </a>

                            <a
                                href="${productLink}?category=electronics"
                            >
                                Electronics
                            </a>

                            <a
                                href="${productLink}?category=home"
                            >
                                Home & Living
                            </a>

                            <a
                                href="${productLink}?category=beauty"
                            >
                                Beauty & Health
                            </a>

                            <a
                                href="${productLink}?category=food"
                            >
                                Food & Groceries
                            </a>

                            <a
                                href="${productLink}?category=agriculture"
                            >
                                Agriculture
                            </a>

                        </div>


                    </div>


                    <div class="footer-bottom">

                        <p>
                            &copy; 2026 Smart Local Marketplace.
                            All rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        `;

    }


    var searchForm =
        document.getElementById("search-form");

    var searchInput =
        document.getElementById("search-input");


    if (searchForm && searchInput) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                var searchTerm =
                    searchInput.value.trim();

                if (searchTerm === "") {
                    return;
                }

                window.location.href =
                    productLink +
                    "?search=" +
                    encodeURIComponent(searchTerm);

            }
        );

    }


    var menuToggle =
        document.querySelector(".menu-toggle");

    var nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            function () {

                nav.classList.toggle("active");

            }
        );

    }


    function updateCartCount() {

        var cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        var totalItems = 0;

        cart.forEach(function (item) {

            totalItems +=
                Number(item.quantity) || 0;

        });


        var cartCount =
            document.querySelector(".cart-count");


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }

    }


    updateCartCount();


    window.addEventListener(
        "storage",
        function (event) {

            if (event.key === "cart") {

                updateCartCount();

            }

        }
    );

});