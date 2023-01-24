// global variables that will be assigned once the p5.js library has been loaded
let brown1, brown2, slider;
function setup() {
    createCanvas(windowWidth, windowHeight);
    // working in degrees not radians, slightly less performant but easier for humans to read
    angleMode(DEGREES);
    // prevent the draw function from being called recursively 
    noLoop();
    // smooth the stroke joins
    strokeJoin(ROUND);
    // define branch colours
    brown1 = color('#AB589D');
    brown2 = color('#587FAB');
    // create a slider
    slider = createSlider(5, 180, 45);
    slider.position(10, 10);
    slider.style("width","300px");
    // when the slider changes, redraw the tree
    slider.input(draw);
}
function draw() {
    background(180);
    // this resets all the transforms (translations and rotations)
    resetMatrix();
    // initially translate to the middle of the bottom edge of the canvas
    translate(width / 2, height);
    branch(200);
}
function branch(len) { // length of branch to draw
    // the maximum/minimum angle of each branch
    // value taken from the slider
    let maxAngle = slider.value();
    // use map() to derive branch stroke weight from current length of branch
    strokeWeight(map(len, 20, 200, 1, 10));
    // semi-randomly mix two colours for each branch segment
    stroke(lerpColor(brown1, brown2, random(0.3, 0.7)));
    // the draw command for a branch
    line(0, 0, 0, -len);
    // immediately translate the drawing context to the top of the line ready for the next branch call
    translate(0, -len);
    // recursion exit condition 
    if (len > 10) {
        // draw leaf and terminate recursion
        if (len < 15) {
            // semi-random leaf colour
            let r = 200 + random(-20, 20);
            let g = 160 + random(-20, 20);
            let b = 190 + random(-20, 20);
            fill(r, g, b, 90);
            // semi-random leaf size
            let size = 200 + random(40);
            noStroke();
            // triangle = simpler leaf
            // triangle(-size/2, 0, size/2, 0, 0, -size);
            // start a leaf shape
            beginShape();
            let radius = random(10, 30);
            // draw a semi-circle
            for (let i = 8; i < 60; i++) {
                // use trig to caculate positions
                let x = radius * cos(i);
                let y = radius * sin(i);
                // add each position to the shape
                vertex(x, y);
            }
            // draw an opposing semi-circle
            for (let i = 60; i > 8; i--) {
                let x = radius * cos(i);
                let y = radius * sin(-i);
                vertex(x, y);
            }
            // join the points to create a continuous shape
            endShape(CLOSE);
        } else {
            // branch 1
            push(); // save the current drawing context
            rotate(random(-maxAngle, maxAngle)); // rotate the whole canvas
            // 0.8 represents the ratio of the original branch size that the new branch size should be
            branch(len * 0.8); // create a new branch
            pop(); // restore the drawing context
            // repeat for each branch
            // branch 2
            push();
            rotate(random(-maxAngle, maxAngle));
            branch(len * 0.6);
            pop();
            // branch 3
            push();
            rotate(random(-maxAngle, maxAngle));
            branch(len * 0.5);
            pop();
            // branch 4
            push();
            rotate(random(-maxAngle, maxAngle));
            branch(len * 0.5);
            pop();
        }

    }
}