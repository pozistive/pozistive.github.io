/*global $ */
$(document).ready(function () {
    "use strict";

    $(".chill-slider").slick({
        dots: true,             // Отображать точки-пейджер
        infinite: true,         // Бесконечная прокрутка
        slidesToShow: 3,        // 3 картинки на ПК
        slidesToScroll: 1,      // Листать по 1 картинке
        prevArrow: '<button type="button" class="slick-prev">←</button>',
        nextArrow: '<button type="button" class="slick-next">→</button>',
        responsive: [
            {
                breakpoint: 768, // На смартфонах
                settings: {
                    slidesToShow: 1, // 1 картинка на смартфоне
                    slidesToScroll: 1
                }
            }
        ]
    });
});
