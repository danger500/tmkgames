// cnavas setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const width = (canvas.width = 600);
const height = (canvas.height = 400);

// gloabal varibal
const cellSize = 50;
let frame = 0;
let gameOver = false;
let enimesInrervel = 400;
let numberOfResource = 500;
let score = 0;
let cellGap = 1.5;
const gameGrid = [];
const defenders = [];
const enimes = [];
const enimesPos = [];
const projectils = [];

const mouse = {
  x: 0,
  y: 0,
  width: 0.01,
  height: 0.01,
};

// controlling mouse
const canvasPos = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', e => {
  mouse.x = e.x - canvasPos.left;
  mouse.y = e.y - canvasPos.top;
});

canvas.addEventListener('mouseleave', e => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// init game

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (mouse.x && mouse.y && collison(this, mouse)) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}

// defender
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.timer = 0;
    this.health = 100;
    this.maxHeath = this.health;
    this.shoting = false;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'gold';
    ctx.font = '15px Arial';
    ctx.fillText(Math.floor(this.health), this.x + 10, this.y - 5);
  }
  update() {
    if (this.shoting) {
      this.timer++;
      if (this.timer % 100 === 0) {
        projectils.push(new Projectiles(this.x, this.y));
      }
    }
  }
}
const handelDefenders = () => {
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw();
    defenders[i].update();
    for (let j = 0; j < enimes.length; j++) {
      if (defenders[i] && collison(defenders[i], enimes[j])) {
        defenders[i].health -= 5;
        enimes[j].movment = 0;
      }
      if (defenders[i] && defenders[i].health <= 0) {
        defenders.splice(i, 1);
        i--;
        enimes[j].movment = enimes[j].speed;
      }
      if (enimesPos.indexOf(defenders[i].y !== -1)) {
        console.log(defenders[i].y);
        defenders[i].shoting = true;
      } else {
        defenders[i].shoting = false;
      }
    }
  }
};
// add a new defender
canvas.addEventListener('click', () => {
  let defenderCost = 100;
  const defenderPosX = mouse.x - ((mouse.x % cellSize) - cellGap);
  const defenderPosY = mouse.y - ((mouse.y % cellSize) - cellGap);
  if (defenderPosY < cellSize) return;
  for (let i = 0; i < defenders.length; i++) {
    if (defenders[i].x === defenderPosX && defenders[i].y === defenderPosY)
      return;
  }
  if (numberOfResource >= defenderCost) {
    defenders.push(new Defender(defenderPosX, defenderPosY));
    numberOfResource -= defenderCost;
  }
});

// enimes
class Enimes {
  constructor(verticalPos) {
    this.x = width;
    this.y = verticalPos;
    this.width = cellSize;
    this.height = cellSize;
    this.health = 100;
    this.maxHeath = this.health;
    this.speed = Math.random() * 0.4 + 0.2;
    this.movment = this.speed;
  }
  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'gold';
    ctx.font = '15px Arial';
    ctx.fillText(Math.floor(this.health), this.x + 10, this.y - 5);
  }
  update() {
    this.x -= this.movment;
  }
}
const createEnimes = () => {
  if (frame % enimesInrervel === 0) {
    let verticalPos = Math.floor(Math.random() * 6 + 1) * 50;
    enimes.push(new Enimes(verticalPos));
    enimesPos.push(verticalPos);
    if (enimesInrervel > 300) enimesInrervel -= 50;
  }
};

const handelEnimes = () => {
  for (let i = 0; i < enimes.length; i++) {
    enimes[i].draw();
    enimes[i].update();
    if (enimes[i].x <= 0) gameOver = true;
  }
};
// projectils
class Projectiles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.speed = 5;
    this.power = 20;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x + 50, this.y + 25, this.width, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.speed;
  }
}
const handelProjectils = () => {
  for (let i = 0; i < projectils.length; i++) {
    projectils[i].draw();
    projectils[i].update();
    if (projectils[i] && projectils[i].x >= width - 100) {
      projectils.splice(i, 1);
      i--;
    }
    for (let j = 0; j < enimes.length; j++) {
      if (projectils[i] && collison(projectils[i], enimes[j])) {
        projectils.splice(i, 1);

        enimes[j].health -= 20;
        i--;
      }
      if (enimes[j].health <= 0) {
        let reward = enimes[j].maxHeath / 2;
        score += reward;
        numberOfResource += reward;
        let indexOfThis = enimes.indexOf(enimes[j]);
        enimesPos.splice(indexOfThis, 1);
        enimes.splice(j, 1);
        j--;
      }
    }
  }
};
// utiliti
const controleBar = () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, width, cellSize);
};
const createGameGrid = () => {
  for (let y = cellSize; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
};

const controllBarStatus = () => {
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.fillText('Coins :' + numberOfResource, 10, 45);
  ctx.fillStyle = 'red';
  ctx.font = '60 Arial';
  if (gameOver) {
    ctx.fillText('GAME OVER', 300 - 80, 200);
  }
  ctx.fillStyle = 'white';
  ctx.font = '25px Arial';
  ctx.fillText('score :' + score, 10, 18);
};

createGameGrid();

const animte = () => {
  ctx.clearRect(0, 0, width, height);
  handelDefenders();
  handelEnimes();
  handelProjectils();
  createEnimes();
  controleBar();
  controllBarStatus();

  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
  frame++;
  if (!gameOver) requestAnimationFrame(animte);
};
animte();

// collison
function collison(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}
