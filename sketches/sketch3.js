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
    p.strokeWeight(2);
    p.fill(255);
    p.rect(x, y, bookW, bookH, 0);

    // middle line of the book
    const midX = x + bookW / 2;
    p.stroke(0);
    p.strokeWeight(1);
    p.line(midX, y + 16, midX, y + bookH - 16);

    // page number at the bottom
    const pageNum = p.minute(); // page change every minute
    p.noStroke();
    p.fill(0);
    p.textFont('Georgia');
    p.textSize(25);

    // when time = 00, highlight the page number
    if (pageNum === 0) {
      p.fill(255, 143, 223); // pink highlight
      p.textSize(18);
      p.text('📖 New Chapter Begins', midX, y + bookH - 55);
      p.textSize(25);
      p.fill(0);
    } else {
      p.fill(0);
    }

    p.text('Page', midX - 45, y + bookH - 25);
    p.text(p.nf(pageNum, 2), midX + 30, y + bookH - 25);

    // chapter number at the top left
    const chapterNum = (p.hour() % 24); // 0–23
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(28);
    p.textFont('Palatino');
    p.text('Chapter ' + p.nf(chapterNum, 2), x + 16, y + 14);
    p.textAlign(p.CENTER, p.CENTER);

    // Dynamics: show seconds as numbers appearing on the two pages
    const s = p.second(); // 0 to 59s
    const leftCount  = Math.min(30, Math.max(0, s));      // 1 to 30
    const rightCount = Math.min(29, Math.max(0, s - 30)); // 31 to 59
    // on the right page, don't show 60; it goes back to 0 next second

    // define grid layout for both pages
    const innerPad = 22, topPad = 56, bottomPad = 70;
    const gridCols = 6, gridRows = 5;

    // left page
    const Lx0 = x + innerPad, Lx1 = midX - innerPad;
    const Ly0 = y + topPad, Ly1 = y + bookH - bottomPad;
    const Lcw = (Lx1 - Lx0) / gridCols, Lch = (Ly1 - Ly0) / gridRows;

    // right page
    const Rx0 = midX + innerPad, Rx1 = x + bookW - innerPad;
    const Ry0 = y + topPad, Ry1 = y + bookH - bottomPad;
    const Rcw = (Rx1 - Rx0) / gridCols, Rch = (Ry1 - Ry0) / gridRows;

    // faint grid lines on both pages (for good look)
    p.stroke(0, 40); p.strokeWeight(0.5);
    for (let c = 1; c < gridCols; c++) {
      p.line(Lx0 + c*Lcw, Ly0, Lx0 + c*Lcw, Ly1);
      p.line(Rx0 + c*Rcw, Ry0, Rx0 + c*Rcw, Ry1);
    }
    for (let r = 1; r < gridRows; r++) {
      p.line(Lx0, Ly0 + r*Lch, Lx1, Ly0 + r*Lch);
      p.line(Rx0, Ry0 + r*Rch, Rx1, Ry0 + r*Rch);
    }

    // numbers on both pages
    p.noStroke();
    p.textFont('Times New Roman');
    p.textSize(20);
    p.fill(255, 0,0);
    p.textSize(Math.min(Lcw, Lch) * 0.35);

    // left page (1...30)
    for (let i = 1; i <= 30; i++) {
      const idx = i - 1, row = Math.floor(idx / gridCols), col = idx % gridCols;
      const cx = Lx0 + col * Lcw + Lcw/2, cy = Ly0 + row * Lch + Lch/2;
      if (i <= leftCount) {
        // highlight the current second number
        p.fill(i === leftCount ? 255 : 0, i === leftCount ? 143 : 0, i === leftCount ? 223 : 0);
        p.text(i.toString(), cx, cy);
      }
    }

    // right page（31...59）
    for (let k = 1; k <= rightCount; k++) {
      const val = 30 + k; // 31..59
      const idx = (val - 31); // 0..28
      const row = Math.floor(idx / gridCols), col = idx % gridCols;
      const cx = Rx0 + col * Rcw + Rcw/2, cy = Ry0 + row * Rch + Rch/2;
      // highlight the current second number
      const isCurrent = (30 + rightCount) === val;
      p.fill(isCurrent ? 255 : 0, isCurrent ? 143 : 0, isCurrent ? 223 : 0);
      p.text(val.toString(), cx, cy);
    }
  };
});
