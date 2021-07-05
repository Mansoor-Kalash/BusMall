'use strict';
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let middleImgEl = document.getElementById('middleImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('results');
let pruducts = [];//0-7
let attempts = 1;
let maxAttempts = 25;

function ProductImage(prodName) {
    //sweater-goat.jpg
    //['sweater-goat','jpg']
    this.pNme = prodName.split('.')[0];
    this.img = 'image/' + prodName;
    this.votes = 0;
    this.views = 0;
    pruducts.push(this);
}

let pruductsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

for (let i = 0; i < pruductsImages.length; i++) {
    new ProductImage(pruductsImages[i]);
}
console.log(pruducts);

function randomIndex() {
    // Math.random();//0-1
    //0-1 >>> 0.5 0.6 0.001
    return Math.floor(Math.random() * pruducts.length);
}
let leftIndex;
let middleIndex;
let rightIndex;
function renderRandomImg() {

    leftIndex = randomIndex();//0 cruisin-goat.jpg
    middleIndex = randomIndex();
    rightIndex = randomIndex();//5 sassy-goat.jpg
    while (leftIndex === rightIndex || leftIndex === middleIndex ) {
        leftIndex = randomIndex();
        rightIndex = randomIndex();
    }

    leftImgEl.setAttribute('src', pruducts[leftIndex].img);
    middleImgEl.setAttribute('src', pruducts[middleIndex].img);
    rightImgEl.setAttribute('src', pruducts[rightIndex].img);
    leftImgEl.setAttribute('alt', pruducts[leftIndex].pNme);
    middleImgEl.setAttribute('alt', pruducts[middleIndex].pNme);
    rightImgEl.setAttribute('alt', pruducts[rightIndex].pNme);
    leftImgEl.setAttribute('title', pruducts[leftIndex].pNme);
    middleImgEl.setAttribute('title', pruducts[middleIndex].pNme);
    rightImgEl.setAttribute('title', pruducts[rightIndex].pNme);
    pruducts[leftIndex].views++;
    pruducts[middleIndex].views++;
    pruducts[rightIndex].views++;
   

}

renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            pruducts[leftIndex].votes++;
        }
        else if (clickedImg === 'middleImg') {
            pruducts[middleIndex].votes++;
        }
        else if (clickedImg === 'rightImg') {
            pruducts[rightIndex].votes++;
        }
        
        renderRandomImg();

        console.log(pruducts);
    } else {
        let ulEl = document.getElementById('results');
        for (let i = 0; i < pruducts.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${pruducts[i].pNme} has ${pruducts[i].votes} votes and ${pruducts[i].views} views .`
            ulEl.appendChild(liEl);
        }
        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
    }
    attempts++;
}
