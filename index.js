import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu')

let shoppingCart = []

document.addEventListener('click', function(e){
   if(e.target.classList.contains("add-btn")){
      const id = Number(e.target.dataset.id)
      addToCart(id)
      
   } else if (e.target.classList.contains("remove-btn")){
      const id = Number(e.target.dataset.id)
      removeItem(id)
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

  if(shoppingCart.length > 0){
    orderSummaryEl.style.display = 'block'
  } else{
    orderSummaryEl.style.display = 'none'
  }

  let cartHtml = ``

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

  document.getElementById('summary-item-list').innerHTML = cartHtml
}

// Restrict card form input

function restrictInputTo(inputSelector, regex) {
  const input = document.querySelector(inputSelector);
  if (!input) return;
  
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(regex, "");
  });
}

restrictInputTo("#cvv-input", /\D/g);               // digits only
restrictInputTo("#card-number-input", /[^\d\s]/g); // digits + spaces
restrictInputTo("#name-input", /[^a-zA-Z\s]/g);   // letters + spaces
