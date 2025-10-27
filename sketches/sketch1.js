// Instance-mode sketch registered as 'sk1'
registerSketch('sk1', function (p) {
  let horizon;

  p.setup = function () {
    // size to the full window so canvas always matches the viewport
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    horizon = p.height / 2;
  };

  p.draw = function () {
    const shapeHeight = p.mouseY;
    const currentWidth = p.mouseX;
    horizon = p.height / 2;

    if (shapeHeight < horizon) p.background('lightblue');
    else p.background('grey');

    p.fill('orange');
    p.ellipse(p.width / 2, shapeHeight, 100, 100);
    p.textSize(20);
    p.fill('black');
    p.text('Let us play with the sun!', currentWidth / 2, shapeHeight / 2);

    p.fill('sandybrown');
    p.rect(0, horizon, p.width, p.height);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    horizon = p.height / 2;
  };
});

// Lab 1 code:
// let shapeHeight;

// let designWidth = 400;
// let designHeight= 400;
// let horizon ;
// function setup() {
//   createCanvas(windowWidth,windowHeight);
//   horizon =height/2;
// }

// function draw() {

//   //shape follows y-coordinate of mouse
//   shapeHeight = mouseY;
//   currentWidth = mouseX;

//   //light blue background if the shape is above horizon

//   //with if-else statement
//   if (shapeHeight < horizon) {
//     background("lightblue"); // blue if above horizon
    
//   } else {
//     background("pink"); // pink if below horizon
//   }

//   //sun
//   fill("white");
  
//   rect(width/4, shapeHeight, width/2);
//   textSize(20);
//   fill("black");
//   text('Hi! My name is Lucia :)', currentWidth/2, shapeHeight/2);


//   // draw line for horizon
//   stroke('lavender');
//   line(0,horizon,width,horizon);

//   //grass

//   fill("lavender");

//   rect(0, horizon, width, height);

// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   horizon = height / 2; // recalc horizon after resize
// }



