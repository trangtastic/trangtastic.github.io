function isIntroPage() {
    return window.location.pathname === "";
}

function isPhotosPage() {
    return window.location.pathname === "/photos/";
}

function isVitaPage() {
    return window.location.pathname === "/vita/";
}


$(document).ready(function () {
    let currentUrl = window.location.href;
    const linkUrl = $('.logo').attr('href');
    const resolvedLinkUrl = new URL(linkUrl, window.location.origin).href;
    const isSamePage = currentUrl === resolvedLinkUrl;

    // Initialize Barba.js for smooth page transitions
    barba.init({
        transitions: [{
            name: 'color-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.5
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.5
                });
            },
            beforeEnter(data) {
                const namespace = data.next.container.dataset.barbaNamespace;
                const bgColors = {
                    photos: "#7fa8ff",
                    vita: "#FFEC51"
                };

                const nextBgColor = bgColors[namespace] || "white";

                gsap.to("body", {
                    backgroundColor: nextBgColor,
                    duration: 0.5
                });

                const vitaSpan = document.querySelector(".Vita > .link-active-before");
                const photosSpan = document.querySelector(".Photos > .link-active-before");

                const backgroundColors = {
                    index: { vita: "transparent", photos: "transparent" },
                    photos: { vita: "transparent", photos: "blue" },
                    vita: { vita: "blue", photos: "transparent" }
                };

                if (namespace in backgroundColors) {
                    gsap.to(vitaSpan, { background: backgroundColors[namespace].vita, duration: 1 });
                    gsap.to(photosSpan, { background: backgroundColors[namespace].photos, duration: 1 });
                }
            }
        }]
    });



    // Mobile menu toggle
    $('.mobile-toggle').click(function () {
        $('.main_h').toggleClass('open-wide');
        $(this).toggleClass('open-nav');
    });

    function closeNavigation() {
        if ($('.main_h').hasClass('open-wide')) {
            $('.main_h').removeClass('open-wide');
            $('.mobile-toggle').removeClass('open-nav');
        }
    }

    // Prevent reloading same-page links
    $('.logo').click(function (event) {
        currentUrl = window.location.href;
        if (isSamePage) {
            event.preventDefault();
        }
        closeNavigation();
    });

    $('.photos').click(function (event) {
        currentUrl = window.location.href;
        if (currentUrl.includes("photos")) {
            event.preventDefault();
        }
        closeNavigation();
    });

    $('.vita').click(function (event) {
        currentUrl = window.location.href;
        if (currentUrl.includes("vita")) {
            event.preventDefault();
        }
        closeNavigation();
    });


    function initializePhotoPage() {
        document.body.style.backgroundColor = "cornflowerblue";
        const photosSpan = document.querySelector(".Photos > .link-active-before");
        const vitaSpan = document.querySelector(".Vita > .link-active-before");
        photosSpan.style.background = "blue";
        vitaSpan.style.background = "transparent";

        var grid = document.querySelector(".grid");

        if (grid) {
            imagesLoaded(grid, function () {


                const msnry = new Masonry(grid, {
                    itemSelector: ".grid-item",
                    percentPosition: true
                });

                if (msnry._isLayoutInited) {
                    grid.classList.add("masonry-loaded");
                }
            });
        }

        // Initialize Bootstrap Carousel
        function isMobile() {
            return window.innerWidth < 768;
        }

        const carouselElement = document.getElementById("carouselExampleIndicators");
        if (carouselElement) {
            const carouselInstance = new bootstrap.Carousel(carouselElement, {
                interval: false, // Disable auto-sliding
                keyboard: true,  // Enable keyboard navigation
            });

            document.addEventListener("keydown", function (event) {
                if (document.body.classList.contains("modal-open")) { // Check if modal is open
                    if (event.key === "ArrowLeft") {
                        carouselInstance.prev(); // Move to the previous slide
                    } else if (event.key === "ArrowRight") {
                        carouselInstance.next(); // Move to the next slide
                    }
                }
            });

            const cursor = document.querySelector(".cursor");
            const buttons = [
                { element: document.querySelectorAll(".grid-item .box-img"), className: "cursor-glass" },
                { element: document.querySelector(".modal-close-button"), className: "cursor-close" },
                { element: document.querySelector(".carousel-control-next"), className: "cursor-arrow-right" },
                { element: document.querySelector(".carousel-control-prev"), className: "cursor-arrow-left" }
            ];

            buttons.forEach(({ element, className }) => {
                if (element instanceof NodeList) {
                    element.forEach(el => {
                        el.addEventListener("mouseenter", () => {
                            cursor.classList.add(className);
                            document.body.style.cursor = "none";
                        });
                        el.addEventListener("mouseleave", () => {
                            cursor.classList.remove(className);
                            document.body.style.cursor = "auto";
                        });
                    });
                } else if (element instanceof HTMLElement) {
                    element.addEventListener("mouseenter", () => {
                        cursor.classList.add(className);
                        document.body.style.cursor = "none";
                    });
                    element.addEventListener("mouseleave", () => {
                        cursor.classList.remove(className);
                        document.body.style.cursor = "auto";
                    });
                }
            });

            if (window.matchMedia("(pointer: coarse)").matches) {
                const el = document.querySelector('.cursor-glass');
                if (el) el.style.display = 'none';
            }
        }

        const images = document.querySelectorAll(".clickable-image");
        const modal = document.getElementById("imageCarouselModal");

        if (modal) {
            const bootstrapModal = new bootstrap.Modal(modal);

            images.forEach((img, index) => {
                img.addEventListener("click", () => {
                    if (!isMobile()) {
                        bootstrapModal.show();

                        const bootstrapCarousel = bootstrap.Carousel.getInstance(carouselElement);
                        bootstrapCarousel.to(index);
                    }
                });
            });
        }
    }



    function initializeVitaPage() {
        document.body.style.backgroundColor = "#FFEC51";
        const photosSpan = document.querySelector(".Photos > .link-active-before");
        const vitaSpan = document.querySelector(".Vita > .link-active-before");
        photosSpan.style.background = "transparent";
        vitaSpan.style.background = "blue";


/*        if (vitaElement) {
            vitaElement.classList.add("link-active"); // Add class first

            gsap.to(vitaElement, {
                textDecorationColor: "black", // Fade in the underline
                duration: 10,
                ease: "power2.out"
            });
        }*/

/*        if (vitaElement) {
            vitaElement.classList.add("link-active");
        }

        if (photosElement) {
            photosElement.classList.remove("link-active");
        }*/
    }

    function initializeIntroPage() {
        const video = document.getElementById("video");

        if (isIntroPage() && video) {
            video.play().catch(error => {
                console.error("Autoplay failed:", error);
            });
        }

    }

    if (isPhotosPage()) {
        initializePhotoPage();
    }

    if (isVitaPage()) {
        initializeVitaPage();
    }

    if (isIntroPage()){
        initializeIntroPage();
    }

    barba.hooks.after(() => {
        if (isIntroPage()){
            initializeIntroPage();
        }

        if (isPhotosPage()) {
            initializePhotoPage();
        }

        if (isVitaPage()) {
            initializeVitaPage();
        }
    });
});