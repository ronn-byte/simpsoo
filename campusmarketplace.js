// JavaScript to handle page navigation
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const dashboardSection = document.getElementById('dashboard-section');

const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const logoutButton = document.getElementById('logout-button');

// Show Signup Page
showSignupLink.addEventListener('click', () => {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
});

// Show Login Page
showLoginLink.addEventListener('click', () => {
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Handling login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden'); // Fix: Show the dashboard section
});

// Handling logout
logoutButton.addEventListener('click', () => {
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Handling Signup
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Signup successful! Redirecting to login...');
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});
