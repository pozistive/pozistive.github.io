/*global window, document */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var burgerBtn = document.querySelector(".mobile-menu-toggle");
    var mainNav = document.querySelector(".main-nav");
    var dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener("click", function () {
            mainNav.classList.toggle("is-open");
        });
    }

    dropdownTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                trigger.parentElement.classList.toggle("submenu-open");
            }
        });
    });
});
