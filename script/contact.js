"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var successMessage = document.getElementById("contact-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value.trim();

    successMessage.innerHTML = "";

    if (name === "") {
      successMessage.textContent = "Please enter your full name.";
      return;
    }

    if (name.length < 3) {
      successMessage.textContent = "Name must be at least 3 characters.";
      return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      successMessage.textContent = "Please enter your email.";
      return;
    }

    if (!emailPattern.test(email)) {
      successMessage.textContent = "Please enter a valid email address.";
      return;
    }

    var phonePattern = /^[0-9+\-\s]{9,15}$/;

    if (phone === "") {
      successMessage.textContent = "Please enter your phone number.";
      return;
    }

    if (!phonePattern.test(phone)) {
      successMessage.textContent = "Please enter a valid phone number.";
      return;
    }

    if (subject === "") {
      successMessage.textContent = "Please select a subject.";
      return;
    }

    if (message === "") {
      successMessage.textContent = "Please enter your message.";
      return;
    }

    if (message.length < 10) {
      successMessage.textContent = "Message must be at least 10 characters.";
      return;
    }

    successMessage.innerHTML =
      "<h3>Message Sent Successfully!</h3>" +
      "<p><strong>Name:</strong> " +
      name +
      "</p>" +
      "<p><strong>Email:</strong> " +
      email +
      "</p>" +
      "<p><strong>Phone:</strong> " +
      phone +
      "</p>" +
      "<p><strong>Subject:</strong> " +
      subject +
      "</p>" +
      "<p><strong>Message:</strong> " +
      message +
      "</p>";

    form.reset();
  });
});
