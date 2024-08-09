import { getProducts } from './product.js'; // Import function to fetch products
import { addToCart } from './cart.js';      // Import function to add products to the cart

let products = []; // Array to hold product data

// DOM elements
const productList = document.getElementById('productList'); // Container for the product list
const searchButton = document.getElementById('searchButton'); // Button to trigger search
const searchInput = document.getElementById('searchInput');   // Input field for search query
const filterButton = document.getElementById('filterButton'); // Button to apply filters
const categoryFilter = document.getElementById('categoryFilter'); // Dropdown for category filtering
const priceFilter = document.getElementById('priceFilter'); // Input field for maximum price filtering

// Modal elements for product details
const modal = document.getElementById('productModal'); // Modal container
const modalContent = document.getElementById('modalContent'); // Container for modal content
const closeModalButton = document.getElementById('closeModalButton'); // Button to close the modal

// Function to render products to the page
const renderProducts = (filteredProducts) => {
  productList.innerHTML = ''; // Clear previous products
  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div'); // Create a new div for each product
    productDiv.className = 'product-item'; // Assign class for styling
    productDiv.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}"> <!-- Product image -->
      <h3>${product.title}</h3> <!-- Product title -->
      <p>Price: ₹${product.price}</p> <!-- Product price -->
      <div class="actions">
        <button onclick="viewDetails(${product.id})">View Details</button> <!-- Button to view details -->
        <button onclick="handleAddToCart(${product.id})">Add to Cart</button> <!-- Button to add to cart -->
      </div>
    `;
    productList.appendChild(productDiv); // Add product div to the list
  });
};

// Function to open modal with product details
const viewDetails = (id) => {
  const product = products.find(p => p.id === id); // Find the product by ID
  if (product) {
    modalContent.innerHTML = `
      <button id="closeModalButton" class="close-button">X</button> <!-- Close button -->
      <h2>${product.title}</h2> <!-- Product title in modal -->
      <img src="${product.imgUrl}" alt="${product.title}" class="modal-img"> <!-- Product image in modal -->
      <p>${product.info}</p> <!-- Product details/info -->
      <p>Price: ₹${product.price}</p> <!-- Product price in modal -->
    `;
    modal.style.display = 'flex'; // Show the modal
    document.getElementById('closeModalButton').addEventListener('click', closeModal); // Reattach event listener for close button
  }
};

// Function to close the modal
const closeModal = () => {
  modal.style.display = 'none'; // Hide the modal
};

// Function to handle adding product to cart
const handleAddToCart = (id) => {
  const product = products.find(p => p.id === id); // Find the product by ID
  addToCart(product); // Add the product to the cart
};

// Function to handle search functionality
const handleSearch = () => {
  const query = searchInput.value.toLowerCase(); // Get search query and convert to lower case
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(query) // Filter products based on search query
  );
  renderProducts(filteredProducts); // Render filtered products
};

// Function to handle filtering by category and price
const handleFilter = () => {
  const category = categoryFilter.value; // Get selected category
  const maxPrice = parseInt(priceFilter.value) || Infinity; // Get max price from input or set to Infinity if empty
  const filteredProducts = products.filter(product =>
    (category === '' || product.category === category) && // Filter by category if selected
    product.price <= maxPrice // Filter by price
  );
  renderProducts(filteredProducts); // Render filtered products
};

// Initialization function to fetch and display products
const init = async () => {
  products = await getProducts(); // Fetch products
  renderProducts(products); // Render all products initially
};

// Event listeners for search and filter buttons
searchButton.addEventListener('click', handleSearch); // Attach search event listener
filterButton.addEventListener('click', handleFilter); // Attach filter event listener

// Expose functions globally for use in HTML event handlers
window.viewDetails = viewDetails; // Expose viewDetails function globally
window.handleAddToCart = handleAddToCart; // Expose handleAddToCart function globally

// Initialize the product list on page load
init();
