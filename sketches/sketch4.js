// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  // canvas dimensions and circle parameters
  const W = 800, H = 800;
  const cx = W / 2; // circle center x
  const cy = H / 2; // circle center y
  const outerR = 280; // outer circle radius
  const innerR = 220; // inner circle radius

  // Define the focus time
  const FOCUS_MIN = 25; 
  const DURATION = FOCUS_MIN * 60; 
  let remaining = DURATION;

  // helper function to format time as mm:ss
  function mmss(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return p.nf(m, 2) + ':' + p.nf(s, 2);
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.textAlign(p.CENTER, p.CENTER);
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

    // draw the time circle marks when haven't started yet
    const dotR = 10; 
    const dotRadius = (outerR + innerR) / 2;
    const dotX = cx;
    const dotY = cy - dotRadius;
    p.noStroke();
    p.fill(0);
    p.circle(dotX, dotY, dotR * 3);

    // Text display
    p.fill(0);
    p.textSize(30);
    p.textStyle(p.BOLD);
    p.textFont('Georgia');
    p.text('Focus Time 🌱🌲⏰', cx, cy - 60);
    p.textStyle(p.NORMAL);
    p.textSize(120);
    p.text(mmss(remaining), cx, cy + 10);
  };
});
