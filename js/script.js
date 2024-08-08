import { getProducts } from './product.js';
import { addToCart } from '../cart.js';

let products = [];

const productList = document.getElementById('productList');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const filterButton = document.getElementById('filterButton');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

// Modal elements
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const closeModalButton = document.getElementById('closeModalButton');

const renderProducts = (filteredProducts) => {
  productList.innerHTML = '';
  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: ₹${product.price}</p>
      <div class="actions">
        <button onclick="viewDetails(${product.id})">View Details</button>
        <button onclick="handleAddToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productDiv);
  });
};

// Open modal with product details
const viewDetails = (id) => {
  const product = products.find(p => p.id === id);
  if (product) {
    modalContent.innerHTML = `
      <button id="closeModalButton" class="close-button">X</button>
      <h2>${product.title}</h2>
      <img src="${product.imgUrl}" alt="${product.title}" class="modal-img">
      <p>${product.info}</p>
      <p>Price: ₹${product.price}</p>
    `;
    modal.style.display = 'flex'; // Show the modal
    document.getElementById('closeModalButton').addEventListener('click', closeModal); // Reattach event listener
  }
};

// Close modal
const closeModal = () => {
  modal.style.display = 'none'; // Hide the modal
};

const handleAddToCart = (id) => {
  const product = products.find(p => p.id === id);
  addToCart(product);
};

const handleSearch = () => {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
  renderProducts(filteredProducts);
};

const handleFilter = () => {
  const category = categoryFilter.value;
  const maxPrice = parseInt(priceFilter.value) || Infinity;
  const filteredProducts = products.filter(product =>
    (category === '' || product.category === category) &&
    product.price <= maxPrice
  );
  renderProducts(filteredProducts);
};

const init = async () => {
  products = await getProducts();
  renderProducts(products);
};

// Event listeners
searchButton.addEventListener('click', handleSearch);
filterButton.addEventListener('click', handleFilter);

// Expose functions globally
window.viewDetails = viewDetails; // Expose viewDetails globally
window.handleAddToCart = handleAddToCart; // Expose handleAddToCart globally

// Initialize the product list
init();
