let cities = [];
let adjMatrix = [];
let optimalPath = [];
let optimalLength = 0;
let nodeQueue = [];
let numCities = 5; 
const canvasWidth = 900;  
const canvasHeight = 400; 

class Node {
    constructor(level, path, bound) {
        this.level = level;
        this.path = path;
        this.bound = bound;
    }
}


function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("tspCanvas");
    createRandomCities(numCities);
    drawCities();
    document.getElementById("generateButton").addEventListener("click", generateCities);
    document.getElementById("solveButton").addEventListener("click", solveTSP);
    document.getElementById("resetButton").addEventListener("click", resetVisualization);
}


function draw() {
    background(255);
    drawCities();
    drawEdges();
}


function createRandomCities(num) {
    cities = [];
    adjMatrix = Array.from({ length: num }, () => Array(num).fill(0));

    for (let i = 0; i < num; i++) {
        cities.push(createVector(random(50, canvasWidth - 50), random(50, canvasHeight - 50)));
    }

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            if (i !== j) {
                adjMatrix[i][j] = int(dist(cities[i].x, cities[i].y, cities[j].x, cities[j].y));
            }
        }
    }
}


function drawCities() {
    for (let i = 0; i < cities.length; i++) {
        fill(100, 200, 100);
        ellipse(cities[i].x, cities[i].y, 20, 20);
        fill(0);
        textAlign(CENTER);
        text(i, cities[i].x, cities[i].y + 15);
    }
}


function drawEdges() {
    if (optimalPath.length > 0) {
        stroke(0, 0, 255);
        strokeWeight(3);
        for (let i = 0; i < optimalPath.length - 1; i++) {
            line(cities[optimalPath[i]].x, cities[optimalPath[i]].y, cities[optimalPath[i + 1]].x, cities[optimalPath[i + 1]].y);
        }
        line(cities[optimalPath[optimalPath.length - 1]].x, cities[optimalPath[optimalPath.length - 1]].y, cities[optimalPath[0]].x, cities[optimalPath[0]].y);
    }
}


function generateCities() {
    const count = parseInt(document.getElementById("cityCount").value);
    numCities = constrain(count, 2, 10);
    createRandomCities(numCities);
    resetVisualization();
}


function solveTSP() {
    const src = 0;
    const result = travel(adjMatrix, src);
    optimalPath = result[0];
    optimalLength = result[1];
    document.getElementById("costDisplay").innerText = `Minimum Cost: ${optimalLength}`;
    document.getElementById("pathDisplay").innerText = `Optimal Path: ${optimalPath.join(" -> ")}`;
    draw();  
}


function resetVisualization() {
    optimalPath = [];
    optimalLength = 0;
    document.getElementById("costDisplay").innerText = `Minimum Cost: `;
    document.getElementById("pathDisplay").innerText = `Optimal Path: `;
    draw();  
}


function travel(adj_mat, src = 0) {
    let optimal_tour = [];
    const n = adj_mat.length;
    if (!n) {
        throw new Error("Invalid adj Matrix");
    }
    
    let u = new Node();
    nodeQueue = [];
    let optimal_length = 0;
    let v = new Node(0, [0], bound(adj_mat, new Node(0, [0])));
    let min_length = Infinity; 

    nodeQueue.push(v);  

    while (nodeQueue.length) {
        v = nodeQueue.shift(); 
        if (v.bound < min_length) {
            u.level = v.level + 1;

            for (let i = 1; i < n; i++) {
                if (!v.path.includes(i)) {
                    u.path = v.path.slice();
                    u.path.push(i);

                    if (u.level === n - 2) {
                        let last = [...Array(n).keys()].filter(x => !u.path.includes(x));
                        u.path.push(last[0]);
                        u.path.push(0);

                        const len = length(adj_mat, u);
                        if (len < min_length) {
                            min_length = len;
                            optimal_length = len;
                            optimal_tour = u.path.slice();
                        }
                    } else {
                        u.bound = bound(adj_mat, u);
                        if (u.bound < min_length) {
                            nodeQueue.push(new Node(u.level, u.path.slice(), u.bound));
                        }
                    }
                    u = new Node(u.level);  
                }
            }
        }
    }

   
    let optimal_tour_src = optimal_tour;
    if (src !== 0) {
        optimal_tour_src = optimal_tour.slice(0, -1);
        const y = optimal_tour_src.indexOf(src);
        optimal_tour_src = optimal_tour_src.slice(y).concat(optimal_tour_src.slice(0, y));
        optimal_tour_src.push(optimal_tour_src[0]);
    }

    return [optimal_tour_src, optimal_length];
}

function length(adj_mat, node) {
    const tour = node.path;
    return tour.slice(0, -1).reduce((sum, _, i) => sum + adj_mat[tour[i]][tour[i + 1]], 0);
}

function bound(adj_mat, node) {
    const path = node.path;
    let _bound = 0;
    const n = adj_mat.length;
    const determined = path.slice(0, -1);
    const last = path[path.length - 1];
    const remain = [...Array(n).keys()].filter(x => !path.includes(x));


    for (let i = 0; i < determined.length - 1; i++) {
        _bound += adj_mat[determined[i]][determined[i + 1]];
    }
    
   
    _bound += Math.min(...remain.map(r => adj_mat[last][r]));

    const p = [path[0]].concat(remain);

    remain.forEach(r => {
        _bound += Math.min(...p.filter(x => x !== r).map(x => adj_mat[r][x]));
    });

    return _bound;
}
