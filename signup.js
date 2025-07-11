document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.Login-btn');

    console.log("Login Button:", loginBtn); // debugging

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});