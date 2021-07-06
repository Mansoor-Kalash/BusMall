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
let pruductsNames =[];
let votes = [];
let views = [];



let cont =0;
let any =[200,200,200];


function saveToLocalStorage() {

  let data = JSON.stringify(pruducts);
  localStorage.setItem('pruducts', data);
}

function readFromLocalStorage() {
  let stringObj = localStorage.getItem('pruducts');
  // console.log(stringObj);
  let normalObj = JSON.parse(stringObj);
  console.log(normalObj);


  if (normalObj !== null) {

    for (let i=0 ; i<normalObj.length; i++)
    {
      pruducts [i].views =normalObj[i].views;
      pruducts [i].votes =normalObj[i].votes;
    }
  }
  console.log(normalObj);



}



function ProductImage(prodName) {

  this.pNme = prodName.split('.')[0];
  this.img = 'image/' + prodName;
  this.votes = 0;
  this.views = 0;
  pruductsNames.push(this.pNme);
  pruducts.push(this);

}


let pruductsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];


for (let i = 0; i < pruductsImages.length; i++) {
  new ProductImage(pruductsImages[i]);
}


function randomIndex() {

  return Math.floor(Math.random() * pruducts.length);
}
let leftIndex;
let middleIndex;
let rightIndex;
function renderRandomImg() {

  leftIndex = randomIndex();
  middleIndex = randomIndex();
  rightIndex = randomIndex();

  if (1<= cont <26)
  {
    while (any.indexOf(leftIndex) !== -1 )
    {
      leftIndex = randomIndex();
    }
    while (any.indexOf(middleIndex) !== -1 || leftIndex === middleIndex)
    {
      middleIndex = randomIndex();
    }
    while (any.indexOf(rightIndex) !== -1 || leftIndex === rightIndex || rightIndex === middleIndex)
    {
      rightIndex = randomIndex();
    }

  }
  any = [leftIndex,middleIndex,rightIndex];


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


  } else {
    ulEl = document.getElementById('results');

    for (let i = 0; i < pruducts.length; i++) {
      let liEl = document.createElement('li');
      liEl.textContent = `${pruducts[i].pNme} has ${pruducts[i].votes} votes and ${pruducts[i].views} views .`;
      ulEl.appendChild(liEl);
      votes.push(pruducts[i].votes);
      views.push(pruducts[i].views);
    }
    saveToLocalStorage();
    leftImgEl.removeEventListener('click', handelClicks);
    middleImgEl.removeEventListener('click', handelClicks);
    rightImgEl.removeEventListener('click', handelClicks);
    chartRender();
  }
  attempts++;
}
function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pruductsNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2
      },
      {
        label: '# of views',
        data: views,
        backgroundColor: [
          'rgba(155, 199, 120, 0.2)',
        ],
        borderColor: [
          'rgba(155, 199, 120, 0.2)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
readFromLocalStorage();

