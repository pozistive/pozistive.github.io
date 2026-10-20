document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ==========================================================================
    // 1. КАЛЬКУЛЯТОР СТОИМОСТИ (ЗАДАНИЕ 6)
    // ==========================================================================
    const prices = {
        type1: 100,
        type2: 200,
        type3: 300
    };

    const quantityInput = document.getElementById("quantity-input");
    const optionsContainer = document.getElementById("options-container");
    const propertiesContainer = document.getElementById("properties-container");
    const productOptions = document.getElementById("product-options");
    const productProperties = document.getElementById("product-properties");
    const errorMessage = document.getElementById("error-message");
    const resultMessage = document.getElementById("result-message");
    const calculateBtn = document.getElementById("calculate-btn");
    const orderForm = document.getElementById("order-form");

    function updateVisibility() {
        const selectedRadio = orderForm.querySelector("input[name='product-type']:checked");
        if (!selectedRadio) { return; }

        if (selectedRadio.value === "type1") {
            optionsContainer.style.display = "none";
            propertiesContainer.style.display = "none";
        } else if (selectedRadio.value === "type2") {
            optionsContainer.style.display = "block";
            propertiesContainer.style.display = "none";
        } else if (selectedRadio.value === "type3") {
            optionsContainer.style.display = "none";
            propertiesContainer.style.display = "block";
        }
    }

    function calculateTotal() {
        errorMessage.textContent = "";
        resultMessage.textContent = "";

        const quantityText = quantityInput.value.trim();
        const quantity = parseInt(quantityText, 10);
        const regExp = /^[1-9]\d*$/;

        if (!regExp.test(quantityText)) {
            errorMessage.textContent = "Ошибка: введите корректное целое положительное количество.";
            return;
        }

        const selectedRadio = orderForm.querySelector("input[name='product-type']:checked");
        if (!selectedRadio) { return; }
        
        const currentType = selectedRadio.value;
        let basePrice = prices[currentType];

        if (currentType === "type2") {
            basePrice += parseInt(productOptions.value, 10);
        } else if (currentType === "type3") {
            if (productProperties.checked) {
                basePrice += parseInt(productProperties.value, 10);
            }
        }

        const finalPrice = basePrice * quantity;
        resultMessage.textContent = "Стоимость дзена: " + String(finalPrice) + " руб.";
    }

    // Навешиваем события на форму калькулятора
    if (orderForm) {
        orderForm.querySelectorAll("input[name='product-type']").forEach(function (radio) {
            radio.addEventListener("change", function () {
                updateVisibility();
                calculateTotal();
            });
        });
    }
    if (productOptions) { productOptions.addEventListener("change", calculateTotal); }
    if (productProperties) { productProperties.addEventListener("change", calculateTotal); }
    if (quantityInput) { quantityInput.addEventListener("input", calculateTotal); }
    if (calculateBtn) { calculateBtn.addEventListener("click", calculateTotal); }


    // ==========================================================================
    // 2. ИНТЕРАКТИВНЫЙ ЧИЛЛ-ЦЕНТР (СИНИЙ БЛОК)
    // ==========================================================================
    const ambientSelect = document.getElementById("ambient-select");
    const phraseDisplay = document.getElementById("phrase-display");
    
    // Ищем кнопку по её классу, как в самом первом рабочем коде
    const phraseBtn = document.querySelector(".chill-phrase-btn");

    const tracks = {
        rain: document.getElementById("audio-rain"),
        fire: document.getElementById("audio-fire"),
        forest: document.getElementById("audio-forest")
    };

    const chillPhrases = [
        "Сделай глубокий вдох. Всё, что происходит сейчас — временное. Ты отлично справляешься. ✨",
        "Мир подождет 5 минут. Позволь себе роскошь просто сидеть, смотреть в экран и ни о чем не думать. ☕",
        "Твоя ценность не измеряется продуктивностью. Быть уставшим — это нормально. Отдыхай без чувства вины. ☁️",
        "Прямо сейчас расслабь плечи, разомкни зубы и убери язык от неба. Вот так, лучше. 🌿",
        "Вселенная шепчет: ты находишься именно там, где должен быть. Не торопись жить эту жизнь. 🌍",
        "Здесь нет дедлайнов. Здесь нет оценок. Только ты, мягкий свет монитора и полный покой. 🧘‍♂️",
        "Чашка теплого чая (даже виртуального) способна согреть изнутри. Позволь мыслям течь плавно. 🍂"
    ];

    // Управление звуками
    if (ambientSelect) {
        ambientSelect.addEventListener("change", function () {
            const selectedValue = ambientSelect.value;

            Object.keys(tracks).forEach(function (key) {
                if (tracks[key]) {
                    tracks[key].pause();
                    tracks[key].currentTime = 0; 
                }
            });

            if (selectedValue !== "none" && tracks[selectedValue]) {
                tracks[selectedValue].volume = 0.5; 
                tracks[selectedValue].play().catch(function (error) {
                    console.log("Ждем клика для музыки: ", error);
                });
            }
        });
    }

    // Тот самый первый рабочий клик кнопки дзена
    if (phraseBtn) {
        phraseBtn.addEventListener("click", function () {
            const randomIndex = Math.floor(Math.random() * chillPhrases.length);
            phraseDisplay.textContent = chillPhrases[randomIndex];
            phraseDisplay.style.display = "block";
        });
    }

    // Старт при загрузке
    updateVisibility();
    calculateTotal();
});
