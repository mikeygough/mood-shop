import data from './data.js'

const itemsContainer = document.querySelector('#items')

// loop through data, create html elements
for (let i = 0; i < data.length; i += 1) {
  // create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	img.src = data[i].image
  console.log(data[i].image);
	img.width = 300
	img.height = 300
	// create description p
	const desc = document.createElement('p');
	desc.innerHTML = data[i].desc
	// create price p
	const price = document.createElement('p');
	price.innerHTML = data[i].price
	// create add to cart button
	const button = document.createElement('button');
	// add unique ID with .name
	button.id = data[i].name
	// create custom data attribute to hold price
	button.dataset.price = data[i].price
	button.innerHTML = 'Add to Cart'
	// Add the image, description, price and button to the div
	newDiv.appendChild(img)
	newDiv.appendChild(desc)
	newDiv.appendChild(price)
	newDiv.appendChild(button)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)
}

const cart = [];

function addItem(name, price) {
	const item = {name: name,
								price: price,
								qty: 1}
	
	cart.push(item);
}

function showItems() {
	console.log(`You have ${cart.length} items in your cart`);
	for (let i = 0; i < cart.length; i++) {
		console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
	}

}

addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Opinion', 0.02)
addItem('Frisbee', 9.92)

showItems()