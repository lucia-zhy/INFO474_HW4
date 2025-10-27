// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
  };
  p.draw = function () {
    p.background(255);
    p.fill(255, 220);
    let rectW = 570;
    let rectH = 420;
    let x = (width - rectW) / 2;
    let y = (height - rectH) / 2;
    p.rect(x, y, rectW, rectH, 10);
  };
  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});
