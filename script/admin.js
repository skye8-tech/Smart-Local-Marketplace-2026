"use strict";

var STORAGE_KEY = "smartLocalMarketplaceSellers";

var sidebarLinks = document.querySelectorAll(".sidebar nav a");
var adminSections = document.querySelectorAll(".admin-section");


sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        var sectionName = link.dataset.section;

        if (sectionName === "logout") {

            var confirmLogout =
                confirm("Are you sure you want to logout?");

            if (confirmLogout) {

                window.location.href = "../index.html";

            }

            return;
        }


        sidebarLinks.forEach(function (item) {

            item.classList.remove("active");

        });


        link.classList.add("active");


        adminSections.forEach(function (section) {

            section.style.display = "none";

        });


        var selectedSection =
            document.getElementById(sectionName);


        if (selectedSection) {

            selectedSection.style.display = "block";

        }


        if (sectionName === "sellers") {

            loadSellers();

        }

    });

});


function getSellers() {

    var savedSellers =
        localStorage.getItem(STORAGE_KEY);


    if (!savedSellers) {

        return [];

    }


    try {

        var sellers =
            JSON.parse(savedSellers);


        if (Array.isArray(sellers)) {

            return sellers;

        }


        return [];

    } catch (error) {

        return [];

    }

}


function saveSellers(sellers) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sellers)
    );

}


function loadSellers() {

    var sellerList =
        document.getElementById("seller-list");

    var noSellers =
        document.getElementById("no-sellers");


    if (!sellerList) {

        return;

    }


    sellerList.innerHTML = "";


    var sellers = getSellers();


    if (sellers.length === 0) {

        if (noSellers) {

            noSellers.style.display = "block";

        }

        return;

    }


    if (noSellers) {

        noSellers.style.display = "none";

    }


    sellers.forEach(function (seller) {

        var sellerRequest =
            document.createElement("div");


        sellerRequest.className =
            "seller-request";


        sellerRequest.dataset.id =
            seller.id;


        var initials =
            getInitials(
                seller.sellerName || seller.businessName
            );


        var statusClass =
            getStatusClass(seller.status);


        sellerRequest.innerHTML = `

            <div class="seller-info">

                <div class="seller-avatar">
                    ${initials}
                </div>

                <div>

                    <h3>
                        ${escapeHTML(seller.businessName)}
                    </h3>

                    <p>
                        ${escapeHTML(seller.sellerName)}
                        |
                        ${escapeHTML(seller.location)}
                    </p>

                    <span class="${statusClass}">
                        ${escapeHTML(seller.status)}
                    </span>

                </div>

            </div>


            <div class="seller-actions">

                <button
                    class="view-btn"
                    type="button">
                    View
                </button>

                <button
                    class="approve-btn"
                    type="button"
                    ${seller.status === "Verified" ? "disabled" : ""}>
                    ${seller.status === "Verified" ? "Approved" : "Approve"}
                </button>

                <button
                    class="reject-btn"
                    type="button"
                    ${seller.status === "Rejected" ? "disabled" : ""}>
                    ${seller.status === "Rejected" ? "Rejected" : "Reject"}
                </button>

            </div>

        `;


        sellerList.appendChild(sellerRequest);

    });


    attachSellerButtons();

}


function attachSellerButtons() {

    var viewButtons =
        document.querySelectorAll(
            "#seller-list .view-btn"
        );


    var approveButtons =
        document.querySelectorAll(
            "#seller-list .approve-btn"
        );


    var rejectButtons =
        document.querySelectorAll(
            "#seller-list .reject-btn"
        );


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                var sellerRequest =
                    button.closest(".seller-request");


                var sellerId =
                    sellerRequest.dataset.id;


                var sellers =
                    getSellers();


                var seller =
                    sellers.find(function (item) {

                        return item.id === sellerId;

                    });


                if (!seller) {

                    return;

                }


                alert(
                    "Seller Information\n\n" +

                    "Full Name: " +
                    seller.sellerName +

                    "\nBusiness: " +
                    seller.businessName +

                    "\nEmail: " +
                    seller.email +

                    "\nPhone: " +
                    seller.phone +

                    "\nLocation: " +
                    seller.location +

                    "\nCategory: " +
                    seller.category +

                    "\nDescription: " +
                    seller.description +

                    "\nStatus: " +
                    seller.status
                );

            }
        );

    });


    approveButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                var sellerRequest =
                    button.closest(".seller-request");


                var sellerId =
                    sellerRequest.dataset.id;


                var sellers =
                    getSellers();


                var seller =
                    sellers.find(function (item) {

                        return item.id === sellerId;

                    });


                if (!seller) {

                    return;

                }


                var confirmApprove =
                    confirm(
                        "Approve " +
                        seller.businessName +
                        " as a verified seller?"
                    );


                if (!confirmApprove) {

                    return;

                }


                seller.status =
                    "Verified";


                seller.verified =
                    true;


                saveSellers(sellers);


                loadSellers();


                alert(
                    seller.businessName +
                    " has been verified successfully."
                );

            }
        );

    });


    rejectButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                var sellerRequest =
                    button.closest(".seller-request");


                var sellerId =
                    sellerRequest.dataset.id;


                var sellers =
                    getSellers();


                var seller =
                    sellers.find(function (item) {

                        return item.id === sellerId;

                    });


                if (!seller) {

                    return;

                }


                var confirmReject =
                    confirm(
                        "Reject " +
                        seller.businessName +
                        " seller registration?"
                    );


                if (!confirmReject) {

                    return;

                }


                seller.status =
                    "Rejected";


                seller.verified =
                    false;


                saveSellers(sellers);


                loadSellers();


                alert(
                    seller.businessName +
                    " has been rejected."
                );

            }
        );

    });

}


function getInitials(name) {

    if (!name) {

        return "SL";

    }


    var words =
        name.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0].charAt(0) +
        words[1].charAt(0)
    ).toUpperCase();

}


function getStatusClass(status) {

    if (status === "Verified") {

        return "verified";

    }


    if (status === "Rejected") {

        return "rejected";

    }


    return "pending";

}


function escapeHTML(value) {

    var div =
        document.createElement("div");


    div.textContent =
        value || "";


    return div.innerHTML;

}


/* PRODUCT MANAGEMENT */

var searchInput =
    document.getElementById("product-search");

var categoryFilter =
    document.getElementById("category-filter");

var locationFilter =
    document.getElementById("location-filter");

var sellerFilter =
    document.getElementById("seller-filter");

var statusFilter =
    document.getElementById("status-filter");

var resetButton =
    document.getElementById("reset-filters");

var productList =
    document.getElementById("product-list");

var noProducts =
    document.getElementById("no-products");

var products =
    document.querySelectorAll("#product-list tr");


function filterProducts() {

    if (
        !searchInput ||
        !categoryFilter ||
        !locationFilter ||
        !sellerFilter ||
        !statusFilter ||
        !productList
    ) {

        return;

    }


    var searchValue =
        searchInput.value.toLowerCase().trim();

    var categoryValue =
        categoryFilter.value;

    var locationValue =
        locationFilter.value;

    var sellerValue =
        sellerFilter.value;

    var statusValue =
        statusFilter.value;

    var visibleProducts = 0;


    products.forEach(function (product) {

        var productName =
            (product.dataset.product || "")
                .toLowerCase();

        var category =
            product.dataset.category || "";

        var location =
            product.dataset.location || "";

        var seller =
            product.dataset.seller || "";

        var status =
            product.dataset.status || "";


        var matchesSearch =
            productName.includes(searchValue);

        var matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;

        var matchesLocation =
            locationValue === "all" ||
            location === locationValue;

        var matchesSeller =
            sellerValue === "all" ||
            seller === sellerValue;

        var matchesStatus =
            statusValue === "all" ||
            status === statusValue;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesSeller &&
            matchesStatus
        ) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (noProducts) {

        noProducts.style.display =
            visibleProducts === 0
                ? "block"
                : "none";

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (sellerFilter) {

    sellerFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (resetButton) {

    resetButton.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            categoryFilter.value = "all";

            locationFilter.value = "all";

            sellerFilter.value = "all";

            statusFilter.value = "all";

            filterProducts();

        }
    );

}


/* ADD PRODUCT */

var addProductButton =
    document.querySelector(".add-product-btn");

var addProductForm =
    document.getElementById("add-product-form");

var saveProductButton =
    document.getElementById("save-product");

var cancelProductButton =
    document.getElementById("cancel-product");


if (addProductButton && addProductForm) {

    addProductButton.addEventListener(
        "click",
        function () {

            addProductForm.style.display =
                "block";

        }
    );

}


if (cancelProductButton && addProductForm) {

    cancelProductButton.addEventListener(
        "click",
        function () {

            addProductForm.style.display =
                "none";

        }
    );

}


if (saveProductButton) {

    saveProductButton.addEventListener(
        "click",
        function () {

            var productNameInput =
                document.getElementById("product-name");

            var productSellerInput =
                document.getElementById("product-seller");

            var productCategoryInput =
                document.getElementById("product-category");

            var productLocationInput =
                document.getElementById("product-location");

            var productPriceInput =
                document.getElementById("product-price");

            var productStatusInput =
                document.getElementById("product-status");


            var productName =
                productNameInput.value.trim();

            var seller =
                productSellerInput.value;

            var category =
                productCategoryInput.value;

            var location =
                productLocationInput.value;

            var price =
                productPriceInput.value;

            var status =
                productStatusInput.value;


            if (
                productName === "" ||
                seller === "" ||
                category === "" ||
                location === "" ||
                price === ""
            ) {

                alert(
                    "Please fill in all product fields."
                );

                return;

            }


            var row =
                document.createElement("tr");


            row.dataset.product =
                productName;

            row.dataset.seller =
                seller;

            row.dataset.category =
                category;

            row.dataset.location =
                location;

            row.dataset.status =
                status;


            var statusClass =
                status === "Active"
                    ? "delivered"
                    : status === "Rejected"
                        ? "rejected"
                        : "pending";


            row.innerHTML = `

                <td>
                    ${escapeHTML(productName)}
                </td>

                <td>
                    ${escapeHTML(seller)}
                </td>

                <td>
                    ${escapeHTML(category)}
                </td>

                <td>
                    ${escapeHTML(location)}
                </td>

                <td>
                    ${Number(price).toLocaleString()}
                    FCFA
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${escapeHTML(status)}
                    </span>
                </td>

                <td>
                    <button
                        type="button"
                        class="view-product">
                        View
                    </button>
                </td>

            `;


            productList.appendChild(row);


            productNameInput.value = "";

            productSellerInput.value = "";

            productCategoryInput.value = "";

            productLocationInput.value = "";

            productPriceInput.value = "";

            productStatusInput.value =
                "Active";


            addProductForm.style.display =
                "none";


            products =
                document.querySelectorAll(
                    "#product-list tr"
                );


            filterProducts();

        }
    );

}


/* PRODUCT VIEW */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.matches(
                "#product-list button"
            )
        ) {

            return;

        }


        var row =
            event.target.closest("tr");


        if (!row) {

            return;

        }


        alert(
            "Product: " +
            row.dataset.product +

            "\nSeller: " +
            row.dataset.seller +

            "\nCategory: " +
            row.dataset.category +

            "\nLocation: " +
            row.dataset.location +

            "\nStatus: " +
            row.dataset.status
        );

    }
);


/* SETTINGS */

var saveSettings =
    document.getElementById("save-settings");


if (saveSettings) {

    saveSettings.addEventListener(
        "click",
        function () {

            alert(
                "Settings saved successfully."
            );

        }
    );

}




adminSections.forEach(function (section) {

    if (section.id !== "dashboard") {

        section.style.display = "none";

    }

});


loadSellers();
filterProducts();