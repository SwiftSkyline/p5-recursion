const MAX_LEVEL = 8;
const MIN_LEVEL = 0;
function setup() {
    createCanvas(innerWidth, innerHeight);
    stroke(255);
    noFill();
    // stop the draw function from being called every frame
    noLoop();
    // call the recursive function 
    drawCircle(width/2, height/2, width/4, MAX_LEVEL);
}
function drawCircle(x, y, d, count){
    ellipse(x,y,d);
    // decrement the count as a way to limit the recursion - the exit condition
    if(count > MIN_LEVEL){
        count--;
        // recursive calls 
        // 1 x 3 x 3 x 3 x 3...etc. exponential number of call being made
        drawCircle(x + d/2, y, d/2, count);
        drawCircle(x - d/2, y, d/2, count);
        drawCircle(x, y+d/2, d/2, count);
    }
}
