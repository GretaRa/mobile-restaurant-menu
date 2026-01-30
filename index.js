import { menuArray } from "./data.js";
const menuEl = document.getElementById('menu')

function createItems (){
  let menuList = ``

  menuArray.forEach(item => {
    menuList += `
      <div class="menu-item">
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-info" id="${item.id}">
            <h2 class="item-name">${item.name}</h2>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <button class="add-btn">+</button>
      </div>
    `
  });

  return menuList
}

function renderMenu (){
  menuEl.innerHTML = createItems()
}

renderMenu()

// name: "Beer",
// ingredients: ["grain, hops, yeast, water"],
// price: 12,
// emoji: "🍺",
// id: 2