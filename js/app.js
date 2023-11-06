'use strict';

// Array to hold all products
const products = [];

// Number of Rounds
const rounds= 25;

// Constructor creates each product. Takes name and path as arguments.
// Starts popularity off at 0.
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.popularity = 0;
}



function getImages() {
  const dir = '../img';

}

// Pushes product into array
function addProduct(product) {
  products.push(product);
}

// Shuffles products array.
// Taken from Durstenfeld shuffle algorithm.
function shuffleArray() {
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
}
}

// Returns an array of the first three elements of products array.
function getThree() {
  return products.slice(0, 2);
}

// Creates three img elements from array.
function createThree(array) {
  for (let x of array) {
    const img = cEL('img');
    img.src = 'x.path';
  }

}

// getElementById shortcut
function getID(id) {
  return document.getElementById(id);
}

// createElement shortcut
function cEL(element) {
  return document.createElement(element);
}

// querySelector shortcut
function qS(selector) {
  return document.querySelector(selector);
}