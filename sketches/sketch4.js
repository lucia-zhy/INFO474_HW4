// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  // canvas dimensions and circle parameters
  const W = 800, H = 800;
  const cx = W / 2; // circle center x
  const cy = H / 2; // circle center y
  const outerR = 280; // outer circle radius
  const innerR = 220; // inner circle radius

  p.setup = function () {
    p.createCanvas(W, H);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background(255);
    // outer circle and inner circle
    p.noFill();
    p.stroke(0);
    p.strokeWeight(8);
    p.circle(cx, cy, outerR * 2);

    // inner circle
    p.strokeWeight(4);
    p.circle(cx, cy, innerR * 2);
  };
});
