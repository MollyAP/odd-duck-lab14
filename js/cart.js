/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen ---- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
}


function showCart() {
  const cartItems = state.cart.items;
  const tableBody = document.querySelector('#cart tbody');

  // Clear out any existing rows in the table body
  tableBody.innerHTML = '';

  // Iterate over the items in the cart
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];

    // Create a new row for the cart item
    const row = document.createElement('tr');

    // Create a cell for the "Remove" link
    const removeCell = document.createElement('td');
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.innerText = 'Remove';
    removeLink.addEventListener('click', () => {
      state.cart.removeItem(cartItem);
      renderCart();
    });
    removeCell.appendChild(removeLink);
    row.appendChild(removeCell);

    // Create a cell for the quantity
    const quantityCell = document.createElement('td');
    quantityCell.innerText = cartItem.quantity;
    row.appendChild(quantityCell);

    // Create a cell for the item name
    const nameCell = document.createElement('td');
    nameCell.innerText = cartItem.product.name;
    row.appendChild(nameCell);

    // Add the row to the table body
    tableBody.appendChild(row);
  }
}


function removeItemFromCart(event) {
  const clickedButton = event.target;

  // Get the index of the item in the cart array using its data-index attribute
  const itemIndex = clickedButton.getAttribute('data-index');

  // Remove the item from the cart
  state.cart.removeItem(state.cart.items[itemIndex]);

  // Save the cart to local storage
  state.cart.saveToLocalStorage();

  // Re-draw the cart table
  renderCart();
}


// This will initialize the page and draw the cart on screen
renderCart();
