import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu')
const paymentModalEl = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")

let shoppingCart = []

document.addEventListener('click', function(e){
  if(e.target.classList.contains("add-btn")){
    const id = Number(e.target.dataset.id)
    addToCart(id)
    
  } 
  if (e.target.classList.contains("remove-btn")){
    const id = Number(e.target.dataset.id)
    removeItem(id)
  }
  if(e.target.classList.contains("checkout")){
    paymentModalEl.classList.remove("hidden")
  }
  if(e.target.classList.contains("pay")){
    paymentForm.checkValidity() ? paymentModalEl.classList.add("hidden") : paymentForm.reportValidity()
  }
})

function createMenu (){
  let menuList = ``

  menuArray.forEach(item => {
    menuList += `
      <div class="menu-item">
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-info" data-id="${item.id}">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <p class="price">$${item.price}</p>
        </div>
        <button class="add-btn" data-id="${item.id}">+</button>
      </div>
    `
  })

  return menuList
}

function renderMenu (){
  menuEl.innerHTML = createMenu()
}

renderMenu()

function addToCart (selectedItemId){

  const item = menuArray.find( i => i.id === selectedItemId)
  
  shoppingCart.push(item)

  renderShoppingCart(shoppingCart)
}

function removeItem (selectedItemId){
  const item = shoppingCart.find( i => i.id === selectedItemId)

  shoppingCart.splice(shoppingCart.indexOf(item), 1)

  renderShoppingCart(shoppingCart)
}

function renderShoppingCart (cart) {
  const orderSummaryEl = document.getElementById('order-summary')

  const cartTotal = cart.reduce((acc, obj) => { return acc + obj.price; }, 0);

  let cartHtml = ``

  if(shoppingCart.length > 0){
    orderSummaryEl.classList.remove('hidden')
  } else{
    orderSummaryEl.classList.add('hidden')
  }

  cart.map((item) => {
    cartHtml += `
      <li class="summary-item">
        <h3 class="item-name">${item.name}</h3>
        <div class="remove-btn-container">
            <button class="remove-btn type="button" data-id="${item.id}">remove</button>
        </div>
        <p class="price">$${item.price}</p>
    </li>
    `
  })

  orderSummaryEl.innerHTML = `
    <h2 id="summary-title">Your order</h2>
    <ul id="summary-item-list">
        ${cartHtml}
    </ul>
    <div id="summary-total">
        <h3>Total price:</h3>
        <p class="price">$${cartTotal}</p>
    </div>
    <button id="submit-order" class="submit-btn checkout" type="submit">Complete order</button>
  `
}

// Validate card form input

function setupInputValidation(inputSelector, restrictRegex, pattern, message) {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  // Restrict typing
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(restrictRegex, "");
    
    // Clear previous custom message
    input.setCustomValidity("");

    // If input doesn't match full pattern, set custom message
    if (!pattern.test(input.value)) {
      input.setCustomValidity(message);
    }
  });
}

setupInputValidation(
  "#cvv-input",
  /\D/g,          // restrict: remove non-digits
  /^\d{3}$/,      // full pattern: exactly 3 digits
  "CVV must be exactly 3 digits"
);

setupInputValidation(
  "#card-number-input",
  /[^\d\s]/g,             // restrict: allow only digits and spaces
  /^[0-9\s]{13,19}$/,     // full pattern
  "Card number must be 13-19 digits"
);

setupInputValidation(
  "#name-input",
  /[^a-zA-Z\s]/g,         // restrict: letters + spaces
  /^[a-zA-Z\s]+$/,        // full pattern
  "Name can only contain letters and spaces"
);
