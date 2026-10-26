/*global $ */
$(window).on('load', function () {
    "use strict";

    // Инициализация слайдера только после полной загрузки всех ресурсов страницы
    $(".chill-slider").slick({
        dots: true,             // Включаем точки (пейджер)
        infinite: true,         // Бесконечная прокрутка
        slidesToShow: 3,        // 3 картинки на ПК
        slidesToScroll: 1,      // Прокручивать по 1 картинке для плавности
        prevArrow: '<button type="button" class="slick-prev">←</button>',
        nextArrow: '<button type="button" class="slick-next">→</button>',
        responsive: [
            {
                breakpoint: 768, // На экранах смартфонов (меньше 768px)
                settings: {
                    slidesToShow: 1,   // Показываем ровно 1 картинку
                    slidesToScroll: 1
                }
            }
        ]
    });
});
