/*global jQuery */
jQuery(document).ready(function ($) {
    "use strict";

    $(".chill-slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev">←</button>',
        nextArrow: '<button type="button" class="slick-next">→</button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
