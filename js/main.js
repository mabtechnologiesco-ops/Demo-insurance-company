(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
    // UNICOM: dynamic copyright year
    $('[data-current-year]').each(function () {
        $(this).text(new Date().getFullYear());
    });


    // UNICOM: enquiry forms - validate, then prepare the message in the
    // visitor's own email application (no server-side sending is claimed).
    $('form[data-unicom-enquiry]').each(function () {
        var form = this;
        var $form = $(form);
        var $status = $form.find('.form-status');

        function showError(message) {
            $form.addClass('was-validated');
            $status
                .removeClass('alert alert-success')
                .addClass('alert alert-danger')
                .text(message);
        }

        // Native 'invalid' events do not bubble, so listen while capturing.
        form.addEventListener(
            'invalid',
            function () {
                showError(
                    'Please complete the required fields before sending your enquiry.'
                );
            },
            true
        );

        form.addEventListener('submit', function (event) {
            if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
                showError(
                    'Please complete the required fields before sending your enquiry.'
                );
                return; // Let the browser show its own field messages too
            }

            event.preventDefault();

            var data = {};
            $form.find('input[name], select[name], textarea[name]').each(function () {
                data[$(this).attr('name')] = $.trim($(this).val());
            });

            var subject = 'UNICOM website enquiry';
            if (data.category) {
                subject += ' - ' + data.category;
            }
            if (data.subject) {
                subject += ' - ' + data.subject;
            }

            var lines = [
                'Name: ' + (data.name || ''),
                'Email: ' + (data.email || ''),
                'Phone: ' + (data.phone || ''),
                'Insurance Category: ' + (data.category || ''),
                '',
                data.message || ''
            ];

            window.location.href =
                'mailto:unicomsl.Itd2025@gmail.com?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent(lines.join('\r\n'));

            $status
                .removeClass('alert alert-danger')
                .addClass('alert alert-success')
                .text(
                    'Your email application should now open with your enquiry prepared. ' +
                    'If it does not open, please email us directly at ' +
                    'unicomsl.Itd2025@gmail.com or call +232-74-124-253.'
                );
        });
    });


})(jQuery);

