'use strict';

// Array to hold all products
const products = [];
let tempProducts = [];
let imgArray = [];

// Number of max rounds
const maxRounds= 25;

// Current round counter
let rounds = 0;

// Number of products to display
const displayAmount = 3;

// All products. Global for ease.
let bag = new Product('bag', 'img/bag.jpg');
let banana = new Product('banana', 'img/banana.jpg');
let bathroom = new Product('bathroom', 'img/bathroom.jpg');
let boots = new Product('boots', 'img/boots.jpg');
let breakfast = new Product('breakfast', 'img/breakfast.jpg');
let bubblegum = new Product('bubblegum', 'img/bubblegum.jpg');
let chair = new Product('chair', 'img/chair.jpg');
let cthulhu = new Product('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Product('dog-duck', 'img/dog-duck.jpg');
let dragon = new Product('dragon', 'img/dragon.jpg');
let pen = new Product('pen', 'img/pen.jpg');
let petSweep = new Product('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Product('scissors', 'img/scissors.jpg');
let shark = new Product('shark', 'img/shark.jpg');
let sweep = new Product('sweep', 'img/sweep.png');
let tauntaun = new Product('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Product('unicorn', 'img/unicorn.jpg');
let waterCan = new Product('water-can', 'img/water-can.jpg');
let wineGlass = new Product('wine-glass', 'img/wine-glass.jpg');

// Consolidates all the functions that need to be called on page load.
// For my sanity.
function functionCalls() {
  pushProducts();
  tempProducts = products.slice(0);
  voteFunctions();
}

// Consolidates all functions that need to be called upon vote click.
function voteFunctions() {
  const array = takeAndRemoveProducts();
  createImgs(array);
  printImgs();
}

// Constructor creates each product. Takes name and path as arguments.
// Starts popularity off at 0.
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.views = 0;
  this.popularity = 0;
}

// Adds all products to products array.
function pushProducts() {
  products.push(bag);
  products.push(banana);
  products.push(bathroom);
  products.push(boots);
  products.push(breakfast);
  products.push(bubblegum);
  products.push(chair);
  products.push(cthulhu);
  products.push(dogDuck);
  products.push(dragon);
  products.push(pen);
  products.push(petSweep);
  products.push(scissors);
  products.push(shark);
  products.push(sweep);
  products.push(tauntaun);
  products.push(unicorn);
  products.push(waterCan);
  products.push(wineGlass);
}

// Shuffles products array.
// Taken from Fisher-Yates shuffle algorithm.
function shuffleArray() {
  tempProducts = products.slice(0);
  for (let i = tempProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempProducts[i], tempProducts[j]] = [tempProducts[j], tempProducts[i]];
  }
}

// Returns an array of the first three elements of products array.
function takeAndRemoveProducts() {
  if (tempProducts.length === 0) {
    shuffleArray();
  } else if (tempProducts.length < displayAmount) {
    let oldProducts = tempProducts.splice(0, tempProducts.length);
    const length = oldProducts.length;
    shuffleArray();
    for (let i = 0; i < (displayAmount - length); i++) {
      for (let x of tempProducts) {
        if (!(oldProducts.includes(x))) {
          const index = tempProducts.indexOf(x);
          oldProducts = oldProducts.concat(tempProducts.splice(index, 1));
          break;
        }
      }
    }
    return oldProducts;
  }
  const productsToDisplay = tempProducts.splice(0, (displayAmount));
  return productsToDisplay;
}

// Creates img elements from array.
function createImgs(array) {
  imgArray = [];
  let index = 0;
  for (let x of array) {
    x.views += 1;
    const img = cEL('img');
    img.src = x.path;
    img.setAttribute('id', 'product' + index);
    img.setAttribute('class', 'productImg');
    img.addEventListener('click', function() {
      x.popularity += 1;
      rounds += 1;
      console.log(JSON.stringify(x));
      voteFunctions();
    });
    imgArray.push(img);
  }
}

// Clears #images section of all product children
// Appends new product children
function printImgs() {
  const section = getID('images');
  while (section.lastChild) {
    section.removeChild(section.lastChild);
  }
  for (let x of imgArray) {
    section.append(x);
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

// Calls
functionCalls();

