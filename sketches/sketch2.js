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

  // Change ambient color based on hour of the day
  function ambientColorForHour(h) {
    p.colorMode(p.HSB, 360, 100, 100); 
    let c1, c2, t; 

    if (h >= 0 && h < 6) {     
      c1 = p.color(220, 35, 18); 
      c2 = p.color(220, 25, 35);
      t = (h - 0) / 5;
    } else if (h >= 6 && h < 12) { 
      c1 = p.color(210, 20, 60);  
      c2 = p.color(200, 18, 95);
      t = (h - 6) / 5;
    } else if (h >= 12 && h < 18) {  
      c1 = p.color(35, 40, 95); 
      c2 = p.color(25, 60, 80);
      t = (h - 12) / 5;
    } else {                   
      c1 = p.color(220, 25, 50);     
      c2 = p.color(220, 35, 22);
      t = (h - 18) / 5;
    }
    const c = p.lerpColor(c1, c2, t); 
    p.colorMode(p.RGB, 255);                 
    return c;             
  }

  // Choose text color (black/white) based on background brightness
  function textColorFor(bg) {
    const r = p.red(bg), g = p.green(bg), b = p.blue(bg); 
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;  
    return (L > 160) ? p.color(0) : p.color(255);     
  }

  p.draw = function () {
    p.background(255);
    // show the current time in the rectangle clock
    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    const rectColor = ambientColorForHour(h);
    // // ambient background colors by different time ranges
    // let r, g, b;
    // if (h >= 6 && h < 12) { // morning range - sunrise - soft orange/yellow
    //   r = 255; g = 235; b = 210;
    // } else if (h >= 12 && h < 18) { // afternoon range - warm golden tones
    //   r = 255; g = 210; b = 160;
    // } else { // night & midnight — dark blue
    //   r = 50; g = 60; b = 90;
    // }
    // create the rectangle shape + fit the ambient color of the clock
    const rectW = 480;
    const rectH = 330;
    const x = (p.width - rectW) / 2;
    const y = (p.height - rectH) / 2;

    p.noStroke();
    p.fill(rectColor); // fill the rectangle with the chosen color
    p.rect(x, y, rectW, rectH, 10);
    
    const timeString = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    p.textFont(myFont);
    p.textSize(115);
    p.fill(textColorFor(rectColor)); // choose text color based on background brightness automatically
    // if (h >= 6 && h < 18) {
    //   p.fill(0); // black text for day
    // }

    p.push();
    p.translate(p.width / 2 , p.height / 2 - 10);
    p.scale(1, 1.2);
    p.text(timeString, 0, 0);
    p.pop();
  };
});
