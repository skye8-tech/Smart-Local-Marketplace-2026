"use strict";

var cartItems = document.getElementById("cart-items");
var emptyCart = document.getElementById("empty-cart");
var subtotalElement = document.getElementById("subtotal");
var deliveryElement = document.getElementById("delivery");
var totalElement = document.getElementById("total");
var checkoutButton = document.getElementById("checkout-btn");

var DELIVERY_FEE = 2000;

var cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(price) {
  return Number(price).toLocaleString("en-US") + " FCFA";
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";

    subtotalElement.textContent = "0 FCFA";
    deliveryElement.textContent = "0 FCFA";
    totalElement.textContent = "0 FCFA";

    return;
  }

  emptyCart.style.display = "none";

  var subtotal = 0;

  cart.forEach(function (item) {
    var itemTotal = item.price * item.quantity;

    subtotal += itemTotal;

    var cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <h3>${item.name}</h3>

                <p>Location: ${item.location}</p>

                <strong>
                    ${formatPrice(item.price)}
                </strong>
            </div>

            <div class="cart-item-quantity">

                <button
                    type="button"
                    class="quantity-btn decrease"
                    data-id="${item.id}">
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    class="quantity-btn increase"
                    data-id="${item.id}">
                    +
                </button>

            </div>

            <div class="cart-item-total">
                ${formatPrice(itemTotal)}
            </div>

            <button
                type="button"
                class="remove-cart-item"
                data-id="${item.id}">
                Remove
            </button>
        `;

    cartItems.appendChild(cartItem);
  });

  var total = subtotal + DELIVERY_FEE;

  subtotalElement.textContent = formatPrice(subtotal);

  deliveryElement.textContent = formatPrice(DELIVERY_FEE);

  totalElement.textContent = formatPrice(total);
}

cartItems.addEventListener("click", function (event) {
  var button = event.target.closest("button");

  if (!button) {
    return;
  }

  var id = button.dataset.id;

  var item = cart.find(function (product) {
    return product.id === id;
  });

  if (!item) {
    return;
  }

  if (button.classList.contains("increase")) {
    item.quantity += 1;
  }

  if (button.classList.contains("decrease")) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(function (product) {
        return product.id !== id;
      });
    }
  }

  if (button.classList.contains("remove-cart-item")) {
    cart = cart.filter(function (product) {
      return product.id !== id;
    });
  }

  saveCart();

  renderCart();
});

checkoutButton.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty.");

    return;
  }

  window.location.href = "order.html";
});

renderCart();
