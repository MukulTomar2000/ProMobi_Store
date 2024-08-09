// Initialize an empty array to store cart items
const cart = [];

/**
 * Adds a product to the cart. If the product already exists in the cart, increments its quantity.
 * @param {Object} product - The product to be added to the cart.
 */
export const addToCart = (product) => {
  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase its quantity by 1
    existingProduct.quantity += 1;
  } else {
    // Otherwise, add the product to the cart with quantity 1
    cart.push({ ...product, quantity: 1 });
  }
  
  // Update the cart display
  updateCart();
};

/**
 * Updates the cart display by calculating the total cost and showing cart items.
 */
const updateCart = () => {
  // Get references to relevant DOM elements
  const cartButton = document.getElementById('cartButton');
  const cartItems = document.getElementById('cartItems');
  const totalCostElement = document.getElementById('totalCost');
  
  let totalCost = 0;

  // Update the cart button text with the number of items
  cartButton.innerText = `🛒 (${cart.reduce((total, item) => total + item.quantity, 0)})`;

  // Clear the existing cart items
  cartItems.innerHTML = '';

  // Add each cart item to the list
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      ${item.title} - ₹${item.price} x ${item.quantity}
      <div class="quantity-buttons">
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
    totalCost += item.price * item.quantity; // Calculate the total cost
  });

  // Show or hide the cart based on whether it contains items
  if (cart.length === 0) {
    document.getElementById('cart').classList.add('hidden');
  } else {
    document.getElementById('cart').classList.remove('hidden');
  }

  // Update the total cost display
  if (totalCostElement) {
    totalCostElement.innerText = `Total Cost: ₹${totalCost}`;
  }
};

/**
 * Toggles the visibility of the cart display.
 */
const handleCartButton = () => {
  const cartDiv = document.getElementById('cart');
  cartDiv.classList.toggle('hidden');
  updateCart(); // Update cart contents when toggling visibility
};

/**
 * Handles the checkout process. Alerts the user and clears the cart.
 */
const handleCheckout = () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Example checkout process
  alert('Proceeding to checkout...');
  cart.length = 0; // Clear the cart
  updateCart(); // Update the cart display
};

/**
 * Decreases the quantity of a product in the cart. Removes the product if quantity is 1.
 * @param {number} id - The ID of the product to decrease in quantity.
 */
const decreaseQuantity = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1; // Decrease quantity
    } else {
      removeFromCart(id); // Remove product if quantity is 1
    }
    updateCart(); // Update cart display
  }
};

/**
 * Increases the quantity of a product in the cart.
 * @param {number} id - The ID of the product to increase in quantity.
 */
const increaseQuantity = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1; // Increase quantity
    updateCart(); // Update cart display
  }
};

/**
 * Removes a product from the cart.
 * @param {number} id - The ID of the product to be removed.
 */
const removeFromCart = (id) => {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart.splice(index, 1); // Remove the product from the cart
    updateCart(); // Update cart display
  }
};

/**
 * Clears all items from the cart.
 */
const clearCart = () => {
  cart.length = 0; // Empty the cart
  updateCart(); // Update cart display
};

/**
 * Initializes cart interactions by setting up event listeners.
 */
const initializeCart = () => {
  const cartButton = document.getElementById('cartButton');
  const closeCartButton = document.getElementById('closeCartButton');
  const checkoutButton = document.getElementById('checkoutButton');
  const clearCartButton = document.getElementById('clearCartButton');

  // Set up event listeners for cart buttons
  cartButton.addEventListener('click', handleCartButton);
  closeCartButton.addEventListener('click', () => document.getElementById('cart').classList.add('hidden'));
  checkoutButton.addEventListener('click', handleCheckout);
  clearCartButton.addEventListener('click', clearCart);
};

// Initialize cart interactions
initializeCart();

// Expose functions globally for interaction from other scripts
window.decreaseQuantity = decreaseQuantity;
window.increaseQuantity = increaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
