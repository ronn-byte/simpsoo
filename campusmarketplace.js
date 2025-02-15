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
    const productDetails = document.getElementById("product-details");

    // Simulated product data (replace with database/API later)
    let products = [
        { name: "iPhone 14 Pro", price: "Ksh 28,399.00", image: "iphone.jpg" },
        { name: "HP EliteBook", price: "Ksh 17,999.00", image: "laptop.jpg" },
        { name: "Study Table", price: "Ksh 700", image: "table.jpg" },
        { name: "Pro-Gas", price: "Ksh 2000", image: "gas.jpg" }
    ];

    // Function to load products dynamically
    function loadProducts() {
        if (!productList) return;
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

    // Function to display product details
    function viewProductDetails(index) {
        const product = products[index];
        if (!productDetails) return;
        productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: ${product.price}</p>
        `;
        productDetails.classList.remove("hidden");
    }

    // Check if user is already logged in (simulate session)
    function checkLoginStatus() {
        if (localStorage.getItem("userLoggedIn") === "true") {
            if (authSection) authSection.classList.add("hidden");
            if (dashboard) {
                dashboard.classList.remove("hidden");
                loadProducts(); // Load products if logged in
            }
        }
    }
    checkLoginStatus();

    // Show Signup Form
    if (showSignupLink) {
        showSignupLink.addEventListener("click", () => {
            if (loginBox) loginBox.classList.add("hidden");
            if (signupBox) signupBox.classList.remove("hidden");
            document.getElementById("signup-form").reset(); // Clear signup form
        });
    }

    // Show Login Form
    if (showLoginLink) {
        showLoginLink.addEventListener("click", () => {
            if (signupBox) signupBox.classList.add("hidden");
            if (loginBox) loginBox.classList.remove("hidden");
            document.getElementById("login-form").reset(); // Clear login form
        });
    }

    // Handling Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;

            if (email === "test@example.com" && password === "password123") { // Dummy check
                localStorage.setItem("userLoggedIn", "true");
                if (authSection) authSection.classList.add("hidden");
                if (dashboard) dashboard.classList.remove("hidden");
                loadProducts();
            } else {
                alert("Invalid credentials! Please try again.");
            }
        });
    }

    // Handling Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("userLoggedIn");
            if (dashboard) dashboard.classList.add("hidden");
            if (authSection) authSection.classList.remove("hidden");
        });
    }

    // Handling Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Signup successful! Redirecting to login...");
            if (signupBox) signupBox.classList.add("hidden");
            if (loginBox) loginBox.classList.remove("hidden");
        });
    }
});
