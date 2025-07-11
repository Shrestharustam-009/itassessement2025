
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Initialize EmailJS with  public key
  emailjs.init("06hEvHS1V_7z-LNuo"); 

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    formStatus.textContent = 'Sending message...';
    formStatus.style.color = '#FFDD00'; // Yellow while sending

    const serviceID = 'service_htew2hi'; 
    const templateID = 'template_j8vczf3'; 

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        formStatus.textContent = 'Message sent successfully! We will get back to you soon.';
        formStatus.style.color = '#00FF00'; // Green for success
        contactForm.reset();
      }, (error) => {
        formStatus.textContent = `Failed to send message: ${error.text || error}. Please try again later.`;
        formStatus.style.color = '#FF0000'; // Red for error
        console.error('EmailJS Error:', error);
      });
  });
});
