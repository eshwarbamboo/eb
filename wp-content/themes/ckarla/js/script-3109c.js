(function () {
    "use strict";
    var karla = {
    init: function () {
            this.cacheDom();
            this.bindEvents();
            this.initSlider();
            this.totopButton();
            this.enablePopupGallery();
        }
    , cacheDom: function () {
            this.toTop = jQuery('.totop');
            this._body = jQuery('body');
            this.karlaHomepageSlider = jQuery('.karla-slider');
            this.karlaInstaCarouselSlider = jQuery('.insta-carousel-slider');
            this.karlaInstaSlider = jQuery('.karla-insta-slider');
            this.karlaGalleryTabs = jQuery('.karla-toolbar-item');
            this.karlaGalleryItem = jQuery('.karla-gallery-item');
        }
    , bindEvents: function () {
            var self = this;
            this.karlaGalleryTabs.on('click', self.changeActiveTab);
            this.karlaGalleryTabs.on('click', self.addGalleryFilter);
            jQuery(window).on('load', self.enablePreloader);
        }
    , /* popup gallery */
    enablePopupGallery: function () {
            jQuery('.karla-popup-gallery').each(function () {
                jQuery(this).magnificPopup({
                    delegate: 'a'
                    , type: 'image'
                    , gallery: {
                        enabled: true
                    }
                });
            });
        }
    , /* preloader */
    enablePreloader: function () {
            var preloader = jQuery('#karla-page-loading').delay(500);
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        }
    , /* gallery tab */
    changeActiveTab: function () {
            jQuery(this).closest('.karla-gallery-toolbar').find('.active').removeClass('active');
            jQuery(this).addClass('active');
        }
    , /* gallery filter */
    addGalleryFilter: function () {
            var value = jQuery(this).attr('data-filter');
            if (value === 'all') {
                karla.karlaGalleryItem.show('3000');
            }
            else {
                karla.karlaGalleryItem.not('.' + value).hide('3000');
                karla.karlaGalleryItem.filter('.' + value).show('3000');
            }
        }
    , /* slider */
    initSlider: function () {
            var self = this;
            /* homepage slider */
            self.karlaHomepageSlider.slick({
                infinite: true
                , dots: true
                , arrows: false
                , autoplay: true
                , speed: 2000
                , slidesToShow: 1
                , slidesToScroll: 1
                , responsive: [
                    {
                        breakpoint: 768
                        , settings: {
                            slidesToShow: 1
                            , slidesToScroll: 1
                            , speed: 1000
                        }
			}
			]
            });
        }
    , /* ======= toTop ======= */
    totopButton: function () {
            var self = this;
            /* Show totop button*/
            jQuery(window).scroll(function () {
                var toTopOffset = self.toTop.offset().top;
                var toTopHidden = 1000;
                if (toTopOffset > toTopHidden) {
                    self.toTop.addClass('totop-vissible');
                }
                else {
                    self.toTop.removeClass('totop-vissible');
                }
            });
            /* totop button animation */
            if (self.toTop && self.toTop.length > 0) {
                self.toTop.on('click', function (e) {
                    e.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                });
            }
        }
    };
    
    // Main footer 
    var footer = jQuery("footer").outerHeight();
    jQuery("main").css("marginBottom", footer);
    

    // Burger Menu 
    var burgerMenu = function () {
        jQuery('.js-ckarla-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = jQuery(this);
            if (jQuery('body').hasClass('offcanvas')) {
                $this.removeClass('active');
                jQuery('body').removeClass('offcanvas');
            }
            else {
                $this.addClass('active');
                jQuery('body').addClass('offcanvas');
            }
        });
    };
    
    // Click outside of offcanvass
    var mobileMenuOutsideClick = function () {
        jQuery(document).click(function (e) {
            var container = jQuery("#ckarla-aside, .js-ckarla-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if (jQuery('body').hasClass('offcanvas')) {
                    jQuery('body').removeClass('offcanvas');
                    jQuery('.js-ckarla-nav-toggle').removeClass('active');
                }
            }
        });
        jQuery(window).scroll(function () {
            if (jQuery('body').hasClass('offcanvas')) {
                jQuery('body').removeClass('offcanvas');
                jQuery('.js-ckarla-nav-toggle').removeClass('active');
            }
        });
    };
    
    // Sub Menu 
    jQuery('.ckarla-main-menu li.ckarla-sub>a').on('click', function () {
        jQuery(this).removeAttr('href');
        var element = jQuery(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
    jQuery('.ckarla-main-menu>ul>li.ckarla-sub>a').append('<span class="holder"></span>');
    
    // Document on load.
    jQuery(function () {
        burgerMenu();
        mobileMenuOutsideClick();
    });
    
    var wind = jQuery(window);

    
    // Navbar scrolling background 
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop()
            , navbar = jQuery(".navbar")
            , logo = jQuery(".navbar:not(.nav-box) .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        }
        else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        }
    });
    
    // close navbar-collapse when a clicked
    jQuery(".navbar-nav a").on('click', function () {
        jQuery(".navbar-collapse").removeClass("show");
    });
    
    // Sections Background Image
    var pageSection = jQuery(".bg-img, section");
    pageSection.each(function (indx) {
        if (jQuery(this).attr("data-background")) {
            jQuery(this).css("background-image", "url(" + jQuery(this).data("background") + ")");
        }
    });
    // Clients owlCarousel
    jQuery('.clients .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: true
        , dots: false
        , responsiveClass: true
        , responsive: {
            0: {
                margin: 10
                , items: 2
            }
            , 600: {
                items: 3
            }
            , 1000: {
                items: 5
            }
        }
    });
    // Testimonials owlCarousel
    jQuery('.testimonials .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , nav: false
        , navText: ["<i class='lnr ti-angle-left'></i>", "<i class='lnr ti-angle-right'></i>"]
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 1
            }
        }
    });
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        jQuery('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !jQuery(this.element).hasClass('animated')) {
                i++;
                jQuery(this.element).addClass('item-animate');
                setTimeout(function () {
                    jQuery('body .animate-box.item-animate').each(function (k) {
                        var el = jQuery(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            }
                            else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            }
                            else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            }
                            else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    jQuery(function () {
        contentWayPoint();
    });
    // img zoom
    jQuery(".img-zoom").magnificPopup({
            type: "image"
            , closeOnContentClick: !0
            , mainClass: "mfp-fade"
            , gallery: {
                enabled: !0
                , navigateByImgClick: !0
                , preload: [0, 1]
            }
        })
    // Accordion
    jQuery(".accordion").on("click", ".title", function () {
        jQuery(this).next().slideDown();
        jQuery(".accordion-info").not(jQuery(this).next()).slideUp();
    });
    jQuery(".accordion").on("click", ".item", function () {
        jQuery(this).addClass("active").siblings().removeClass("active");
    });
    // Popup Video
    jQuery(document).ready(function() {
        jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-custom').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    karla.init();
})();