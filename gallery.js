document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.querySelector('.close-button');

    // Function to open the lightbox
    function openLightbox(fullSrc, captionText) {
        lightboxModal.style.display = 'flex'; // Use flex to center content
        lightboxImg.src = fullSrc;
        lightboxImg.alt = captionText; // Set alt for accessibility
        lightboxCaption.textContent = captionText;
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    // Function to close the lightbox
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        lightboxImg.src = ''; // Clear image source
        lightboxCaption.textContent = ''; // Clear caption
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for each gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const fullSrc = this.getAttribute('data-full-src');
            const captionText = this.querySelector('.item-caption').textContent;
            openLightbox(fullSrc, captionText);
        });
    });

    // Event listener for the close button
    closeButton.addEventListener('click', closeLightbox);

    // Event listener to close modal when clicking outside the image
    lightboxModal.addEventListener('click', function(event) {
        if (event.target === lightboxModal) { // Only close if clicking the background, not the image itself
            closeLightbox();
        }
    });

    // Event listener for Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightboxModal.style.display === 'flex') {
            closeLightbox();
        }
    });

    // --- Mobile Menu Toggle (if you integrate the header with JS) ---
    // You would typically have a menu icon in your header HTML:
    // <div id="menu-icon" class="fas fa-bars"></div> (requires Font Awesome or similar)
    // And a JS snippet like this:
    
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    
});
