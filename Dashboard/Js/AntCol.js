let ants = [];  
let grid;
let antCount = 10;  
let pheromoneGrid;
function setup() {
  let canvas = createCanvas(900, 400); 
  grid = new Grid(15, 10);  
  pheromoneGrid = new PheromoneGrid(15, 10);
  initializeAnts(antCount);
}
function draw() {
  background(0);  
  grid.show();    
  pheromoneGrid.evaporate(); 
  pheromoneGrid.show(); 
  for (let ant of ants) {
    ant.move();
    ant.leavePheromone(); 
    ant.draw();
  }
}

function initializeAnts(count) {
  ants = [];  
  for (let i = 0; i < count; i++) {
    ants.push(new Ant(grid, random(width), random(height)));
  }
}
function adjustAntCount(count) {
  antCount = count;
  document.getElementById('ant-count-display').textContent = count;
  initializeAnts(count);  
}

class Ant {
  constructor(grid, x, y) {
    this.grid = grid;
    this.pos = createVector(x, y);   
    this.dir = p5.Vector.random2D(); 
    this.speed = 2;
    this.memory = 25;
    this.radius = 16; 
    this.pastPositions = [];
    this.cargo = false;  
  }

  move() {
   
    let possibleDirs = [];
    let currentCell = this.grid.getCell(this.pos);
    
    let maxPheromoneDir = null;
    let maxPheromoneLevel = 0;

    let dirs = [createVector(0, -1), createVector(0, 1), createVector(-1, 0), createVector(1, 0)]; // Up, Down, Left, Right
    
    for (let dir of dirs) {
      let checkPos = p5.Vector.add(this.pos, p5.Vector.mult(dir, this.speed));
      let cell = this.grid.getCell(checkPos);
      
      if (cell && cell.type !== 'obstacle') {
        possibleDirs.push(dir); 
        
        let pheromoneLevel = pheromoneGrid.getPheromoneAt(cell.i, cell.j);
        if (pheromoneLevel > maxPheromoneLevel) {
          maxPheromoneLevel = pheromoneLevel;
          maxPheromoneDir = dir;
        }
      }
    }

    if (maxPheromoneDir && random(1) < 0.7) {
      this.dir = maxPheromoneDir; 
    } else if (possibleDirs.length > 0) {
      this.dir = random(possibleDirs); 
    }

    this.pos.add(p5.Vector.mult(this.dir, this.speed));  

   
    this.pastPositions.push(this.pos.copy());
    if (this.pastPositions.length > this.memory) {
      this.pastPositions.shift();  
    }
  }

  draw() {
    
    fill(255, 255, 0);  
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    stroke(255, 0, 0);
    noFill();
    beginShape();
    for (let v of this.pastPositions) {
      vertex(v.x, v.y);
    }
    endShape();
  }

  leavePheromone() {
    let cell = this.grid.getCell(this.pos);
    if (cell) {
      pheromoneGrid.addPheromone(cell.i, cell.j);
    }
  }
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.cells = [];
    
    for (let i = 0; i < cols; i++) {
      this.cells[i] = [];
      for (let j = 0; j < rows; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
  }
  
  getCell(pos) {
    let col = floor(pos.x / (width / this.cols));  
    let row = floor(pos.y / (height / this.rows));
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      return this.cells[col][row];
    }
    return null;
  }
  
  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.cells[i][j].show();
      }
    }
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.type = 'ground';  
    
    if (random(1) < 0.1) this.type = 'food'; 
    if (random(1) < 0.2) this.type = 'obstacle';
  }

  show() {
    noStroke();
    if (this.type === 'ground') fill(50);
    if (this.type === 'food') fill(0, 255, 0);  
    if (this.type === 'obstacle') fill(255, 0, 0); 
    rect(this.i * (width / grid.cols), this.j * (height / grid.rows), width / grid.cols, height / grid.rows);
  }
}

class PheromoneGrid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.pheromones = [];
    for (let i = 0; i < cols; i++) {
      this.pheromones[i] = [];
      for (let j = 0; j < rows; j++) {
        this.pheromones[i][j] = 0;  
      }
    }
  }

  addPheromone(i, j) {
    this.pheromones[i][j] += 1;  
  }

  evaporate() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.pheromones[i][j] *= 0.99;  
      }
    }
  }

  getPheromoneAt(i, j) {
    return this.pheromones[i][j];
  }

  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let alpha = map(this.pheromones[i][j], 0, 10, 0, 255);  
        fill(255, 0, 255, alpha);  
        rect(i * (width / this.cols), j * (height / this.rows), width / this.cols, height / this.rows);
      }
    }
  }
}
