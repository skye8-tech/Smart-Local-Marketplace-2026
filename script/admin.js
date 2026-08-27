"use strict";

var STORAGE_KEY = "smartLocalMarketplaceSellers";

var sidebarLinks = document.querySelectorAll(".sidebar nav a");

var adminSections = document.querySelectorAll(".admin-section");

/* SIDEBAR */

sidebarLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    var sectionName = link.dataset.section;

    if (sectionName === "logout") {
      var confirmLogout = confirm("Are you sure you want to logout?");

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

    var selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
      selectedSection.style.display = "block";
    }

    if (sectionName === "sellers") {
      loadSellers();
    }

    if (sectionName === "products") {
      loadSellerProducts();
    }
  });
});

/* SELLERS */

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

function loadSellers() {
  var sellerList = document.getElementById("seller-list");

  var noSellers = document.getElementById("no-sellers");

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
    var sellerRequest = document.createElement("div");

    sellerRequest.className = "seller-request";

    sellerRequest.dataset.id = seller.id;

    var initials = getInitials(seller.sellerName || seller.businessName);

    var statusClass = getStatusClass(seller.status);

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

/* SELLER BUTTONS */

function attachSellerButtons() {
  var viewButtons = document.querySelectorAll("#seller-list .view-btn");

  var approveButtons = document.querySelectorAll("#seller-list .approve-btn");

  var rejectButtons = document.querySelectorAll("#seller-list .reject-btn");

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var sellerRequest = button.closest(".seller-request");

      var sellerId = sellerRequest.dataset.id;

      var sellers = getSellers();

      var seller = sellers.find(function (item) {
        return item.id === sellerId;
      });

      if (!seller) {
        return;
      }

      alert(
        "Seller Information\n\n" +
          "Full Name: " +
          (seller.sellerName || "") +
          "\nBusiness: " +
          (seller.businessName || "") +
          "\nEmail: " +
          (seller.email || "") +
          "\nPhone: " +
          (seller.phone || "") +
          "\nLocation: " +
          (seller.location || "") +
          "\nCategory: " +
          (seller.category || "") +
          "\nDescription: " +
          (seller.description || "") +
          "\nStatus: " +
          (seller.status || ""),
      );
    });
  });

  approveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var sellerRequest = button.closest(".seller-request");

      var sellerId = sellerRequest.dataset.id;

      var sellers = getSellers();

      var seller = sellers.find(function (item) {
        return item.id === sellerId;
      });

      if (!seller) {
        return;
      }

      var confirmApprove = confirm(
        "Approve " + seller.businessName + " as a verified seller?",
      );

      if (!confirmApprove) {
        return;
      }

      seller.status = "Verified";

      seller.verified = true;

      saveSellers(sellers);

      loadSellers();

      alert(seller.businessName + " has been verified successfully.");
    });
  });

  rejectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var sellerRequest = button.closest(".seller-request");

      var sellerId = sellerRequest.dataset.id;

      var sellers = getSellers();

      var seller = sellers.find(function (item) {
        return item.id === sellerId;
      });

      if (!seller) {
        return;
      }

      var confirmReject = confirm(
        "Reject " + seller.businessName + " seller registration?",
      );

      if (!confirmReject) {
        return;
      }

      seller.status = "Rejected";

      seller.verified = false;

      saveSellers(sellers);

      loadSellers();

      alert(seller.businessName + " has been rejected.");
    });
  });
}

/* PRODUCT MANAGEMENT */

function loadSellerProducts() {
  var productList = document.getElementById("product-list");

  var noProducts = document.getElementById("no-products");

  if (!productList) {
    return;
  }

  productList.innerHTML = "";

  var sellers = getSellers();

  var allProducts = [];

  sellers.forEach(function (seller) {
    if (!Array.isArray(seller.products)) {
      return;
    }

    seller.products.forEach(function (product) {
      allProducts.push(product);
    });
  });

  if (allProducts.length === 0) {
    if (noProducts) {
      noProducts.style.display = "block";
    }

    return;
  }

  if (noProducts) {
    noProducts.style.display = "none";
  }

  allProducts.forEach(function (product) {
    var row = document.createElement("tr");

    row.dataset.id = product.id || "";

    row.dataset.product = product.name || "";

    row.dataset.seller = product.businessName || "";

    row.dataset.category = product.category || "";

    row.dataset.location = product.location || "";

    row.dataset.status = product.status || "Pending";

    var statusClass = getProductStatusClass(product.status);

    row.innerHTML = `

                <td>

                    ${escapeHTML(product.name)}

                </td>


                <td>

                    ${escapeHTML(product.businessName)}

                </td>


                <td>

                    ${escapeHTML(product.category)}

                </td>


                <td>

                    ${escapeHTML(product.location)}

                </td>


                <td>

                    ${Number(product.price || 0).toLocaleString()}
                    FCFA

                </td>


                <td>

                    <span class="status ${statusClass}">

                        ${escapeHTML(product.status || "Pending")}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="view-product"
                        data-id="${escapeHTML(product.id || "")}">

                        View

                    </button>

                    <button
                        type="button"
                        class="approve-product"
                        data-id="${escapeHTML(product.id || "")}"
                        ${product.status === "Approved" ? "disabled" : ""}>

                        ${
                          product.status === "Approved" ? "Approved" : "Approve"
                        }

                    </button>

                    <button
                        type="button"
                        class="reject-product"
                        data-id="${escapeHTML(product.id || "")}"
                        ${product.status === "Rejected" ? "disabled" : ""}>

                        ${product.status === "Rejected" ? "Rejected" : "Reject"}

                    </button>

                </td>

            `;

    productList.appendChild(row);
  });

  filterProducts();
}

/* PRODUCT SEARCH AND FILTER */

function filterProducts() {
  var searchInput = document.getElementById("product-search");

  var categoryFilter = document.getElementById("category-filter");

  var locationFilter = document.getElementById("location-filter");

  var sellerFilter = document.getElementById("seller-filter");

  var statusFilter = document.getElementById("status-filter");

  var noProducts = document.getElementById("no-products");

  var rows = document.querySelectorAll("#product-list tr");

  var searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";

  var categoryValue = categoryFilter ? categoryFilter.value : "all";

  var locationValue = locationFilter ? locationFilter.value : "all";

  var sellerValue = sellerFilter ? sellerFilter.value : "all";

  var statusValue = statusFilter ? statusFilter.value : "all";

  var visibleProducts = 0;

  rows.forEach(function (row) {
    var productName = (row.dataset.product || "").toLowerCase();

    var category = row.dataset.category || "";

    var location = row.dataset.location || "";

    var seller = row.dataset.seller || "";

    var status = row.dataset.status || "";

    var matchesSearch = productName.includes(searchValue);

    var matchesCategory = categoryValue === "all" || category === categoryValue;

    var matchesLocation = locationValue === "all" || location === locationValue;

    var matchesSeller = sellerValue === "all" || seller === sellerValue;

    var matchesStatus = statusValue === "all" || status === statusValue;

    if (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesSeller &&
      matchesStatus
    ) {
      row.style.display = "";

      visibleProducts++;
    } else {
      row.style.display = "none";
    }
  });

  if (noProducts) {
    noProducts.style.display = visibleProducts === 0 ? "block" : "none";
  }
}

var searchInput = document.getElementById("product-search");

if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

var categoryFilter = document.getElementById("category-filter");

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterProducts);
}

var locationFilter = document.getElementById("location-filter");

if (locationFilter) {
  locationFilter.addEventListener("change", filterProducts);
}

var sellerFilter = document.getElementById("seller-filter");

if (sellerFilter) {
  sellerFilter.addEventListener("change", filterProducts);
}

var statusFilter = document.getElementById("status-filter");

if (statusFilter) {
  statusFilter.addEventListener("change", filterProducts);
}

/* VIEW PRODUCT */

document.addEventListener("click", function (event) {
  if (event.target.matches(".view-product")) {
    var productId = event.target.dataset.id;

    var sellers = getSellers();

    var foundProduct = null;

    sellers.some(function (seller) {
      if (!Array.isArray(seller.products)) {
        return false;
      }

      var product = seller.products.find(function (item) {
        return item.id === productId;
      });

      if (product) {
        foundProduct = product;

        return true;
      }

      return false;
    });

    if (!foundProduct) {
      alert("Product not found.");

      return;
    }

    alert(
      "Product Information\n\n" +
        "Product: " +
        foundProduct.name +
        "\nSeller: " +
        foundProduct.businessName +
        "\nCategory: " +
        foundProduct.category +
        "\nPrice: " +
        Number(foundProduct.price).toLocaleString() +
        " FCFA" +
        "\nStock: " +
        foundProduct.stock +
        "\nLocation: " +
        foundProduct.location +
        "\nDescription: " +
        foundProduct.description +
        "\nStatus: " +
        foundProduct.status,
    );
  }
});

/* APPROVE PRODUCT */

document.addEventListener("click", function (event) {
  if (!event.target.matches(".approve-product")) {
    return;
  }

  var productId = event.target.dataset.id;

  var sellers = getSellers();

  var foundProduct = null;

  sellers.some(function (seller) {
    if (!Array.isArray(seller.products)) {
      return false;
    }

    var product = seller.products.find(function (item) {
      return item.id === productId;
    });

    if (product) {
      foundProduct = product;

      return true;
    }

    return false;
  });

  if (!foundProduct) {
    return;
  }

  var confirmApprove = confirm("Approve " + foundProduct.name + "?");

  if (!confirmApprove) {
    return;
  }

  foundProduct.status = "Approved";

  saveSellers(sellers);

  loadSellerProducts();

  alert(foundProduct.name + " has been approved.");
});

/* REJECT PRODUCT */

document.addEventListener("click", function (event) {
  if (!event.target.matches(".reject-product")) {
    return;
  }

  var productId = event.target.dataset.id;

  var sellers = getSellers();

  var foundProduct = null;

  sellers.some(function (seller) {
    if (!Array.isArray(seller.products)) {
      return false;
    }

    var product = seller.products.find(function (item) {
      return item.id === productId;
    });

    if (product) {
      foundProduct = product;

      return true;
    }

    return false;
  });

  if (!foundProduct) {
    return;
  }

  var confirmReject = confirm("Reject " + foundProduct.name + "?");

  if (!confirmReject) {
    return;
  }

  foundProduct.status = "Rejected";

  saveSellers(sellers);

  loadSellerProducts();

  alert(foundProduct.name + " has been rejected.");
});

/* RESET FILTERS */

var resetButton = document.getElementById("reset-filters");

if (resetButton) {
  resetButton.addEventListener("click", function () {
    if (searchInput) {
      searchInput.value = "";
    }

    if (categoryFilter) {
      categoryFilter.value = "all";
    }

    if (locationFilter) {
      locationFilter.value = "all";
    }

    if (sellerFilter) {
      sellerFilter.value = "all";
    }

    if (statusFilter) {
      statusFilter.value = "all";
    }

    filterProducts();
  });
}

/* HELPER FUNCTIONS */

function getInitials(name) {
  if (!name) {
    return "SL";
  }

  var words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
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

function getProductStatusClass(status) {
  if (status === "Approved") {
    return "delivered";
  }

  if (status === "Rejected") {
    return "rejected";
  }

  return "pending";
}

function escapeHTML(value) {
  var div = document.createElement("div");

  div.textContent = value || "";

  return div.innerHTML;
}

/* INITIAL LOAD */

adminSections.forEach(function (section) {
  if (section.id !== "dashboard") {
    section.style.display = "none";
  }
});

loadSellers();

loadSellerProducts();
