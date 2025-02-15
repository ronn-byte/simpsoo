// Wait for the DOM to load before running JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const authSection = document.getElementById("auth-section");
    const loginBox = document.getElementById("login-box");
    const signupBox = document.getElementById("signup-box");
    const dashboard = document.getElementById("dashboard");
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");
    const logoutButton = document.getElementById("logout-button");
    const productList = document.getElementById("product-list");

    // Simulated product data (replace with database/API later)
    let products = [
        { name: "iPhone 14 Pro", price: "Ksh 28,399.00", image: "iphone.jpg" },
        { name: "HP EliteBook", price: "Ksh 17,999.00", image: "laptop.jpg" },
        { name: "Study Table", price: "Ksh 700", image: "table.jpg" },
        { name: "Pro-Gas", price: "Ksh 2000", image: "gas.jpg" }
    ];

    // Function to load products dynamically
    function loadProducts() {
        productList.innerHTML = ""; // Clear previous content
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="view-item" data-index="${index}">View Item</button>
            `;
            productList.appendChild(productCard);
        });
        attachProductEventListeners();
    }

    // Function to attach event listeners to product buttons
    function attachProductEventListeners() {
        document.querySelectorAll(".view-item").forEach(button => {
            button.removeEventListener("click", handleViewItemClick);
            button.addEventListener("click", handleViewItemClick);
        });
    }

    function handleViewItemClick() {
        let index = this.getAttribute("data-index");
        viewProductDetails(index);
    }

    // Function to simulate viewing product details
    function viewProductDetails(index) {
        const product = products[index];
        alert(`Viewing details for: ${product.name} - ${product.price}`);
    }

    // Check if user is already logged in (simulate session)
    function checkLoginStatus() {
        if (localStorage.getItem("userLoggedIn") === "true") {
            authSection.classList.add("hidden");
            dashboard.classList.remove("hidden");
            loadProducts(); // Load products if logged in
        }
    }
    checkLoginStatus();

    // Show Signup Form
    if (showSignupLink) {
        showSignupLink.addEventListener("click", () => {
            loginBox.classList.add("hidden");
            signupBox.classList.remove("hidden");
            document.getElementById("signup-form").reset(); // Clear signup form
        });
    }

    // Show Login Form
    if (showLoginLink) {
        showLoginLink.addEventListener("click", () => {
            signupBox.classList.add("hidden");
            loginBox.classList.remove("hidden");
            document.getElementById("login-form").reset(); // Clear login form
        });
    }

    // Handling Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("userLoggedIn", "true"); // Simulate login session
            authSection.classList.add("hidden");
            dashboard.classList.remove("hidden");
            loadProducts();
        });
    }

    // Handling Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("userLoggedIn");
            dashboard.classList.add("hidden");
            authSection.classList.remove("hidden");
        });
    }

    // Handling Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Signup successful! Redirecting to login...");
            signupBox.classList.add("hidden");
            loginBox.classList.remove("hidden");
        });
    }
});
