"use strict";

var productCards = Array.from(document.querySelectorAll(".product-card"));

var searchInput = document.getElementById("search-input");

var searchButton = document.getElementById("search-button");

var locationFilter = document.getElementById("location-filter");

var sortProducts = document.getElementById("sort-products");

var categoryButtons = document.querySelectorAll(".category-filter");

var productCount = document.getElementById("product-count");

var noProducts = document.getElementById("no-products");

var previousPage = document.getElementById("previous-page");

var nextPage = document.getElementById("next-page");

var pageButtons = document.querySelectorAll(".page-btn");

var currentPage = 1;

var productsPerPage = 3;

var currentCategory = "all";

var currentLocation = "all";

var currentSearch = "";

var currentSort = "default";

function getFilteredProducts() {
  var filteredProducts = productCards.filter(function (product) {
    var category = product.dataset.category || "";

    var location = product.dataset.location || "";

    var productName = product.querySelector("h2").textContent.toLowerCase();

    var sellerElement = product.querySelector("p");

    var sellerName = sellerElement
      ? sellerElement.textContent.toLowerCase()
      : "";

    var matchesCategory =
      currentCategory === "all" || category === currentCategory;

    var matchesLocation =
      currentLocation === "all" || location === currentLocation;

    var matchesSearch =
      currentSearch === "" ||
      productName.includes(currentSearch) ||
      sellerName.includes(currentSearch) ||
      location.toLowerCase().includes(currentSearch);

    return matchesCategory && matchesLocation && matchesSearch;
  });

  if (currentSort === "low") {
    filteredProducts.sort(function (a, b) {
      return Number(a.dataset.price) - Number(b.dataset.price);
    });
  }

  if (currentSort === "high") {
    filteredProducts.sort(function (a, b) {
      return Number(b.dataset.price) - Number(a.dataset.price);
    });
  }

  if (currentSort === "rating") {
    filteredProducts.sort(function (a, b) {
      return Number(b.dataset.rating) - Number(a.dataset.rating);
    });
  }

  return filteredProducts;
}

function renderProducts() {
  var filteredProducts = getFilteredProducts();

  var totalProducts = filteredProducts.length;

  var totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages === 0) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  productCards.forEach(function (product) {
    product.style.display = "none";
  });

  var startIndex = (currentPage - 1) * productsPerPage;

  var endIndex = startIndex + productsPerPage;

  var pageProducts = filteredProducts.slice(startIndex, endIndex);

  pageProducts.forEach(function (product) {
    product.style.display = "block";
  });

  if (totalProducts === 0) {
    productCount.textContent = "Showing 0 products";

    noProducts.style.display = "block";
  } else {
    noProducts.style.display = "none";

    var showingStart = startIndex + 1;

    var showingEnd = Math.min(endIndex, totalProducts);

    productCount.textContent =
      "Showing " +
      showingStart +
      "-" +
      showingEnd +
      " of " +
      totalProducts +
      " products";
  }

  updatePagination(totalPages);
}

function updatePagination(totalPages) {
  pageButtons.forEach(function (button) {
    var pageNumber = Number(button.dataset.page);

    button.classList.remove("active");

    if (pageNumber === currentPage) {
      button.classList.add("active");
    }

    if (pageNumber > totalPages) {
      button.style.display = "none";
    } else {
      button.style.display = "inline-block";
    }
  });

  if (previousPage) {
    previousPage.disabled = currentPage <= 1;
  }

  if (nextPage) {
    nextPage.disabled = totalPages === 0 || currentPage >= totalPages;
  }
}

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    categoryButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentCategory = button.dataset.category;

    currentPage = 1;

    renderProducts();
  });
});

if (locationFilter) {
  locationFilter.addEventListener("change", function () {
    currentLocation = locationFilter.value;

    currentPage = 1;

    renderProducts();
  });
}

function performSearch() {
  if (!searchInput) {
    return;
  }

  currentSearch = searchInput.value.trim().toLowerCase();

  currentPage = 1;

  renderProducts();
}

if (searchButton) {
  searchButton.addEventListener("click", performSearch);
}

if (searchInput) {
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

if (sortProducts) {
  sortProducts.addEventListener("change", function () {
    currentSort = sortProducts.value;

    currentPage = 1;

    renderProducts();
  });
}

pageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentPage = Number(button.dataset.page);

    renderProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

if (previousPage) {
  previousPage.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;

      renderProducts();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

if (nextPage) {
  nextPage.addEventListener("click", function () {
    var filteredProducts = getFilteredProducts();

    var totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (currentPage < totalPages) {
      currentPage++;

      renderProducts();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

var addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var productCard = button.closest(".product-card");

    var id = button.dataset.id;

    var name = button.dataset.name;

    var price = Number(button.dataset.price);

    var imageElement = productCard.querySelector("img");

    var image = imageElement ? imageElement.getAttribute("src") : "";

    var location = productCard.dataset.location;

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var existingProduct = cart.find(function (item) {
      return item.id === id;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: id,

        name: name,

        price: price,

        image: image,

        location: location,

        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    button.textContent = "✓ Added to Cart";

    setTimeout(function () {
      button.textContent = "Add to Cart";
    }, 1500);

    updateCartCount();
  });
});

function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  var totalItems = 0;

  cart.forEach(function (item) {
    totalItems += Number(item.quantity) || 0;
  });

  var cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

function loadSearchFromNavbar() {
  var urlParams = new URLSearchParams(window.location.search);

  var searchFromNavbar = urlParams.get("search");

  if (searchFromNavbar && searchInput) {
    searchInput.value = searchFromNavbar;

    currentSearch = searchFromNavbar.trim().toLowerCase();
  }

  var categoryFromUrl = urlParams.get("category");

  if (categoryFromUrl) {
    currentCategory = categoryFromUrl;

    categoryButtons.forEach(function (button) {
      button.classList.remove("active");

      if (button.dataset.category === categoryFromUrl) {
        button.classList.add("active");
      }
    });
  }
}

loadSearchFromNavbar();

renderProducts();

updateCartCount();
