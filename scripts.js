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
	// Add the image to the div
	newDiv.appendChild(img)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)
}