document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // 1. Определение констант и цен
    const prices = {
        type1: 100,
        type2: 200,
        type3: 300
    };

    // 2. Поиск всех необходимых элементов DOM
    const quantityInput = document.getElementById("quantity-input");
    const optionsContainer = document.getElementById("options-container");
    const propertiesContainer = document.getElementById("properties-container");
    const productOptions = document.getElementById("product-options");
    const productProperties = document.getElementById("product-properties");
    const errorMessage = document.getElementById("error-message");
    const resultMessage = document.getElementById("result-message");
    const calculateBtn = document.getElementById("calculate-btn");
    const orderForm = document.getElementById("order-form");

    // 3. Функция управления видимостью блоков на основе выбранного типа
    function updateVisibility() {
        const selectedRadio = orderForm.querySelector("input[name='product-type']:checked");
        if (!selectedRadio) {
            return;
        }

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

    // 4. Главная функция расчета стоимости
    function calculateTotal() {
        // Сброс сообщений
        errorMessage.textContent = "";
        resultMessage.textContent = "";

        // Проверка количества (целое положительное число)
        const quantityText = quantityInput.value.trim();
        const quantity = parseInt(quantityText, 10);
        const regExp = /^[1-9]\d*$/;

        if (!regExp.test(quantityText)) {
            errorMessage.textContent = "Ошибка: введите корректное целое положительное количество.";
            return;
        }

        // Определение базовой цены типа
        const selectedRadio = orderForm.querySelector("input[name='product-type']:checked");
        if (!selectedRadio) {
            return;
        }
        
        const currentType = selectedRadio.value;
        let basePrice = prices[currentType];

        // Расчет добавочной стоимости в зависимости от типа
        if (currentType === "type2") {
            basePrice += parseInt(productOptions.value, 10);
        } else if (currentType === "type3") {
            if (productProperties.checked) {
                basePrice += parseInt(productProperties.value, 10);
            }
        }

        // Вывод результата
        const finalPrice = basePrice * quantity;
        resultMessage.textContent = "Стоимость дзена: " + String(finalPrice) + " руб.";
    }

    // 5. Навешивание обработчиков событий
    // При смене радиокнопок — обновляем видимость селекта/чекбокса и сразу пересчитываем
    orderForm.querySelectorAll("input[name='product-type']").forEach(function (radio) {
        radio.addEventListener("change", function () {
            updateVisibility();
            calculateTotal();
        });
    });

    // Изменение внутренних опций (селекта, чекбокса и ввода количества) генерирует автопересчет
    productOptions.addEventListener("change", calculateTotal);
    productProperties.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    // Дополнительный вызов при клике на красивую кнопку из CSS
    calculateBtn.addEventListener("click", calculateTotal);

    // Стартовая инициализация при загрузке
    updateVisibility();
    calculateTotal();
    // ==========================================================================
    // ЛОГИКА ДЛЯ МИЛОГО ЧИЛЛ-ЦЕНТРА В СИНЕМ БЛОКЕ
    // ==========================================================================

    const ambientSelect = document.getElementById("ambient-select");
    const phraseBtn = document.getElementById("chill-phrase-btn") || document.querySelector(".chill-phrase-btn");
    const phraseDisplay = document.getElementById("phrase-display");

    // Список всех доступных аудиоэлементов
    const tracks = {
        rain: document.getElementById("audio-rain"),
        fire: document.getElementById("audio-fire"),
        forest: document.getElementById("audio-forest")
    };

    // Массив объектов (имитация JSON) с супер-чиловыми мыслями
    const chillPhrases = [
        "Сделай глубокий вдох. Всё, что происходит сейчас — временное. Ты отлично справляешься. ✨",
        "Мир подождет 5 минут. Позволь себе роскошь просто сидеть, смотреть в экран и ни о чем не думать. ☕",
        "Твоя ценность не измеряется продуктивностью. Быть уставшим — это нормально. Отдыхай без чувства вины. ☁️",
        "Прямо сейчас расслабь плечи, разомкни зубы и убери язык от неба. Вот так, лучше. 🌿",
        "Вселенная шепчет: ты находишься именно там, где должен быть. Не торопись жить эту жизнь. 🌍",
        "Здесь нет дедлайнов. Здесь нет оценок. Только ты, мягкий свет монитора и полный покой. 🧘‍♂️",
        "Чашка теплого чая (даже виртуального) способна согреть изнутри. Позволь мыслям течь плавно. 🍂"
    ];

    // Функция управления плеером фоновых звуков
    ambientSelect.addEventListener("change", function () {
        const selectedValue = ambientSelect.value;

        // Останавливаем абсолютно все треки
        Object.keys(tracks).forEach(function (key) {
            if (tracks[key]) {
                tracks[key].pause();
            }
        });

        // Включаем выбранный трек с тихой комфортной громкостью
        if (selectedValue !== "none" && tracks[selectedValue]) {
            tracks[selectedValue].volume = 0.25; // 25% громкости, чтобы не пугать
            tracks[selectedValue].play().catch(function () {
                console.log("Браузер заблокировал автовоспроизведение до первого клика по странице.");
            });
        }
    });

    // Функция генерации случайной фразы
    phraseBtn.addEventListener("click", function () {
        // Выбираем случайный индекс из массива
        const randomIndex = Math.floor(Math.random() * chillPhrases.length);
        
        // Выводим текст и плавно показываем блок
        phraseDisplay.textContent = chillPhrases[randomIndex];
        phraseDisplay.style.display = "block";
    });
});
