/* Fyndo Custom JavaScript */

(function($) {
    'use strict';

    // Initialize when DOM is ready
    $(document).ready(function() {
        initFyndo();
    });

    function initFyndo() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                easing: 'ease-out-cubic'
            });
        }

        // Initialize mobile menu
        initMobileMenu();
        
        // Initialize navigation
        initNavigation();
        
        // Initialize scroll effects
        initScrollEffects();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize tabs
        initTabs();
        
        // Initialize counters
        initCounters();
        
        // Initialize preloader
        initPreloader();
    }    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuToggle = $('.nav-toggle');
        const navMenu = $('.nav-menu');
        const overlay = $('.overlay');

        menuToggle.on('click', function() {
            $(this).toggleClass('active');
            navMenu.toggleClass('active');
            overlay.toggleClass('active');
            $('body').toggleClass('menu-open');
        });

        overlay.on('click', closeMobileMenu);

        function closeMobileMenu() {
            menuToggle.removeClass('active');
            navMenu.removeClass('active');
            overlay.removeClass('active');
            $('body').removeClass('menu-open');
        }

        // Close mobile menu on window resize
        $(window).on('resize', function() {
            if ($(window).width() > 991) {
                closeMobileMenu();
            }
        });

        // Handle dropdown clicks in mobile menu
        $('.nav-menu .dropdown > .nav-link').on('click', function(e) {
            if ($(window).width() <= 991) {
                e.preventDefault();
                const dropdown = $(this).parent();
                const dropdownMenu = dropdown.find('.dropdown-menu');
                
                // Close other dropdowns
                $('.nav-menu .dropdown').not(dropdown).removeClass('active');
                $('.nav-menu .dropdown-menu').not(dropdownMenu).slideUp();
                
                // Toggle current dropdown
                dropdown.toggleClass('active');
                dropdownMenu.slideToggle();
            }
        });
    }// Navigation Effects
    function initNavigation() {
        const header = $('.header');
        
        // Dropdown hover effects for desktop
        $('.dropdown').hover(
            function() {
                $(this).find('.dropdown-menu').stop().fadeIn(200).css({
                    'opacity': '1',
                    'visibility': 'visible',
                    'transform': 'translateY(0)'
                });
            },
            function() {
                $(this).find('.dropdown-menu').stop().fadeOut(200).css({
                    'opacity': '0',
                    'visibility': 'hidden',
                    'transform': 'translateY(-10px)'
                });
            }
        );

        // Mobile menu toggle
        const navToggle = $('#nav-toggle');
        const navMenu = $('#nav-menu');
        
        navToggle.on('click', function() {
            navMenu.toggleClass('active');
            $(this).toggleClass('active');
        });

        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.nav').length) {
                navMenu.removeClass('active');
                navToggle.removeClass('active');
            }
        });

        // Header scroll effect
        let lastScrollTop = 0;
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.addClass('header-hidden');
            } else {
                header.removeClass('header-hidden');
            }
            lastScrollTop = scrollTop;
        });
    }

    // Scroll Effects
    function initScrollEffects() {
        // Progress bar on scroll
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height();
            const winHeight = $(window).height();
            const scrollPercent = (scrollTop) / (docHeight - winHeight);
            const scrollPercentRounded = Math.round(scrollPercent * 100);
            
            $('.progress-wrap svg path').css('stroke-dasharray', `${scrollPercentRounded * 2.51}, 999`);
        });

        // Scroll to top button
        $('.progress-wrap').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

        // Show/hide scroll to top button
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $('.progress-wrap').addClass('active-progress');
            } else {
                $('.progress-wrap').removeClass('active-progress');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                const headerHeight = $('.header-area').outerHeight();
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight - 20
                }, 800);
            }
        });
    }

    // Initialize Bootstrap Tabs with Custom Effects
    function initTabs() {
        $('.solutions-tabs .nav-link').on('click', function() {
            const tabContent = $($(this).attr('data-bs-target'));
            
            // Add fade effect
            $('.tab-pane.active').fadeOut(200, function() {
                tabContent.fadeIn(200);
            });
        });
    }

    // Initialize Counters
    function initCounters() {
        const counters = $('.stat-number');
        let hasAnimated = false;

        function animateCounters() {
            if (hasAnimated) return;
            
            counters.each(function() {
                const $this = $(this);
                const countTo = parseInt($this.text().replace(/[^\d]/g, ''));
                const countText = $this.text();
                const suffix = countText.replace(/[\d]/g, '');
                
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum) + suffix);
                    },
                    complete: function() {
                        $this.text(countTo + suffix);
                    }
                });
            });
            hasAnimated = true;
        }

        // Trigger animation when hero section is in view
        $(window).on('scroll', function() {
            const heroSection = $('.hero-section');
            if (heroSection.length) {
                const heroTop = heroSection.offset().top;
                const heroHeight = heroSection.outerHeight();
                const scrollTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                if (scrollTop + windowHeight > heroTop + heroHeight / 2) {
                    animateCounters();
                }
            }
        });
    }

    // Preloader
    function initPreloader() {
        $(window).on('load', function() {
            $('.preloader').fadeOut(500);
        });
    }

    // Utility Functions
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Initialize particles effect for hero background (optional enhancement)
    function initParticles() {
        // This can be expanded with a particles library if needed
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50 },
                    color: { value: '#ffffff' },
                    opacity: { value: 0.3 },
                    size: { value: 3 },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        out_mode: 'out'
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' }
                    }
                }
            });
        }
    }

    // Form Validation (for contact forms)
    function initFormValidation() {
        $('form').on('submit', function(e) {
            let isValid = true;
            const form = $(this);
            
            // Basic validation
            form.find('[required]').each(function() {
                const field = $(this);
                if (!field.val().trim()) {
                    isValid = false;
                    field.addClass('error');
                } else {
                    field.removeClass('error');
                }
            });
            
            // Email validation
            form.find('input[type="email"]').each(function() {
                const email = $(this);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.val() && !emailRegex.test(email.val())) {
                    isValid = false;
                    email.addClass('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showToast('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Toast Notifications
    function showToast(message, type = 'info') {
        const toast = $(`
            <div class="toast toast-${type}">
                <div class="toast-content">
                    <i class="ph ph-${type === 'error' ? 'x-circle' : 'check-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `);
        
        $('#toast-container').append(toast);
        
        setTimeout(() => {
            toast.addClass('show');
        }, 100);
        
        setTimeout(() => {
            removeToast(toast);
        }, 5000);
        
        toast.find('.toast-close').on('click', () => {
            removeToast(toast);
        });
    }

    function removeToast(toast) {
        toast.removeClass('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    // Expose functions globally if needed
    window.Fyndo = {
        showToast: showToast,
        initFormValidation: initFormValidation
    };

})(jQuery);
