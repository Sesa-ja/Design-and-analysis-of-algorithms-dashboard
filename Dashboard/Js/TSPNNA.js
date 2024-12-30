
const canvas = document.getElementById('tspCanvas');
const ctx = canvas.getContext('2d');

let points = [];
let lines = [];
let solving = false;
let bestDistance = 0;

const POINT_COLOR = '#ffffff';
const LINE_COLOR = '#5d5a5c';
const TITLE_COLOR = '#ff8000';

const POINT_RADIUS = 10;
const MIN_DISTANCE = 50;

const solveButton = document.getElementById('solveButton');
const resetButton = document.getElementById('resetButton');

canvas.addEventListener('click', (e) => {
    if (!solving) {
        addPoint(e.offsetX, e.offsetY);
        draw();
    }
});

resetButton.addEventListener('click', () => {
    reset();
});

solveButton.addEventListener('click', () => {
    if (!solving && points.length > 1) {
        solving = true;
        solveNearestNeighbor();
        solving = false;
    }
});

function addPoint(x, y) {
    if (points.some(point => distance(point, { x, y }) < MIN_DISTANCE)) {
        return;
    }
    points.push({ x, y });
}

function reset() {
    points = [];
    lines = [];
    bestDistance = 0;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        drawPoint(point.x, point.y);
    });

    lines.forEach(([start, end]) => {
        drawLine(start, end);
    });

    drawText(`Points: ${points.length}`, 20, 30, TITLE_COLOR);
    drawText(`Best Distance: ${bestDistance.toFixed(2)}`, 20, 60, TITLE_COLOR);
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = POINT_COLOR;
    ctx.fill();
    ctx.closePath();
}

function drawLine(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}

function drawText(text, x, y, color) {
    ctx.font = '20px Georgia';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function solveNearestNeighbor() {
    let currentPoint = points[0];
    let unvisited = [...points];
    let visited = [currentPoint];
    let totalDistance = 0;

    unvisited.splice(unvisited.indexOf(currentPoint), 1);

    while (unvisited.length > 0) {
        let nearestPoint = unvisited.reduce((nearest, point) => {
            return distance(currentPoint, point) < distance(currentPoint, nearest)
                ? point
                : nearest;
        });

        lines.push([currentPoint, nearestPoint]);
        totalDistance += distance(currentPoint, nearestPoint);

        currentPoint = nearestPoint;
        visited.push(currentPoint);
        unvisited.splice(unvisited.indexOf(currentPoint), 1);
    }

    totalDistance += distance(currentPoint, visited[0]);
    lines.push([currentPoint, visited[0]]);

   
    bestDistance = totalDistance;
    draw();
}
