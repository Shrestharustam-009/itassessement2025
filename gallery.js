document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.querySelector('.close-button');

    // Function to open the lightbox
    function openLightbox(fullSrc, captionText) {
        lightboxModal.style.display = 'flex'; 
        lightboxImg.src = fullSrc;
        lightboxImg.alt = captionText; 
        lightboxCaption.textContent = captionText;
        document.body.style.overflow = 'hidden'; 
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


    closeButton.addEventListener('click', closeLightbox);


    lightboxModal.addEventListener('click', function(event) {
        if (event.target === lightboxModal) { // Only close if clicking the background, not the image itself
            closeLightbox();
        }
    });


    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightboxModal.style.display === 'flex') {
            closeLightbox();
        }
    });


    
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    
});
