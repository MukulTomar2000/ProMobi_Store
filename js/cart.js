const cart = [];

// Function to add item to cart
export const addToCart = (product) => {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
};

// Function to update the cart display
const updateCart = () => {
  const cartButton = document.getElementById('cartButton');
  const cartItems = document.getElementById('cartItems');
  const totalCostElement = document.getElementById('totalCost');
  let totalCost = 0;

  cartButton.innerText = `🛒 (${cart.reduce((total, item) => total + item.quantity, 0)})`;

  cartItems.innerHTML = '';
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
    totalCost += item.price * item.quantity;
  });

  if (cart.length === 0) {
    document.getElementById('cart').classList.add('hidden');
  } else {
    document.getElementById('cart').classList.remove('hidden');
  }

  if (totalCostElement) {
    totalCostElement.innerText = `Total Cost: ₹${totalCost}`;
  }
};

// Function to handle cart button click
const handleCartButton = () => {
  const cartDiv = document.getElementById('cart');
  cartDiv.classList.toggle('hidden');
  updateCart();
};

// Function to handle checkout
const handleCheckout = () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Example checkout process
  alert('Proceeding to checkout...');
  cart.length = 0; // Clear the cart
  updateCart();
};

// Function to decrease quantity
const decreaseQuantity = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      removeFromCart(id);
    }
    updateCart();
  }
};

// Function to increase quantity
const increaseQuantity = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
    updateCart();
  }
};

// Function to remove item from cart
const removeFromCart = (id) => {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart.splice(index, 1);
    updateCart();
  }
};

// Function to clear the cart
const clearCart = () => {
  cart.length = 0;
  updateCart();
};

// Initialize cart interactions
const initializeCart = () => {
  const cartButton = document.getElementById('cartButton');
  const closeCartButton = document.getElementById('closeCartButton');
  const checkoutButton = document.getElementById('checkoutButton');
  const clearCartButton = document.getElementById('clearCartButton');

  cartButton.addEventListener('click', handleCartButton);
  closeCartButton.addEventListener('click', () => document.getElementById('cart').classList.add('hidden'));
  checkoutButton.addEventListener('click', handleCheckout);
  clearCartButton.addEventListener('click', clearCart);
};

initializeCart();

// Expose functions globally for interaction from script.js
window.decreaseQuantity = decreaseQuantity;
window.increaseQuantity = increaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
