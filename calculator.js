/*jslint browser: true, tolerate: true */
/*global window, document, parseInt */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var calculateBtn = document.getElementById("calculate-btn");
    var quantityInput = document.getElementById("quantity-input");
    var productSelect = document.getElementById("product-select");
    var errorMessage = document.getElementById("error-message");
    var resultMessage = document.getElementById("result-message");

    function calculateOrder() {
        var quantityStr = quantityInput.value.trim();
        var price = parseInt(productSelect.value, 10);
        var quantity;
        var total;
        var regExp = /^[1-9][0-9]*$/;

        errorMessage.innerText = "";
        resultMessage.innerText = "";

        if (!regExp.test(quantityStr)) {
            errorMessage.innerText = "Упс! Для сохранения гармонии введите корректное целое число ритуалов ✨";
            return;
        }

        quantity = parseInt(quantityStr, 10);
        total = price * quantity;
        resultMessage.innerText = "Стоимость вашего момента спокойствия: " + total + " руб. Наслаждайтесь моментом!";
    }

    if (calculateBtn) {
        calculateBtn.addEventListener("click", calculateOrder);
    }
});
