$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        // autoplay: 6000,
        speed: 1000,
        center: true,
        items: 2,
        loop: true,
        margin: 10,
        dots: true,
        responsive: {
            600: {
                items: 1
            },
            400: {
                items: 1
            }
        }

    });

    /* ---- our ideology hover ---- */
    $('.ideology-box').hover(function () {
        $(this).find('.wrapper').hide();
        $(this).find('.wrapper-hidden').fadeIn();
    }, function () {
        $(this).find('.wrapper-hidden').hide();
        $(this).find('.wrapper').fadeIn();
    });
    $("i.ion-mouse").on("click", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id = $(this).parent().attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 85;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({
            scrollTop: top
        }, 1500);

    });

    $(document).ready(function () {
        $(".nav").on("click", "a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            //забираем идентификатор бока с атрибута href
            var id = $(this).attr('href'),
                //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top - 85;
            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({
                scrollTop: top
            }, 1500);
        });
    });


    var navChildren = $(".nav li").children();
    var aArray = [];
    for (var i = 0; i < navChildren.length; i++) {
        var aChild = navChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    for (var i = 0; i < navChildren.length; i++) {
        console.log(aArray[i]);
    }
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var secPosition = $(theID).offset().top;
            secPosition = secPosition - 135;
            var divHeight = $(theID).height();
            divHeight = divHeight + 90;
            if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                $("a[href='" + theID + "']").addClass("active");
            } else {
                $("a[href='" + theID + "']").removeClass("active");
            }
        }
    });

    var progresBars1 = new Waypoint({
        element: document.getElementById('Progressbar'),
        handler: function (direction) {
            $('.progress-bar1').css('width', '50%');
            $('.progress-bar2').css('width', '70%');
            $('.progress-bar3').css('width', '80%');
            $('.progress-bar4').css('width', '90%');
            $('.progress-bar5').css('width', '60%');
            progresBars1.disable();
        },
        offset: 'bottom-in-view'
    });

    particlesJS.load('particles-js', 'libs/particles.js-master/particlesjs-config.json');


    var countTo = new Waypoint({
        element: document.getElementById('Timers'),
        handler: function (direction) {

            $('.timer').countTo();
        },
        offset: 'bottom-in-view'
    });
    var progressBars2 = new Waypoint({
        element: document.getElementById('Progressbar2'),
        handler: function (direction) {
            $('.progress-bar21').css('width', '50%');
            $('.progress-bar22').css('width', '70%');
            $('.progress-bar23').css('width', '80%');
            progressBars2.disable();
        },
        offset: 'bottom-in-view'
    })
    var containerEl = document.querySelector('.mixitup');
    var mixer = mixitup(containerEl, {
        animation: {
            animateResizeTargets: true
        }
    });
    $('.icons-wrapper').magnificPopup({
        delegate: '.popup', // child items selector, by clicking on it popup will open
        type: 'image',
        // other options
        gallery: {
            // options for gallery
            enabled: true
        },
    });
    $("#Form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#subject").val();
        var message = $("#message").val();
        $.ajax({
            type: "POST",
            url: "php/contact.php",
            data: "name=" + name + "&email=" + email + "&msg_subject=" +
                msg_subject + "&message=" + message,
            success: function (text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#Form")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#Form").removeClass().addClass('shake animated').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            function () {
                $(this).removeClass();
            });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

});
