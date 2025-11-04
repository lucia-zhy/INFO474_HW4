// Instance-mode sketch for tab 5, HW5
registerSketch('sk5', function (p) {
  //Instagram social media image size
  const W = 1080;
  const H = 1350;

  // tear dimensions and position
  const cx = W / 2;
  const topY = 230;  
  const tearW = W * 0.56;  
  const tearH = H * 0.6; 

  // define people's favorite music genres and their average depression levels
  const GENRES = [
    { name:'Lo-fi', avg: 6.6}, { name:'Hip Hop', avg: 5.8},
    { name:'EDM', avg: 5.24},   { name:'Rock', avg: 5.24},
    { name:'Rap', avg: 4.0},   { name:'R&B', avg: 3.83},
    { name:'Latin', avg: 3.0},   { name:'Gospel', avg: 2.67},
  ].sort((a, b) => b.avg - a.avg); // sort descending by average depression levels

  // positions inside the tear. Largest avg at top, smallest at bottom
  const POS = {
    "Lo-fi":   { u: 0.46, v: 0.2 },  
    "Hip Hop": { u: 0.7, v: 0.33 }, 
    "Rock":    { u: 0.27, v: 0.38 },
    "EDM":     { u: 0.51, v: 0.5 }, 
    "Rap":     { u: 0.2, v: 0.58 }, 
    "R&B":     { u: 0.72, v: 0.65 }, 
    "Latin":   { u: 0.4, v: 0.7 }, 
    "Gospel":  { u: 0.59, v: 0.82 } 
  };

  // color scale: light for low, dark for high
  let COLOR_LIGHT, COLOR_DARK;
  const getBubbleColor = (avg, minAvg, maxAvg) => {
    const t = p.constrain((avg - minAvg) / (maxAvg - minAvg || 1), 0, 1);
    // higher -> darker: lerp from LIGHT to DARK using t
    return p.lerpColor(COLOR_LIGHT, COLOR_DARK, t);
  };

  // choose text color for contrast
  const getLabelColor = (avg, minAvg, maxAvg) => {
    const t = p.constrain((avg - minAvg) / (maxAvg - minAvg || 1), 0, 1);
    return (t >= 0.5) ? p.color(255) : p.color(15, 37, 64); // white or deep blue
  };

  let bubbles = [];
  let minAvg, maxAvg;
  let hovered = null; // interactivity; currently hovered bubble

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont('Georgia');
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();

    COLOR_LIGHT = p.color(198, 214, 232); // light blue
    COLOR_DARK  = p.color(28, 64, 103); // dark blue
    minAvg = Math.min(...GENRES.map(g => g.avg));
    maxAvg = Math.max(...GENRES.map(g => g.avg));

    const minR = 45;
    const maxR = 105;
    const minA = Math.PI * minR * minR;
    const maxA = Math.PI * maxR * maxR;
    bubbles = GENRES.map((g) => {
      const A = p.map(g.avg, 0, 10, minA, maxA);
      const r = Math.sqrt(A / Math.PI);
      const { u, v } = POS[g.name];
      return {
        x: (cx - tearW / 2) + u * tearW,
        y: topY + v * tearH,
        r,
        genre: g
      };
    });
  };

  p.draw = function () {
    p.background(250);
    p.noFill();
    p.stroke(28, 64, 103);
    p.strokeWeight(1);
    drawTear(cx, topY, tearW, tearH);

    // detect hovered bubble
    hovered = null;
    for (const b of bubbles) {
      if (p.dist(p.mouseX, p.mouseY, b.x, b.y) <= b.r) {
        hovered = b;
      }
    }

    // assign colors to bubbles based on average depression levels
    for (const b of bubbles) {
      const fillCol = getBubbleColor(b.genre.avg, minAvg, maxAvg);
      const labelCol = getLabelColor(b.genre.avg, minAvg, maxAvg);
      p.noStroke();
      p.fill(fillCol);
      p.circle(b.x, b.y, b.r * 2);

      // if hovered, draw highlight ring
      if (hovered === b) {
        p.stroke(255, 220); 
        p.strokeWeight(6);
        p.noFill(); 
        p.circle(b.x, b.y, b.r * 2 + 6);
        p.stroke(0, 80); 
        p.strokeWeight(1.5);
        p.circle(b.x, b.y, b.r * 2 + 6);
      }

      // bubble labels
      p.push();
      p.fill(labelCol);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(26);
      p.text(b.genre.name, b.x, b.y);
      p.pop();
    }

    if (hovered) {
      p.cursor('pointer');
      drawTooltip(hovered);
    } else {
      p.cursor('default');
    }

    drawLegend();

    // Add caption text
    p.fill(15, 37, 64);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(32);
    p.text("Relationship between Music Genres & Average Depression Levels", W / 2, 80);

    p.textSize(25);
    p.text("higher levels score = more depressed", W / 2, 145);

    p.push();
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Data Source: Music & Mental Health Survey Results (Kaggle)" + "\n Author: Lucia Zou",
      W - 400, 200, 420, 400);
    p.pop();
  }

  // helper method to draw tooltip for hovered bubble, express the average levels
  function drawTooltip(b) {
    const title = b.genre.name;
    const val = `Avg Depression Levels: ${b.genre.avg.toFixed(2)}`;

    // tooltip position
    let tx = b.x + b.r + 14;
    let ty = b.y - b.r - 10;
    const pad = 10;

    p.textAlign(p.LEFT, p.TOP);
    p.textSize(18);

    const w = Math.max(p.textWidth(title), p.textWidth(val)) + pad * 2;
    const h = 18*2 + pad * 3;

    // revise position if overflowing canvas
    if (tx + w > W - 16) tx = W - 16 - w;
    if (ty < 16) ty = 16;

    // draw tooltip box
    p.noStroke();
    p.fill(0, 20); 
    p.rect(tx + 2, ty + 3, w, h, 8);
    p.fill(255);   
    p.rect(tx, ty, w, h, 8);
    p.fill(20, 32, 54);
    p.text(title, tx + pad, ty + pad);
    p.text(val, tx + pad, ty + pad + 22);
  }

  // helper method to draw the legend for color scale
  function drawLegend() {
    const barW = 560;
    const barH = 22;
    const x = (W - barW) / 2;
    //const y = H - 120;
    const gap = 56; // gap between tear bottom and legend top
    const tearBottom = topY + tearH;
    const y = Math.min(H - 140, tearBottom + gap); // close to tear bottom, but not too low

    // color strip (left = light blue, right = dark blue)
    for (let i = 0; i < barW; i++) {
      const t = i / (barW - 1);
      const c = p.lerpColor(COLOR_LIGHT, COLOR_DARK, t);
      p.stroke(c);
      p.line(x + i, y, x + i, y + barH);
    }

    // min/max labels for the average depression levels' color scale
    p.noStroke();
    p.fill(30);
    p.textSize(22);
    p.textAlign(p.CENTER, p.TOP);
    p.text(minAvg.toFixed(2), x + 90, y + barH + 8);
    p.text(maxAvg.toFixed(2), x + barW - 90, y + barH + 8);

    // axis caption for the average depression levels' color scale
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text("Lower  <--- Average Depression Levels (0 - 10) --->  Higher", x + barW / 2, y - 10);
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
