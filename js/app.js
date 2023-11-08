'use strict';

// Area to hold all product related arrays
const productNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass'
];
let tempProducts = [];
let imgArray = [];

// Number of max rounds
const maxRounds= 25;

// Current round counter
let rounds = 0;

// Number of products to display
const displayAmount = 3;

// Consolidates all the functions that need to be called on page load.
// Sends a copy of products array into tempProducts array.
// Shuffles tempArray
// Disables button at the start.
function functionCalls() {
  pushProducts();
  tempProducts = Product.products.slice(0);
  shuffleArray();
  getID('showResults').disabled = true;
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

// Array to keep things tidy? I guess.. anyways.
Product.products = [];

// Creates and pushes all products and information to products array.
function pushProducts() {
  for (let x of productNames) {
    const newProduct = new Product(x, 'img/' + x + '.jpg');
    Product.products.push(newProduct);
  }
}

// Shuffles products array.
// Taken from Fisher-Yates shuffle algorithm.
function shuffleArray() {
  tempProducts = Product.products.slice(0);
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
      if (rounds === maxRounds) {
        allowResults();
        clone();
      } else {
        voteFunctions();
      }
    });
    imgArray.push(img);
    index++;
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

// Adds event listener to #showResults button.
// Changes style to give visual representation.
function allowResults() {
  let button = getID('showResults');
  button.addEventListener('click', showResults);
  button.style.opacity = '100%';
  button.disabled = false;
}

// Prints results upon button press
function showResults() {
  let ul = getID('resultList');
  for (let x of Product.products) {
    let li = cEL('li');
    li.textContent = x.name + ': ' + x.popularity;
    ul.appendChild(li);
  }
  createBarChart();
  createPieChart();
}

// Returns array of all .view values in products
function getViews() {
  const views = [];
  for (let x of Product.products) {
    views.push(x.views);
  }
  return views;
}

// Returns array of all .popularity values in products
function getPops() {
  const popularity = [];
  for (let x of Product.products) {
    popularity.push(x.popularity);
  }
  return popularity;
}

// Clones children to make my life easier
// Acts as removeEventListener()
function clone() {
  const imgs = qSA('.productImg');
  for (let x of imgs) {
    const copy = x.cloneNode(true);
    x.parentNode.replaceChild(copy, x);
  }
}

/*
--------------------------------------Chart----------------------------------------------------
*/

// Creates bar chart using chart.js
// Takes views and popularity as datasets.
// Appends chart to #c1 canvas
function createBarChart() {
  const barCanvas = getID('c1').getContext('2d');

  const viewBarData = {
    label: 'Product Views',
    data: getViews(),
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
  };

  const popBarData = {
    label: 'Product Popularity',
    data: getPops(),
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
  };

  const barData = {
    labels: productNames,
    datasets: [viewBarData, popBarData]
  };

  const barOptions = {
    scales: {
      x: {
        barPercentage: 1,
        categoryPercentage: 0.6
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 8
      }
    },
    responsive: true
  };

  const config = {
    type: 'bar',
    data: barData,
    options: barOptions
  };

  const barChart = new Chart(barCanvas, config);
}

// Creates pie chart.
// Takes popularity as dataset.
// Appends chart to #c2 canvas
function createPieChart() {
  const pieCanvas = getID('c2');

  const popPieData = {
    labels: productNames,
    datasets: [{
      label: 'Product Popularity',
      data: getPops(),
      backgroundColor: [
        '#fae8eb', '#f6caca', '#e4c2c6', '#cd9fcc', '#0a014f',
        '#bee6ce', '#bcffdb', '#8dffcd', '#68d89b', '#4f9d69',
        '#cdf7f6', '#8fb8de', '#9a94bc', '#9b5094', '#6a605c',
        '#28536b', '#c2948a', '#7ea8be', '#f6f0ed', '#bbb193'
      ]
    }]
  };

  const config = {
    type: 'pie',
    data: popPieData,
    options: {
      responsive: true
    }
  };

  const pieChart = new Chart(pieCanvas, config);
}

/*
--------------------------------------Shortcut Functions----------------------------------------------------
*/

// getElementById shortcut
function getID(id) {
  return document.getElementById(id);
}

// createElement shortcut
function cEL(element) {
  return document.createElement(element);
}

// querySelector shortcut
function qSA(selector) {
  return document.querySelectorAll(selector);
}

/*
--------------------------------------Function Calls----------------------------------------------------
*/

functionCalls();

