// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let myFont;

  p.preload = function () {
    myFont = p.loadFont('fonts/digital-7-mono.ttf');
  }

  p.setup = function () {
    p.createCanvas(800, 800);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(255);
    // show the current time in the rectangle clock
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    // ambient background colors by different time ranges
    let r, g, b;
    if (h >= 6 && h < 12) { // morning range - sunrise - soft orange/yellow
      r = 255; g = 235; b = 210;
    } else if (h >= 12 && h < 18) { // afternoon range - warm golden tones
      r = 255; g = 210; b = 160;
    } else { // night & midnight — dark blue
      r = 50; g = 60; b = 90;
    }
    // create the rectangle shape + fit the ambient color of the clock
    const rectW = 480;
    const rectH = 330;
    const x = (p.width - rectW) / 2;
    const y = (p.height - rectH) / 2;

    p.noStroke();
    p.fill(r, g, b); // fill the rectangle with the chosen color
    p.rect(x, y, rectW, rectH, 10);
    
    const timeString = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    p.textFont(myFont);
    p.textSize(115);
    p.fill(255); // white text for night
    if (h >= 6 && h < 18) {
      p.fill(0); // black text for day
    }

    p.push();
    p.translate(p.width / 2 - 15, p.height / 2 - 15);
    p.scale(1, 1.2);
    p.text(timeString, 0, 0);
    p.pop();
  };
});
