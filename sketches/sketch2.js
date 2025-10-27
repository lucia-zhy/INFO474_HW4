// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let myFont;

  p.preload = function () {
    myFont = p.loadFont('fonts/digital-7 (mono).ttf');
  }

  p.setup = function () {
    p.createCanvas(800, 800);
  };

  p.draw = function () {
    p.background(255);
    p.fill(255, 220);
    // create the rectangle shape of the clock
    const rectW = 570;
    const rectH = 420;
    const x = (p.width - rectW) / 2;
    const y = (p.height - rectH) / 2;
    p.rect(x, y, rectW, rectH, 10);
    // show the current time in the rectangle clock
    const h = hour();
    const m = minute();
    const s = second();
    const timeString = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
    p.textFont(myFont);
    p.textSize(120);
    p.fill(0);
    p.textAlign(CENTER, CENTER);

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
