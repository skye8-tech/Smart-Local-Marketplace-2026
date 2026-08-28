"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var ORDER_STORAGE_KEY = "smartLocalMarketplaceOrders";

  var orderItems = document.getElementById("order-items");
  var subtotalElement = document.getElementById("subtotal");
  var deliveryFeeElement = document.getElementById("delivery-fee");
  var totalElement = document.getElementById("total");
  var orderForm = document.getElementById("order-form");

  function getCart() {
    var savedCart = localStorage.getItem("cart");

    if (!savedCart) {
      return [];
    }

    try {
      var cart = JSON.parse(savedCart);

      if (Array.isArray(cart)) {
        return cart;
      }

      return [];
    } catch (error) {
      console.error("Error loading cart:", error);

      return [];
    }
  }

  function getOrders() {
    var savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!savedOrders) {
      return [];
    }

    try {
      var orders = JSON.parse(savedOrders);

      if (Array.isArray(orders)) {
        return orders;
      }

      return [];
    } catch (error) {
      console.error("Error loading orders:", error);

      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }

  function calculateSubtotal(cart) {
    return cart.reduce(function (total, item) {
      var price = Number(item.price) || 0;

      var quantity = Number(item.quantity) || 1;

      return total + price * quantity;
    }, 0);
  }

  function escapeHTML(value) {
    var div = document.createElement("div");

    div.textContent = value || "";

    return div.innerHTML;
  }

  function displayCart() {
    var cart = getCart();

    if (!orderItems) {
      return;
    }

    orderItems.innerHTML = "";

    if (cart.length === 0) {
      orderItems.innerHTML = "<p>Your cart is empty.</p>";

      if (subtotalElement) {
        subtotalElement.textContent = "0 FCFA";
      }

      if (deliveryFeeElement) {
        deliveryFeeElement.textContent = "0 FCFA";
      }

      if (totalElement) {
        totalElement.textContent = "0 FCFA";
      }

      return;
    }

    cart.forEach(function (item) {
      var itemElement = document.createElement("div");

      itemElement.className = "order-summary-item";

      var image = item.image || "../images/products/product.jpg";

      var name = item.name || "Product";

      var price = Number(item.price) || 0;

      var quantity = Number(item.quantity) || 1;

      var itemTotal = price * quantity;

      itemElement.innerHTML = `

                <div class="order-item-image">

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(name)}"
                        onerror="this.src='../images/products/product.jpg'"
                    >

                </div>


                <div class="order-item-info">

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p>
                        Quantity: ${quantity}
                    </p>

                    <p>
                        Price: ${price.toLocaleString()} FCFA
                    </p>

                    <strong>
                        ${itemTotal.toLocaleString()} FCFA
                    </strong>

                </div>

            `;

      orderItems.appendChild(itemElement);
    });

    var subtotal = calculateSubtotal(cart);

    var deliveryFee = 2000;

    var total = subtotal + deliveryFee;

    if (subtotalElement) {
      subtotalElement.textContent = subtotal.toLocaleString() + " FCFA";
    }

    if (deliveryFeeElement) {
      deliveryFeeElement.textContent = deliveryFee.toLocaleString() + " FCFA";
    }

    if (totalElement) {
      totalElement.textContent = total.toLocaleString() + " FCFA";
    }
  }

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var cart = getCart();

      if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");

        return;
      }

      var fullNameElement = document.getElementById("full-name");

      var phoneElement = document.getElementById("phone");

      var emailElement = document.getElementById("email");

      var locationElement = document.getElementById("location");

      var addressElement = document.getElementById("address");

      var instructionsElement = document.getElementById("instructions");

      var paymentElement = document.querySelector(
        'input[name="payment"]:checked',
      );

      var fullName = fullNameElement ? fullNameElement.value.trim() : "";

      var phone = phoneElement ? phoneElement.value.trim() : "";

      var email = emailElement ? emailElement.value.trim() : "";

      var location = locationElement ? locationElement.value : "";

      var address = addressElement ? addressElement.value.trim() : "";

      var instructions = instructionsElement
        ? instructionsElement.value.trim()
        : "";

      if (
        fullName === "" ||
        phone === "" ||
        email === "" ||
        location === "" ||
        address === "" ||
        !paymentElement
      ) {
        alert("Please fill in all required fields.");

        return;
      }

      var subtotal = calculateSubtotal(cart);

      var deliveryFee = 2000;

      var total = subtotal + deliveryFee;

      var order = {
        id: "SLM-" + Date.now(),

        customer: {
          name: fullName,

          phone: phone,

          email: email,

          location: location,

          address: address,

          instructions: instructions,
        },

        products: cart,

        payment: paymentElement.value,

        subtotal: subtotal,

        deliveryFee: deliveryFee,

        total: total,

        status: "Pending",

        createdAt: new Date().toISOString(),
      };

      var orders = getOrders();

      orders.push(order);

      saveOrders(orders);

      localStorage.removeItem("cart");

      alert("Order placed successfully!\n\n" + "Order ID: " + order.id);

      window.location.href = "order-success.html";
    });
  }

  displayCart();
});
