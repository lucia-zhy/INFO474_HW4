// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    // create a rectangle shape as book
    p.background(255);

    const bookW = 600;
    const bookH = 450;
    const x = (p.width - bookW) / 2;
    const y = (p.height - bookH) / 2;

    p.stroke(0);
    p.strokeWeight(3);
    p.fill(255);
    p.rect(x, y, bookW, bookH, 0);
  };
});
