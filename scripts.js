import data from "./data.js";

// get itemsContainer
const itemsContainer = document.querySelector("#items");
// get cartQty
const cartQty = document.getElementById("cart-qty");
// get itemList
const itemList = document.getElementById("item-list");
// get cartTotal
const cartTotal = document.getElementById("cart-total");

// loop through data, create html elements
for (let i = 0; i < data.length; i += 1) {
  // create a new div element and give it a class name
  const newDiv = document.createElement("div");
  newDiv.className = "item";
  // create an image element
  const img = document.createElement("img");
  img.src = data[i].image;
  console.log(data[i].image);
  img.width = 300;
  img.height = 300;
  // create description p
  const desc = document.createElement("p");
  desc.innerHTML = data[i].desc;
  // create price p
  const price = document.createElement("p");
  price.innerHTML = data[i].price;
  // create add to cart button
  const button = document.createElement("button");
  // add unique ID with .name
  button.id = data[i].name;
  // create custom data attribute to hold price
  button.dataset.price = data[i].price;
  button.innerHTML = "Add to Cart";
  // Add the image, description, price and button to the div
  newDiv.appendChild(img);
  newDiv.appendChild(desc);
  newDiv.appendChild(price);
  newDiv.appendChild(button);
  console.log(img); // Check the console!
  itemsContainer.appendChild(newDiv);
}

// select all buttons
const allItemsButton = Array.from(document.querySelectorAll("button"));
// console.log(allItemsButton);

allItemsButton.forEach((elt) =>
  elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"));
    showItems();
  })
);

// initialize cart
const cart = [];

// -------------------------------------------------------------------
// Handle change events on update input
itemList.onchange = function (e) {
  if (e.target && e.target.classList.contains("update")) {
    const name = e.target.dataset.name;
    const qty = parseInt(e.target.value);
    updateCart(name, qty);
  }
};

// -------------------------------------------------------------------
// Handle clicks on list
itemList.onclick = function (e) {
  // console.log(e.target);
  if (e.target && e.target.classList.contains("remove")) {
    const name = e.target.dataset.name; // data-name=?
    removeItem(name);
  } else if (e.target && e.target.classList.contains("add-one")) {
    const name = e.target.dataset.name; // data-name=?
    addItem(name);
  } else if (e.target && e.target.classList.contains("remove-one")) {
    const name = e.target.dataset.name; // data-name=?
    removeItem(name, 1);
  }
};

// -------------------------------------------------------------------
// Add Item
function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    // if item already in cart
    if (cart[i].name === name) {
      // update quantity
      cart[i].qty++;
      showItems();
      return;
    }
  }
  // const item = { name: name, price: price, qty: 1 };
  // 						↓↓↓ this is shorthand for ↑↑↑
  const item = { name, price, qty: 1 };
  cart.push(item);
}

// -------------------------------------------------------------------
// Show Items
function showItems() {
  // console.log(`\nYou have ${getQty()} items in your cart`);
  // console.log(`Cart Total: $${getTotal()}`);
  // set cartQty and cartTotal html
  cartQty.innerHTML = `You have ${getQty()} items in your cart`;
  cartTotal.innerHTML = `Cart Total: $${getTotal()}`;

  // set itemList html
  let itemStr = "";
  for (let i = 0; i < cart.length; i++) {
    // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
    // define intermediate variables
    // const name = cart[i].name;
    // const price = cart[i].price;
    // const qty = cart[i].qty;
    // 			↓↓↓ this is shorthand for ↑↑↑
    const { name, price, qty } = cart[i];
    // this works if these variables match the names of the keys in the object
    itemStr += `<li> 
			${name} $${price} x ${qty} = $${price * qty} 
			<button class="remove" data-name="${name}">Remove</button>
			<button class="add-one" data-name="${name}"> + </button>
			<button class="remove-one" data-name="${name}"> - </button>
			<input class="update" type="number" min="0" step="1" data-name="${name}">
		</l1>`;
  }
  // add to innerHTML
  itemList.innerHTML = itemStr;
}

// -------------------------------------------------------------------
// Get Quantity
function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i++) {
    qty += cart[i].qty;
  }
  return qty;
}

// -------------------------------------------------------------------
// Get Total
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].qty * cart[i].price;
  }
  return total.toFixed(2);
}

// -------------------------------------------------------------------
// Remove Item
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty > 0) {
        cart[i].qty -= qty;
      }
      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1);
      }
      showItems();
      return;
    }
  }
}

// -------------------------------------------------------------------
// Update Cart
function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name);
        return;
      }
      cart[i].qty = qty;
      showItems();
      return;
    }
  }
}

// -------------------------------------------------------------------
// Test
addItem("Apple", 0.99);
addItem("Orange", 1.29);
addItem("Opinion", 0.02);
addItem("Frisbee", 9.92);
addItem("Apple", 0.99);
addItem("Apple", 0.99);
addItem("Orange", 1.29);

showItems();
removeItem("Apple", 1);
removeItem("Frisbee");
showItems();
