// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
  };
  p.draw = function () {
    p.background(255);
    p.fill(255, 220);
    // create the rectangle shape of the clock
    let rectW = 570;
    let rectH = 420;
    let x = (width - rectW) / 2;
    let y = (height - rectH) / 2;
    p.rect(x, y, rectW, rectH, 10);
    // show the current time in the rectangle clock
    let h = hour();
    let m = minute();
    let s = second();
    let timeString = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
    p.textSize(120);
    p.fill(0);
    p.textAlign(CENTER, CENTER);
    p.text(timeString, width / 2, height / 2);
  };
  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});
