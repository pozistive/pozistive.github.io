/*global $ */
$(document).ready(function () {
    "use strict";

    $(".chill-slider").slick({
        dots: true,             // Включаем пейджер (кружочки)
        infinite: true,         // Бесконечная прокрутка
        slidesToShow: 3,        // По умолчанию 3 картинки (для ПК)
        slidesToScroll: 3,      // Листать по 3 штуки за раз
        prevArrow: '<button type="button" class="slick-prev">←</button>', // Стрелка влево
        nextArrow: '<button type="button" class="slick-next">→</button>', // Стрелка вправо
        responsive: [
            {
                breakpoint: 768, // На экранах меньше 768px (смартфоны)
                settings: {
                    slidesToShow: 1,   // Показываем ровно 1 картинку
                    slidesToScroll: 1  // Листаем по 1 штуке
                }
            }
        ]
    });
});
