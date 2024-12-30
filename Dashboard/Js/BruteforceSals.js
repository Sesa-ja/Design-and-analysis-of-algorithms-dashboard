var cities = [];
var totalCities = 5;
var recordDistance;
var bestEver;
var allPermutations = [];
var count = 0;
var paused = false;

function setup() {
  let canvasContainer = select('#canvas-container');
  let canvas = createCanvas(900, 400); 
  canvas.parent(canvasContainer);  

  
  smooth();
  
  
  createCities();

 
  document.getElementById("startBtn").addEventListener("click", function() {
    loop();  
  });
  
  document.getElementById("pauseBtn").addEventListener("click", function() {
    if (paused) {
      loop();  
      paused = false;
      document.getElementById("pauseBtn").innerText = "Pause";
    } else {
      noLoop();  
      paused = true;
      document.getElementById("pauseBtn").innerText = "Resume";
    }
  });

  document.getElementById("resetBtn").addEventListener("click", function() {
    resetSketch(); 
  });

  document.getElementById("citySlider").addEventListener("input", function() {
    totalCities = parseInt(this.value);  
    resetSketch();  
  });

  noLoop();  
}

function draw() {
  background(50, 50, 80);  

  noStroke();
  for (var i = 0; i < cities.length; i++) {
    fill(0, 255, 200);
    ellipse(cities[i].x, cities[i].y, 15, 15);
    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(i + 1, cities[i].x, cities[i].y - 10);
  }

 
  stroke(255, 100, 100, 150);  
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (var i = 0; i < allPermutations[count].length; i++) {
    curveVertex(allPermutations[count][i].x, allPermutations[count][i].y);
  }
  endShape();

  
  stroke(0, 255, 150);
  strokeWeight(3);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    curveVertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  
  var d = calcDistance(allPermutations[count]);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = allPermutations[count].slice();  
    document.getElementById("info").innerText = `Shortest Distance: ${recordDistance.toFixed(2)}`;
  }

  
  count++;

  if (count >= allPermutations.length) {
    noLoop();  
    document.getElementById("info").innerText += " - All routes tested!";
  }
}


function createCities() {
  cities = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width - 40) + 20, random(height - 40) + 20);  // Ensure cities are within canvas bounds
    cities[i] = v;
  }

  
  allPermutations = permute(cities);
  var d = calcDistance(allPermutations[0]);
  recordDistance = d;
  bestEver = allPermutations[0];
  count = 0;
}


function resetSketch() {
  createCities();
  loop();  
  document.getElementById("info").innerText = "Shortest Distance: N/A";
  document.getElementById("pauseBtn").innerText = "Pause";
  paused = false;
}

function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i + 1].x, points[i].y, points[i + 1].y);
    sum += d;
  }
  return sum;
}


function permute(arr) {
  let result = [];
  if (arr.length === 0) return [[]];

  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = permute(rest);
    perms.forEach(perm => result.push([arr[i], ...perm]));
  }
  return result;
}
