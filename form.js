/*global window, document, localStorage, fetch */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var openBtn = document.querySelector(".open-form-btn"),
        popup = document.getElementById("contact-popup"),
        closeBtn = document.querySelector(".close-popup-btn"),
        form = document.getElementById("feedback-form"),
        resultMsg = document.getElementById("form-result-message"),
        fields = ["user-fio", "user-email", "user-phone", "user-org", "user-message"],
        hashName = "#contact";

    // --- 1. Работа с LocalStorage (Сохранение данных) ---
    function saveToLocalStorage() {
        fields.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                localStorage.setItem(id, element.value);
            }
        });
        var agreeCheckbox = document.getElementById("user-agree");
        if (agreeCheckbox) {
            localStorage.setItem("user-agree", agreeCheckbox.checked ? "true" : "false");
        }
    }

    // Восстановление данных при загрузке
    fields.forEach(function (id) {
        var element = document.getElementById(id);
        if (element && localStorage.getItem(id)) {
            element.value = localStorage.getItem(id);
        }
    });
    var savedAgree = localStorage.getItem("user-agree");
    if (savedAgree && document.getElementById("user-agree")) {
        document.getElementById("user-agree").checked = (savedAgree === "true");
    }

    // Слушаем изменения в полях для автосохранения
    form.addEventListener("input", saveToLocalStorage);

    // --- 2. Логика Попапа и History API ---
    function openPopup() {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden"; // Запрещаем прокрутку фона
        if (window.location.hash !== hashName) {
            window.history.pushState({popup: "open"}, "", hashName);
        }
    }

    function closePopup() {
        popup.style.display = "none";
        document.body.style.overflow = "auto"; // Возвращаем прокрутку фона
        if (window.location.hash === hashName) {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }

    openBtn.addEventListener("click", openPopup);
    closeBtn.addEventListener("click", closePopup);

    // Закрытие по клику на оверлей вокруг формы
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Обработка кнопки "Назад" в браузере
    window.addEventListener("popstate", function () {
        if (window.location.hash !== hashName) {
            popup.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    });

    // Проверка хэша при прямой загрузке страницы
    if (window.location.hash === hashName) {
        openPopup();
    }

    // --- 3. AJAX отправка через fetch ---
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        resultMsg.className = "popup-result-text";
        resultMsg.textContent = "Отправка данных...";
        resultMsg.style.display = "block";

        var formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(function (response) {
            if (response.ok) {
                resultMsg.textContent = "Форма успешно отправлена! ✨";
                resultMsg.classList.add("success-text");
                
                // Очистка формы и LocalStorage
                form.reset();
                localStorage.clear();
            } else {
                resultMsg.textContent = "Ошибка сервера. Попробуйте позже.";
                resultMsg.classList.add("error-text");
            }
        })
        .catch(function () {
            resultMsg.textContent = "Не удалось отправить форму. Проверьте интернет.";
            resultMsg.classList.add("error-text");
        });
    });
});
