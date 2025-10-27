// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let myFont;

  p.preload = function () {
    myFont = p.loadFont('fonts/digital-7-mono.ttf');
  }

  p.setup = function () {
    p.createCanvas(800, 800);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(255);
    // create the rectangle shape of the clock
    p.fill(255, 220);
    const rectW = 570;
    const rectH = 420;
    const x = (p.width - rectW) / 2;
    const y = (p.height - rectH) / 2;
    p.rect(x, y, rectW, rectH, 10);
    // show the current time in the rectangle clock
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    const timeString = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);
    p.textFont(myFont);
    p.textSize(115);
    p.fill(0);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.scale(1, 1.2);
    p.text(timeString, 0, 0);
    p.pop();
  };

  // p.windowResized = function () { 
  //   p.resizeCanvas(p.windowWidth, p.windowHeight); 
  // };
});
