// Instance-mode sketch for tab 5, HW5
registerSketch('sk5', function (p) {
  const W = 1080;
  const H = 1350;

  p.setup = function () {
    p.createCanvas(W, H); //Instagram social media image size
  };

  p.draw = function () {
    p.background(250);
    const cx = W / 2;
    const topY = 190;  
    const tearW = W * 0.56;  
    const tearH = H * 0.6; 
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    drawTear(cx, topY, tearW, tearH);
  }

  // helper method to create tear shape
  function drawTear(cx, topY, w, h) {
    p.beginShape();
    p.vertex(cx, topY);
    // left side curve
    p.bezierVertex(
      cx - w * 0.4, topY + h * 0.25,
      cx - w / 2,    topY + h * 0.45,
      cx - w / 2 + w * 0.08, topY + h * 0.70
    );
    // bottom curve
    p.bezierVertex(
      cx - w / 2 + w * 0.20, topY + h,          
      cx + w / 2 - w * 0.20, topY + h,          
      cx + w / 2 - w * 0.08, topY + h * 0.70  
    );
    // right side curve
    p.bezierVertex(
      cx + w / 2,   topY + h * 0.45,
      cx + w * 0.4, topY + h * 0.25,
      cx, topY
    );
    p.endShape(p.CLOSE);
  }
});
