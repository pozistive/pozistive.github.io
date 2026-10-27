/*global jQuery */
jQuery(document).ready(function ($) {
    "use strict";

    var $slider = $(".chill-slider"),
        $slides = $slider.children("div"),
        totalSlides = $slides.length,
        currentIndex = 0;

    // 1. Динамически создаем стрелки управления (Требование 1)
    $slider.after('<div class="slider-controls">' +
        '<button type="button" class="custom-prev">←</button>' +
        '<div class="custom-dots"></div>' +
        '<button type="button" class="custom-next">→</button>' +
        '</div>');

    var $dotsContainer = $(".custom-dots");

    // 2. Генерируем пейджер (Требование 2)
    function updatePager() {
        var slidesToShow = ($(window).width() < 768) ? 1 : 3,
            maxIndex = totalSlides - slidesToShow,
            i;

        if (currentIndex > maxIndex) { currentIndex = maxIndex; }
        if (currentIndex < 0) { currentIndex = 0; }

        $dotsContainer.empty();
        
        // Создаем точки для каждой доступной страницы
        for (i = 0; i <= maxIndex; i += 1) {
            if (i === currentIndex) {
                $dotsContainer.append('<span class="dot active"></span>');
            } else {
                $dotsContainer.append('<span class="dot" data-index="' + i + '"></span>');
            }
        }

        // Сдвигаем слайдер (Технология без перезагрузки страницы)
        var slideWidth = $slides.first().outerWidth();
        $slider.css("transform", "translateX(" + (-currentIndex * slideWidth) + "px)");
    }

    // 3. Логика перелистывания по клику на стрелки
    $(document).on("click", ".custom-next", function () {
        var slidesToShow = ($(window).width() < 768) ? 1 : 3;
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex += 1;
            updatePager();
        }
    });

    $(document).on("click", ".custom-prev", function () {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updatePager();
        }
    });

    // 4. Клик по точкам пейджера
    $(document).on("click", ".dot", function () {
        var idx = $(this).data("index");
        if (idx !== undefined) {
            currentIndex = parseInt(idx, 10);
            updatePager();
        }
    });

    // Пересчет при изменении размеров экрана (Адаптивность)
    $(window).on("resize", updatePager);

    // Первоначальный запуск
    updatePager();
});
