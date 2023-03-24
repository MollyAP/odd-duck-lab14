/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

function populateForm() {
  const selectElement = document.getElementById('items');
  
  // Loop through all products and add them as options to the select element
  for (let product of state.allProducts) {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    selectElement.appendChild(option);
  }
}


function handleSubmit(event) {
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();
}


function addSelectedItemToCart() {
  // Get the select element and the selected option
  const selectElement = document.getElementById('items');
  const selectedItem = selectElement.options[selectElement.selectedIndex].value;

  // Get the quantity input element and its value
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);

  // Add the selected item and quantity to the cart
  state.cart.addItem(selectedItem, quantity);
}


function updateCartPreview() {
  // Clear the cartContents div
  const cartContents = document.getElementById('cartContents');
  cartContents.innerHTML = '';

  // Get all the items in the cart and their quantities
  const items = state.cart.items;

  // Iterate over the items and add them to the cartContents div
  for (let item in items) {
    const quantity = items[item];
    const itemInfo = `${item} x ${quantity}`;

    const itemElement = document.createElement('div');
    itemElement.innerText = itemInfo;

    cartContents.appendChild(itemElement);
  }
}


// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
