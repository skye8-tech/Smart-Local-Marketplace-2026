"use strict";

var STORAGE_KEY = "smartLocalMarketplaceSellers";
var CURRENT_SELLER_KEY = "smartLocalMarketplaceCurrentSeller";

var currentSellerId = localStorage.getItem(CURRENT_SELLER_KEY);

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

function getCurrentSeller() {
  var sellers = getSellers();

  return sellers.find(function (seller) {
    return seller.id === currentSellerId;
  });
}

var currentSeller = getCurrentSeller();

if (!currentSeller) {
  window.location.href = "seller-login.html";
}

var sellerNameElement = document.getElementById("seller-name");

var businessNameElement = document.getElementById("business-name");

var sellerStatusElement = document.getElementById("seller-status");

var totalProductsElement = document.getElementById("total-products");

var sellerProductsList = document.getElementById("seller-products-list");

var addProductSection = document.getElementById("add-product-section");

var showAddProductButton = document.getElementById("show-add-product");

var cancelAddProductButton = document.getElementById("cancel-add-product");

var productForm = document.getElementById("seller-product-form");

var logoutButton = document.getElementById("seller-logout");

function loadSellerInformation() {
  if (!currentSeller) {
    return;
  }

  if (sellerNameElement) {
    sellerNameElement.textContent = currentSeller.sellerName || "";
  }

  if (businessNameElement) {
    businessNameElement.textContent = currentSeller.businessName || "";
  }

  if (sellerStatusElement) {
    sellerStatusElement.textContent = currentSeller.status || "Pending";
  }

  if (!Array.isArray(currentSeller.products)) {
    currentSeller.products = [];
  }

  updateProductCount();

  renderProducts();
}

function updateProductCount() {
  if (!totalProductsElement || !currentSeller) {
    return;
  }

  var products = Array.isArray(currentSeller.products)
    ? currentSeller.products
    : [];

  totalProductsElement.textContent = products.length;
}

function renderProducts() {
  if (!sellerProductsList || !currentSeller) {
    return;
  }

  sellerProductsList.innerHTML = "";

  var products = Array.isArray(currentSeller.products)
    ? currentSeller.products
    : [];

  if (products.length === 0) {
    var emptyMessage = document.createElement("p");

    emptyMessage.className = "empty-products";

    emptyMessage.textContent = "No products added yet.";

    sellerProductsList.appendChild(emptyMessage);

    return;
  }

  products.forEach(function (product) {
    var productCard = document.createElement("div");

    productCard.className = "seller-product-card";

    productCard.innerHTML = `

            <div class="seller-product-image">

                <img
                    src="${escapeHTML(
                      product.image || "../images/products/product.jpg",
                    )}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.src='../images/products/product.jpg'"
                >

            </div>


            <div class="seller-product-content">

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.category)}
                </p>

                <strong>
                    ${Number(product.price).toLocaleString()} FCFA
                </strong>

                <span>
                    Stock: ${product.stock}
                </span>

                <p>
                    ${escapeHTML(product.description)}
                </p>

                <span>
                    Status: ${escapeHTML(product.status)}
                </span>

            </div>

        `;

    sellerProductsList.appendChild(productCard);
  });
}

if (showAddProductButton) {
  showAddProductButton.addEventListener("click", function () {
    if (addProductSection) {
      addProductSection.style.display = "block";
    }

    showAddProductButton.style.display = "none";
  });
}

if (cancelAddProductButton) {
  cancelAddProductButton.addEventListener("click", function () {
    if (addProductSection) {
      addProductSection.style.display = "none";
    }

    showAddProductButton.style.display = "inline-block";

    if (productForm) {
      productForm.reset();
    }
  });
}

if (productForm) {
  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!currentSeller) {
      alert("Seller account not found.");

      return;
    }

    var productNameInput = document.getElementById("product-name");

    var categoryInput = document.getElementById("product-category");

    var priceInput = document.getElementById("product-price");

    var stockInput = document.getElementById("product-stock");

    var imageInput = document.getElementById("product-image");

    var descriptionInput = document.getElementById("product-description");

    var productName = productNameInput.value.trim();

    var category = categoryInput.value;

    var price = priceInput.value;

    var stock = stockInput.value;

    var image = imageInput.value.trim();

    var description = descriptionInput.value.trim();

    if (
      productName === "" ||
      category === "" ||
      price === "" ||
      stock === "" ||
      description === ""
    ) {
      alert("Please fill in all required product fields.");

      return;
    }

    if (Number(price) <= 0 || Number(stock) < 0) {
      alert("Please enter a valid price and stock.");

      return;
    }

    var product = {
      id: "product-" + Date.now(),

      name: productName,

      category: category,

      price: Number(price),

      stock: Number(stock),

      image: image,

      description: description,

      sellerId: currentSeller.id,

      sellerName: currentSeller.sellerName,

      businessName: currentSeller.businessName,

      location: currentSeller.location,

      status: "Pending",

      createdAt: new Date().toISOString(),
    };

    if (!Array.isArray(currentSeller.products)) {
      currentSeller.products = [];
    }

    currentSeller.products.push(product);

    var sellers = getSellers();

    var sellerIndex = sellers.findIndex(function (seller) {
      return seller.id === currentSeller.id;
    });

    if (sellerIndex === -1) {
      alert("Seller account could not be found.");

      return;
    }

    sellers[sellerIndex] = currentSeller;

    saveSellers(sellers);

    currentSeller = sellers[sellerIndex];

    productForm.reset();

    if (addProductSection) {
      addProductSection.style.display = "none";
    }

    showAddProductButton.style.display = "inline-block";

    updateProductCount();

    renderProducts();

    alert("Product added successfully. It is now waiting for admin approval.");
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    var confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem(CURRENT_SELLER_KEY);

    window.location.href = "seller-login.html";
  });
}

function escapeHTML(value) {
  var div = document.createElement("div");

  div.textContent = value || "";

  return div.innerHTML;
}

loadSellerInformation();
