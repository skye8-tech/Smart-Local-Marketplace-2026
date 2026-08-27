"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var products = {

        dress001: {
            name: "African Print Dress",
            category: "Fashion",
            price: 25000,
            rating: 4.8,
            image: "../images/products/africa.jpg",
            seller: "Grace Fashion Store",
            location: "Bamenda",
            description: "Beautiful African print dress made from high-quality fabric. Perfect for casual occasions, parties and special events."
        },

        shoes001: {
            name: "Fashion Shoes",
            category: "Fashion",
            price: 18000,
            rating: 4.7,
            image: "../images/products/shoes.jpg",
            seller: "Fashion House",
            location: "Bamenda",
            description: "Stylish and comfortable fashion shoes suitable for everyday use and special occasions."
        },

        laptop001: {
            name: "HP Laptop",
            category: "Electronics",
            price: 350000,
            rating: 4.9,
            image: "../images/products/laptop.jpg",
            seller: "Tech World Store",
            location: "Buea",
            description: "Reliable HP laptop suitable for school, business, programming and everyday computing."
        },

        phone001: {
            name: "Samsung Smartphone",
            category: "Phones",
            price: 180000,
            rating: 4.8,
            image: "../images/products/phone.jpg",
            seller: "Mobile Hub",
            location: "Douala",
            description: "Modern Samsung smartphone with excellent performance, display quality and battery life."
        },

        bag001: {
            name: "Leather Handbag",
            category: "Fashion",
            price: 20000,
            rating: 4.5,
            image: "../images/products/handbag.jpg",
            seller: "Grace Fashion Store",
            location: "Yaounde",
            description: "Elegant leather handbag suitable for work, shopping, travel and everyday activities."
        },

        vegetables001: {
            name: "Fresh Vegetables",
            category: "Food",
            price: 5000,
            rating: 4.9,
            image: "../images/products/vegetables.jpg",
            seller: "Green Farm",
            location: "Bamenda",
            description: "Fresh locally grown vegetables supplied directly by a trusted local farm."
        },

        watch001: {
            name: "Fashion Watch",
            category: "Accessories",
            price: 15000,
            rating: 4.6,
            image: "../images/products/watch.jpg",
            seller: "Style Store",
            location: "Kumba",
            description: "Stylish fashion watch designed to complement both casual and formal outfits."
        },

        speaker001: {
            name: "Bluetooth Speaker",
            category: "Electronics",
            price: 35000,
            rating: 4.7,
            image: "../images/products/speaker.jpg",
            seller: "Tech World Store",
            location: "Bamenda",
            description: "Portable Bluetooth speaker with clear sound and reliable battery performance."
        },

        home001: {
            name: "Office Chair",
            category: "Home & Furniture",
            price: 45000,
            rating: 4.6,
            image: "../images/products/furnitere3.jpg",
            seller: "Home Furniture Store",
            location: "Bamenda",
            description: "Comfortable office chair suitable for home offices, businesses and study spaces."
        },

        fashion001: {
            name: "Fashion Dress",
            category: "Fashion",
            price: 18000,
            rating: 4.7,
            image: "../images/products/fashion.jpg",
            seller: "Grace Fashion Store",
            location: "Bamenda",
            description: "Beautiful fashionable dress made from quality material and suitable for different occasions."
        },

        smartphone001: {
            name: "Smartphone",
            category: "Phones",
            price: 120000,
            rating: 4.8,
            image: "../images/products/electronics3.png",
            seller: "Mobile Hub",
            location: "Bamenda",
            description: "Modern smartphone with excellent performance, clear display and reliable battery life."
        },

        men001: {
            name: "Fashion Shoes",
            category: "Fashion",
            price: 20000,
            rating: 4.6,
            image: "../images/products/shoe.jpg",
            seller: "Grace Fashion",
            location: "Bamenda",
            description: "Modern and stylish fashion shoes suitable for everyday wear and special occasions."
        },

        shoe001: {
            name: "New Product",
            category: "Fashion",
            price: 5500,
            rating: 4.5,
            image: "../images/products/chicken2.jpg",
            seller: "Local Seller",
            location: "Bamenda",
            description: "A quality product available from a trusted local seller."
        }

    };

    var params = new URLSearchParams(window.location.search);
    var productId = params.get("id");
    var product = products[productId];

    var productNameElement = document.getElementById("product-name");
    var productDescriptionElement = document.getElementById("product-description");

    if (!product) {

        if (productNameElement) {
            productNameElement.textContent = "Product Not Found";
        }

        if (productDescriptionElement) {
            productDescriptionElement.textContent =
                "Sorry, the product you are looking for does not exist.";
        }

        return;
    }

    var productImage = document.getElementById("product-image");
    var productName = document.getElementById("product-name");
    var productCategory = document.getElementById("product-category");
    var productRating = document.getElementById("product-rating");
    var ratingNumber = document.getElementById("rating-number");
    var productPrice = document.getElementById("product-price");
    var productDescription = document.getElementById("product-description");
    var fullDescription = document.getElementById("full-description");
    var sellerName = document.getElementById("seller-name");
    var productLocation = document.getElementById("product-location");
    var breadcrumbName = document.getElementById("breadcrumb-name");
    var quantityInput = document.getElementById("quantity");
    var productTotal = document.getElementById("product-total");
    var cartMessage = document.getElementById("cart-message");
    var decreaseButton = document.getElementById("decrease-quantity");
    var increaseButton = document.getElementById("increase-quantity");
    var addToCartButton = document.getElementById("add-to-cart");

    productImage.src = product.image;
    productImage.alt = product.name;

    productName.textContent = product.name;
    productCategory.textContent = product.category;

    productRating.textContent = "★★★★★";
    ratingNumber.textContent = product.rating;

    productPrice.textContent =
        "FCFA " + product.price.toLocaleString();

    productDescription.textContent =
        product.description;

    fullDescription.textContent =
        product.description;

    sellerName.textContent =
        product.seller;

    productLocation.textContent =
        product.location;

    breadcrumbName.textContent =
        product.name;

    function updateTotal() {

        var quantity =
            parseInt(quantityInput.value) || 1;

        var total =
            product.price * quantity;

        productTotal.textContent =
            "FCFA " + total.toLocaleString();
    }

    increaseButton.addEventListener("click", function () {

        var quantity =
            parseInt(quantityInput.value) || 1;

        if (quantity < 20) {
            quantity++;
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    decreaseButton.addEventListener("click", function () {

        var quantity =
            parseInt(quantityInput.value) || 1;

        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    quantityInput.addEventListener("input", function () {

        var quantity =
            parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 1) {
            quantityInput.value = 1;
        }

        if (quantity > 20) {
            quantityInput.value = 20;
        }

        updateTotal();
    });

    function getCart() {

        var cart = localStorage.getItem("cart");

        if (!cart) {
            return [];
        }

        try {
            return JSON.parse(cart);
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }

    function updateCartCount() {

        var cart = getCart();

        var cartCounts =
            document.querySelectorAll(".cart-count");

        var totalItems =
            cart.reduce(function (total, item) {
                return total + item.quantity;
            }, 0);

        cartCounts.forEach(function (count) {
            count.textContent = totalItems;
        });
    }

    if (addToCartButton) {

        addToCartButton.addEventListener("click", function () {

            var quantity =
                parseInt(quantityInput.value) || 1;

            var cart = getCart();

            var existingProduct =
                cart.find(function (item) {
                    return item.id === productId;
                });

            if (existingProduct) {

                existingProduct.quantity += quantity;

            } else {

                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    seller: product.seller,
                    location: product.location,
                    quantity: quantity
                });
            }

            saveCart(cart);
            updateCartCount();

            if (cartMessage) {

                cartMessage.textContent =
                    quantity +
                    " × " +
                    product.name +
                    " added to your cart.";

                setTimeout(function () {
                    cartMessage.textContent = "";
                }, 3000);
            }
        });
    }

    updateTotal();
    updateCartCount();

});