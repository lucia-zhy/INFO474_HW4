// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
  };
  p.draw = function () {
    p.background(255);
    p.fill(100, 150, 240);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. A', p.width / 2, p.height / 2);
  };
  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});
