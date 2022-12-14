const pixelSize = 16;
var rule = "S:23 B:3" // interchangable
let grid;
let paused = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    grid = new Grid(pixelSize, rule);
    frameRate(30);
}
function draw() {
    background(0);
    grid.show();
    if(mouseIsPressed) {
        frameRate(120);
        let x = Math.floor(mouseX / grid.pixelw);
        let y = Math.floor(mouseY / grid.pixelh);
        if(x >= 0 && x < grid.c && y >= 0 && y < grid.r) {
            if(mouseButton === LEFT)
                grid.set(1, x, y);
            else if(mouseButton === RIGHT)
                grid.set(0, x, y);
        }
    } else {
        frameRate(30);
        if(!paused)
            grid.step();
    }
}
function keyPressed() {
    if(keyCode === ENTER)
        paused = !paused;
    if(keyCode === BACKSPACE)
        reset_grid();
    if(keyCode === DOWN_ARROW)
    {
        paused = true;
        grid.step();
    }
    if(keyCode === SHIFT) {
        reset_grid();
        for(let i = 0; i < grid.c * grid.r / 2; i++) {
            let x = Math.floor(genRandomArbitrary(0, grid.c))
            let y = Math.floor(genRandomArbitrary(0, grid.r))
            grid.set(1, x, y);
        }
    }
}
function genRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function windowResized() { 
    resizeCanvas(window.innerWidth, window.innerHeight);
    reset_grid();
}
function setNewRules() {
    let rules = document.getElementById("rules").value
    rule = rules;
    reset_grid();
}
var reset_grid = () => { grid = new Grid(pixelSize, rule); }
