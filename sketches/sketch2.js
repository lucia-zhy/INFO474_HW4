// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
  };
  p.draw = function () {
    p.background(255);
    const w = p.width - 48*2;
    const h = p.height - 48*2;
    p.fill(255, 220);
    p.rect(48, 48, w, h, 28);
  };
  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});
