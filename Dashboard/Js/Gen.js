let target;
let counter = 0;
let lifespan = 400;
let agents = 200;
let generations = 1;
let golfballs = [];
let matingpool = [];
let obstacles = [];
let isRunning = false; 
let startButton, pauseButton, resetButton;

function setup() {
    let canvas = createCanvas(900, 400);
    canvas.parent('canvas-container'); 
    
    
    startButton = createButton('Start');
    startButton.id('startButton'); 
    startButton.parent('controls');
    startButton.mousePressed(startSimulation);

    pauseButton = createButton('Pause');
    pauseButton.id('pauseButton'); 
    pauseButton.parent('controls');
    pauseButton.mousePressed(pauseSimulation);

    resetButton = createButton('Reset');
    resetButton.id('resetButton'); 
    resetButton.parent('controls');
    resetButton.mousePressed(resetSimulation);

    setCourse();
    createObstacles();
}

function draw() {
    if (isRunning) {
        background(93, 140, 60);
        getCourse();
        runGeneration();
        if (counter == lifespan) {
            newGeneration();
        }
    }
}

function startSimulation() {
    if (!isRunning) {
        if (golfballs.length === 0) {
            initializeGolfballs();
        }
        isRunning = true;
    }
}

function pauseSimulation() {
    isRunning = false;
}

function resetSimulation() {
    
    isRunning = false;
    golfballs = [];
    generations = 1;
    counter = 0;
    initializeGolfballs();
    console.log("Simulation reset.");
}

function initializeGolfballs() {
    
    for (let i = 0; i < agents; i++) {
        let golfball = new Golfball();
        golfballs.push(golfball);
    }
}

function runGeneration() {
    for (let golfball of golfballs) {
        golfball.show();
        if (!golfball.finished && !golfball.stopped) {
            golfball.applyForce(golfball.dna[counter]);
            golfball.update();
        }

        for (let obstacle of obstacles) {
            if (golfball.collidesWith(obstacle)) {
                golfball.stopped = true;
            }
        }

        golfball.completed(target.x, target.y);
    }
    counter++;
}

function newGeneration() {
    console.log("Creating a new generation...");
    
    for (let i = 0; i < golfballs.length; i++) {
        golfballs[i].fitness = golfballs[i].calcFitness(target.x, target.y);
    }

    normalizeData();
    naturalSelection();
    golfballs = [];

    for (let i = 0; i < agents; i++) {
        let parentA = random(matingpool);
        let parentB = random(matingpool);
        while (parentA == parentB) {
            parentB = random(matingpool);
        }
        golfballs.push(new Golfball(parentA.breed(parentB)));
    }

    for (let i = 0; i < golfballs.length; i++) {
        for (let j = 0; j < golfballs[i].dna.length; j++) {
            let r = random();
            if (r < 0.01) {
                let newDNA = createVector(random(-1, 1), random(-1, 1));
                golfballs[i].dna[j] = newDNA;
            }
        }
    }
    generations++;
    counter = 0;
}

function createObstacles() {
    obstacles.push({ x: width / 4, y: height / 2 - 100, w: 30, h: 200 });
    obstacles.push({ x: width / 2, y: height / 3 - 50, w: 200, h: 30 });
    obstacles.push({ x: width / 2, y: (2 * height) / 3 - 50, w: 200, h: 30 });
    obstacles.push({ x: (3 * width) / 4, y: height / 2 - 100, w: 30, h: 200 });
}

function naturalSelection() {
    matingpool = [];

    for (let i = 0; i < golfballs.length; i++) {
        let odds = golfballs[i].fitness;
        for (let j = 0; j < odds; j++) {
            matingpool.push(golfballs[i]);
        }
    }
}

function normalizeData() {
    let highestFit = 0;
    let lowestFit = Infinity;

    for (let golfball of golfballs) {
        if (golfball.fitness > highestFit) {
            highestFit = golfball.fitness;
        }
        if (golfball.fitness < lowestFit) {
            lowestFit = golfball.fitness;
        }
    }

    for (let golfball of golfballs) {
        golfball.fitness = map(golfball.fitness, lowestFit, highestFit, 0, 1);
    }
}

function setCourse() {
    target = createVector(width - 70, height / 2);
}

function getCourse() {
    background(93, 140, 60);
    
    fill(0);
    ellipse(target.x, target.y, 14);
    
    fill(255, 0, 0);
    for (let obstacle of obstacles) {
        rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    }

    fill(255);
    textSize(20);
    text('Generations: ' + generations, 10, 50);
}


class Golfball {
    constructor(dna) {
        this.position = createVector(50, height / 2);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.dna = dna || this.createDNA();
        this.fitness = 0;
        this.finished = false;
        this.stopped = false;
        this.radius = 5;
        this.time = 0;
    }

    createDNA() {
        let genes = [];
        for (let i = 0; i < lifespan; i++) {
            genes[i] = createVector(random(-1, 1), random(-1, 1));
        }
        return genes;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        if (!this.finished && !this.stopped) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            this.velocity.limit(4);
            this.time++;
        }
    }

    show() {
        fill(255, 150);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    calcFitness(targetX, targetY) {
        let d = dist(this.position.x, this.position.y, targetX, targetY);
        this.fitness = map(d, 0, width, width, 0);
        if (this.finished) {
            this.fitness *= 10;
        }
        if (this.stopped) {
            this.fitness *= 0.1;
        }
        return this.fitness;
    }

    completed(targetX, targetY) {
        let d = dist(this.position.x, this.position.y, targetX, targetY);
        if (d < 10) {
            this.finished = true;
            this.position = createVector(targetX, targetY);
        }
    }

    collidesWith(obstacle) {
        return this.position.x > obstacle.x &&
               this.position.x < obstacle.x + obstacle.w &&
               this.position.y > obstacle.y &&
               this.position.y < obstacle.y + obstacle.h;
    }

    breed(partner) {
        let childDNA = [];
        let midpoint = floor(random(this.dna.length));
        for (let i = 0; i < this.dna.length; i++) {
            if (i > midpoint) {
                childDNA[i] = this.dna[i];
            } else {
                childDNA[i] = partner.dna[i];
            }
        }
        return childDNA;
    }
}
