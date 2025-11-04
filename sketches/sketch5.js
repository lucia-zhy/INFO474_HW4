// Instance-mode sketch for tab 5, HW5
registerSketch('sk5', function (p) {
  //Instagram social media image size
  const W = 1080;
  const H = 1350;

  // tear dimensions and position
  const cx = W / 2;
  const topY = 190;  
  const tearW = W * 0.56;  
  const tearH = H * 0.6; 

  // define people's favorite music genres and their average depression levels
  const GENRES = [
    { name:'Lo-fi', avg: 6.6}, { name:'Hip Hop', avg: 5.8},
    { name:'EDM', avg: 5.24},   { name:'Rock', avg: 5.24},
    { name:'Rap', avg: 4.0},   { name:'R&B', avg: 3.83},
    { name:'Latin', avg: 3.0},   { name:'Gospel', avg: 2.67},
  ];

  const layout = [
    {u:.5,v:.18},{u:.35,v:.28},{u:.65,v:.28},
    {u:.27,v:.45},{u:.73,v:.45},
    {u:.38,v:.63},{u:.62,v:.63},{u:.5,v:.78}
  ];

  let bubbles = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont('Georgia');
    const minR = 60;
    const maxR = 120;
    bubbles = GENRES.map((g, i) => {
      const r = p.map(g.avg, 0, 10, minR, maxR);
      const u = layout[i].u, v = layout[i].v;
      return {
        x: (cx - tearW/2) + u * tearW,
        y:  topY + v * tearH,
        r,
        genre: g
      };
    });
  };

  p.draw = function () {
    p.background(250);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    drawTear(cx, topY, tearW, tearH);
    for (const b of bubbles) {
      p.noStroke(); 
      p.fill(0);
      p.circle(b.x, b.y, b.r * 2);
      p.fill(255); 
      p.textAlign(p.CENTER, p.CENTER);
      p.text(b.genre.name, b.x, b.y);
    }
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
