/* Put your javascript in here */
const slideArray = [];
for (let i = 0; i < document.querySelectorAll('.slider div').length; i++) {
    slideArray.push(document.querySelectorAll('.slider div')[i].dataset.background);
}

let currentSlideIndex = -1;

function advanceSliderItem() {
  currentSlideIndex++;

  if (currentSlideIndex >= slideArray.length) {
      currentSlideIndex = 0;
  }

  document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';

  const elems = document.getElementsByClassName('caption');
  for (let i = 0; i < elems.length; i++) {
      elems[i].style.cssText = 'opacity: 0;';
  }

  const currentCaption = document.querySelector('.caption-' + (currentSlideIndex));
      currentCaption.style.cssText = 'opacity: 1;';
}

let intervalID = setInterval(advanceSliderItem, 3000);


function arrayMethodDemo() {
    const array1 = [1, 2, "3", 4, 5];

    const listContainer = document.createElement('ul');
    const target = document.querySelector('#box1');
    target.append(listContainer);

    array1.forEach(element => {
        const listItem = document.createElement('li');
        listItem.innerText = element;
        listContainer.append(listItem);
    })
}

function arrayMethodDemo() {
    const array1 = [1, 2, "3", 4, 5];

    const listContainer = document.createElement('ul');
    const target = document.querySelector('#box1');
    target.append(listContainer);

    const array2 = array1.map(element => {
        const listItem = document.createElement('li');
        listItem.innerText = element;
        listContainer.append(listItem);
        return typeof element;
    })

    console.log(array2);
}

function arraySushi() {
    const iarray = [];
    const images = document.querySelector('#images');

    images.forEach(element => {
        const k = document.querySelector('li');
        k.append(images);
    })
    console.log(iarray);
}
arraySushi()

let i = 1;
for(let li of carousel.querySelectorAll('li')) {
    li.style.position = 'relative';
    li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
    i++;
}

/* configuration */
let width = 130; // image width
let count = 3; // visible images count

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');

let position = 0; // ribbon scroll position

carousel.querySelector('.prev').onclick = function() {
    // shift left
    position += width * count;
    // can't move to the left too much, end of images
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
    // shift right
    position -= width * count;
    // can only shift the ribbbon for (total ribbon length - visible count) images
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
};

const listContainer = document.querySelector('.images');

function shiftLeft() {
    const lastThree = Array.from(listContainer.children).slice(4, 7).reverse();
    lastThree.forEach((element) => {
        listContainer.removeChild(element);
        listContainer.insertBefore(element, listContainer.children[0]);
    })
}

function shiftRight() {
    const firstThree = Array.from(listContainer.children).slice(0, 3);
    firstThree.forEach((element) => {
        listContainer.removeChild(element);
        listContainer.appendChild(element);
    })
}

function onLoadOfPage() {
    document.querySelector("button.arrow.prev").addEventListener('click', (event) => {
        shiftLeft();
    });
    document.querySelector("button.arrow.next").addEventListener('click', (event) => {
        shiftRight();
    });
}
window.onload = onLoadOfPage;