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

    // 2. Генерируем пейджер и двигаем ленту
    function updatePager() {
        var isMobile = ($(window).width() < 768),
            slidesToShow = isMobile ? 1 : 3,
            maxIndex = totalSlides - slidesToShow,
            stepPercent = isMobile ? 100 : 33.3333, // Сдвиг на 100% или на 33.33% за шаг
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

        // Двигаем слайдер через точные проценты флекс-долей (Технология без перезагрузки)
        $slider.css("transform", "translateX(" + (-currentIndex * stepPercent) + "%)");
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
