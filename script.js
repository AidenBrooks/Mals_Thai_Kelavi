let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // --- Mouse events ---
    document.addEventListener("mousemove", (e) => {
      this.handleMove(e.clientX, e.clientY, paper);
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
      if (e.button === 2) this.rotating = true;
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // --- Touch events ---
    paper.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.prevX = this.startX;
        this.prevY = this.startY;
      }
    });

    paper.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (this.holdingPaper && e.touches.length === 1) {
        this.handleMove(e.touches[0].clientX, e.touches[0].clientY, paper);
      }
    }, { passive: false });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }

  handleMove(clientX, clientY, paper) {
    if (!this.holdingPaper) return;

    this.velX = clientX - this.prevX;
    this.velY = clientY - this.prevY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevX = clientX;
    this.prevY = clientY;

    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
