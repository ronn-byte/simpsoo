document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const authSection = document.getElementById("auth-section");
    const loginBox = document.getElementById("login-box");
    const signupBox = document.getElementById("signup-box");
    const dashboard = document.getElementById("dashboard");
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");
    const logoutButton = document.getElementById("logout-button");
    const productList = document.getElementById("product-list");
    const searchInput = document.querySelector(".search-bar input");
    const searchButton = document.querySelector(".search-btn");

    // Simulated product data (replace with database/API later)
    let products = [
        { name: "iPhone 14 Pro", price: "Ksh 28,399.00", image: "iphone.jpg" },
        { name: "HP EliteBook", price: "Ksh 17,999.00", image: "laptop.jpg" },
        { name: "Study Table", price: "Ksh 700", image: "table.jpg" },
        { name: "Pro-Gas", price: "Ksh 2000", image: "gas.jpg" }
    ];

    // Function to load products dynamically
    function loadProducts(filteredProducts = products) {
        productList.innerHTML = ""; // Clear previous content
        if (filteredProducts.length === 0) {
            productList.innerHTML = "<p>No products found.</p>";
            return;
        }
        filteredProducts.forEach((product, index) => {
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

    // Function to check login status
    function checkLoginStatus() {
        if (localStorage.getItem("userLoggedIn") === "true") {
            authSection.classList.add("hidden");
            dashboard.classList.remove("hidden");
            loadProducts(); // Load products if logged in
        } else {
            authSection.classList.remove("hidden");
            dashboard.classList.add("hidden");
        }
    }
    checkLoginStatus();

    // Show Signup Form
    showSignupLink?.addEventListener("click", () => {
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
        document.getElementById("signup-form").reset(); // Clear signup form
    });

    // Show Login Form
    showLoginLink?.addEventListener("click", () => {
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
        document.getElementById("login-form").reset(); // Clear login form
    });

    // Handling Login
    const loginForm = document.getElementById("login-form");
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("userLoggedIn", "true"); // Simulate login session
        checkLoginStatus();
    });

    // Handling Logout
    logoutButton?.addEventListener("click", () => {
        localStorage.removeItem("userLoggedIn");
        checkLoginStatus();
    });

    // Handling Signup
    const signupForm = document.getElementById("signup-form");
    signupForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Signup successful! Redirecting to login...");
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });

    // Search Functionality
    function searchProducts() {
        const query = searchInput?.value.trim().toLowerCase() || "";
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        loadProducts(filteredProducts);
    }

    // Attach search event listeners (Click + Enter key)
    searchButton?.addEventListener("click", function (e) {
        e.preventDefault();
        searchProducts();
    });

    searchInput?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchProducts();
        }
    });

    // Fix pointer interaction for search button (Hover & Click)
    if (searchButton) {
        searchButton.style.cursor = "pointer"; // Ensure pointer changes to hand
        searchButton.style.transition = "0.2s"; // Smooth effect

        searchButton.addEventListener("mouseover", () => {
            searchButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
            searchButton.style.opacity = "0.9";
        });

        searchButton.addEventListener("mouseout", () => {
            searchButton.style.boxShadow = "none";
            searchButton.style.opacity = "1";
        });

        searchButton.addEventListener("mousedown", () => {
            searchButton.style.transform = "scale(0.95)";
        });

        searchButton.addEventListener("mouseup", () => {
            searchButton.style.transform = "scale(1)";
        });
    }
});
