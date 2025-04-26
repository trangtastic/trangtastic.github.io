(function ($) {
    "use strict";

    const cursor = document.getElementById("cursor");
    const cursorEffectElements = [
        cursor
    ].filter(Boolean);

    function updateCursorPosition(event) {
        const { clientX: x, clientY: y } = event;
        cursorEffectElements.forEach(el => {
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        });
    }

    document.body.addEventListener("mousemove", updateCursorPosition);

    $(document).ready(function () {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            cursor.classList.add('disable-cursor');
        }

        $(document).on("mouseleave", () => cursor.classList.add('disable-cursor'));
        $(document).on("mouseenter", () => cursor.classList.remove('disable-cursor'));
    });

})(jQuery);