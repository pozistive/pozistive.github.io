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

    form.addEventListener("input", saveToLocalStorage);

    // --- 2. Логика Попапа и History API ---
    function openPopup() {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
        if (window.location.hash !== hashName) {
            window.history.pushState({popup: "open"}, "", hashName);
        }
    }

    function closePopup() {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
        if (window.location.hash === hashName) {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }

    openBtn.addEventListener("click", openPopup);
    closeBtn.addEventListener("click", closePopup);

    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    window.addEventListener("popstate", function () {
        if (window.location.hash !== hashName) {
            popup.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    });

    if (window.location.hash === hashName) {
        openPopup();
    }

    // --- 3. ЖЕСТКАЯ ВАЛИДАЦИЯ И AJAX ОТПРАВКА ---
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Сбрасываем стили сообщения
        resultMsg.className = "popup-result-text";
        resultMsg.style.display = "none";

        // Получаем значения полей и очищаем от лишних пробелов по краям
        var fio = document.getElementById("user-fio").value.trim(),
            email = document.getElementById("user-email").value.trim(),
            phone = document.getElementById("user-phone").value.trim();

        // 1. Регулярное выражение для ФИО (минимум 2 слова, только буквы и пробелы)
        var fioRegex = /^[a-zA-Zа-яА-ЯёЁ\s]{2,}\s+[a-zA-Zа-яА-ЯёЁ\s]{2,}/;
        
        // 2. Регулярное выражение для Email (строгая проверка домена второго и верхнего уровня)
        var emailRegex = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        // 3. Регулярное выражение для Телефона (разрешает +, цифры, скобки и дефисы, минимум 10 цифр)
        var phoneRegex = /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/;

        // Проверка ФИО
        if (!fioRegex.test(fio)) {
            resultMsg.textContent = "Пожалуйста, введите корректное ФИО (минимум Фамилия и Имя без цифр).";
            resultMsg.classList.add("error-text");
            resultMsg.style.display = "block";
            return false;
        }

        // Проверка Email
        if (!emailRegex.test(email)) {
            resultMsg.textContent = "Некорректный формат Email (например: name@mail.ru).";
            resultMsg.classList.add("error-text");
            resultMsg.style.display = "block";
            return false;
        }

        // Проверка Телефона
        if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10) {
            resultMsg.textContent = "Введите корректный номер телефона (минимум 10 цифр).";
            resultMsg.classList.add("error-text");
            resultMsg.style.display = "block";
            return false;
        }

        // Если все проверки пройдены — запускаем fetch отправку
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
