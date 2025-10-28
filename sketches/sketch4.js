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

  // Start UI state
  let running = false;
  let startMillis = 0; 

  // Start button parameters  
  const btnW = 150;
  const btnH = 48;
  const btnY = cy + outerR + 56;
  const startBtn = {
    x: cx - btnW / 2,
    y: btnY - btnH / 2,
    w: btnW,
    h: btnH
  };

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

    // Update remaining time if running
    if (running) {
      const elapsed = (p.millis() - startMillis) / 1000;
      remaining = Math.max(0, DURATION - elapsed);
      if (remaining <= 0) {
        running = false;
      }
    }

    // outer circle and inner circle
    p.noFill();
    p.stroke(0);
    p.strokeWeight(8);
    p.circle(cx, cy, outerR * 2);

    // inner circle
    p.strokeWeight(4);
    p.circle(cx, cy, innerR * 2);

    // draw the time circle marks when haven't started yet
    if (!running && remaining === DURATION) {
      const dotR = 10; 
      const dotRadius = (outerR + innerR) / 2;
      const dotX = cx;
      const dotY = cy - dotRadius;
      p.noStroke();
      p.fill(0);
      p.circle(dotX, dotY, dotR * 3);
    }

    // Text display
    p.fill(0);
    p.textSize(30);
    p.textStyle(p.BOLD);
    p.textFont('Georgia');
    p.text('Focus Time 🌱🌲⏰', cx, cy - 60);
    p.textStyle(p.NORMAL);
    p.textSize(120);
    p.text(mmss(remaining), cx, cy + 10);

    // Start button interaction (INTERACTION with mousse)
    const hovering =
      p.mouseX >= startBtn.x && p.mouseX <= startBtn.x + startBtn.w &&
      p.mouseY >= startBtn.y && p.mouseY <= startBtn.y + startBtn.h;

    // button
    p.stroke(0);
    p.fill(hovering ? 240 : 255);
    p.rect(startBtn.x, startBtn.y, startBtn.w, startBtn.h, 14);

    // button words
    p.noStroke();
    p.fill(0);
    p.textSize(20);
    p.text('Start ▶️', startBtn.x + startBtn.w / 2, startBtn.y + startBtn.h / 2);
  };
  // function of start
  p.mousePressed = function () {
    if (p.mouseX >= startBtn.x && p.mouseX <= startBtn.x + startBtn.w &&
      p.mouseY >= startBtn.y && p.mouseY <= startBtn.y + startBtn.h) {
      if (!running && remaining > 0) {
        running = true;
        startMillis = p.millis();
        remaining = DURATION;
      }
    }
  };
});
