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
    sec = Math.max(0, Math.floor(sec)); 
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return p.nf(m, 2) + ':' + p.nf(s, 2);
  }

  p.setup = function () {
    p.createCanvas(W, H);
    p.textAlign(p.CENTER, p.CENTER);
    p.pixelDensity(window.devicePixelRatio || 1);
    p.angleMode(p.DEGREES);
    p.textFont('Georgia'); 
  };

  p.draw = function () {
    p.background(255);

    // Update remaining time if running
    let elapsedSecSmooth = 0; 
    if (running) {
      elapsedSecSmooth = (p.millis() - startMillis) / 1000; 
      const elapsedSecInt = Math.floor(elapsedSecSmooth);
      remaining = Math.max(0, DURATION - elapsedSecInt);
      if (remaining <= 0) running = false;
    } else {
      elapsedSecSmooth = DURATION - remaining;
    }

    // process path
    const progress = p.constrain(elapsedSecSmooth / DURATION, 0, 1); 
    const midR = (outerR + innerR) / 2;                        
    const ringDia = midR * 2;                
    const ringThickness = (outerR - innerR) - 2;

    // outer circle and inner circle
    p.noFill();
    p.stroke(0);
    p.strokeWeight(8);
    p.circle(cx, cy, outerR * 2);

    // inner circle
    p.strokeWeight(4);
    p.circle(cx, cy, innerR * 2);

    // process ring
    p.noFill();
    p.strokeCap(p.ROUND);
    p.stroke(230); 
    p.strokeWeight(ringThickness);  
    p.arc(cx, cy, ringDia, ringDia, -90, 270);

    // already moved part of the ring
    const startAng = -90;  
    const endAng   = startAng + 360 * progress;
    if (progress > 0) {
      p.stroke(0); 
      p.arc(cx, cy, ringDia, ringDia, startAng, endAng);
    }

    // moving dot
    const angle = endAng;  
    const dotX = cx + midR * p.cos(angle); 
    const dotY = cy + midR * p.sin(angle);   
    p.noStroke();
    p.fill(0);
    p.circle(dotX, dotY, 30);

    // Text display
    p.fill(0);
    p.textSize(30);
    p.textStyle(p.BOLD);
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
