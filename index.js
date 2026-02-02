import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu')

function createMenu (){
  let menuList = ``

  menuArray.forEach(item => {
    menuList += `
      <div class="menu-item">
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-info" id="${item.id}">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <p class="price">$${item.price}</p>
        </div>
        <button class="add-btn">+</button>
      </div>
    `
  });

  return menuList
}

function renderMenu (){
  menuEl.innerHTML = createMenu()
}

renderMenu()
