const form = document.getElementById('newsletter-form');
const thankYouMessage = document.getElementById('thank-you-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Display the thank you message
    thankYouMessage.style.display = 'block';

    // Optionally, hide the form after submission
    form.style.display = 'none';

    // Reset the form after a delay (if desired)
    setTimeout(() => {
        form.reset(); // Reset the form fields
    }, 3000); // Reset after 3 seconds
});