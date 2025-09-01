

$(document).ready(function () {
    // Foto slider
    $('.main-carousel').flickity({
        freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
        contain: true,
        groupCells: false,
        wrapAround: true,
        cellAlign: 'center',
    });

    // Review slider
    var $reviewSlider = $('.review-slider').flickity({
        contain: true,
        groupCells: 1,
        wrapAround: true,
        cellAlign: 'left',
        prevNextButtons: false,
        pageDots: false
    });

    $('.review-prev').on('click', function () {
        $reviewSlider.flickity('previous');
    });

    $('.review-next').on('click', function () {
        $reviewSlider.flickity('next');
    });

    var flkty = $reviewSlider.data('flickity');
    var totalSlides = flkty.slides.length;

    function updateProgressBar(index) {
        var percentage = ((index + 1) / totalSlides) * 100;
        $('.review-progress-fill').css('width', percentage + '%');
    }

    updateProgressBar(flkty.selectedIndex);

    $reviewSlider.on('change.flickity', function (event, index) {
        updateProgressBar(index);
    });

    // Vertical slider
    var $carousel = $('.vertical-carousel').flickity({
        cellAlign: 'center',
        contain: true,
        prevNextButtons: true,
        autoPlay: 6000,
        pauseAutoPlayOnHover: false,
        pageDots: true,
        arrowShape: 'M49.25 82.5 L54.77 77.05 L32.05 54.34 H90.88 V46.45 H32.05 L54.77 23.81 L49.25 18.29 L17.14 50.4 L49.25 82.5 Z'
    });

    var flkty = $carousel.data('flickity');
    var $contents = $('.vertical-slider-content');

    $contents.hide().eq(flkty.selectedIndex).show();

    $carousel.on('change.flickity', function (event, index) {
        $contents.hide().eq(index).fadeIn(300);
    });

    $('.vertical-carousel .flickity-page-dots .dot').each(function () {
        if ($(this).find('.dot-progress').length === 0) {
            $(this).append('<span class="dot-progress"></span>');
        }
    });

    function animateCurrentDot() {
        $('.vertical-carousel .flickity-page-dots .dot').each(function (index) {
            var $progress = $(this).find('.dot-progress');
            $progress.css('animation', 'none');
            void this.offsetWidth;

            if (index === flkty.selectedIndex) {
                $progress.css('animation', 'fillBar 6s ease-in forwards');
            }
        });
    }

    $carousel.on('select.flickity', function () {
        animateCurrentDot();
    });

    animateCurrentDot();
});