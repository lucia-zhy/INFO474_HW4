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
    p.text('Chapter ' + p.nf(chapterNum, 2), x + 16, y + 14);
    p.textAlign(p.CENTER, p.CENTER);

  };
});
