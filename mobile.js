class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  initialAngle = 0;

  init(paper) {
    paper.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        // single finger drag
        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      } else if (e.touches.length === 2) {
        // two-finger rotation
        this.rotating = true;
        this.initialAngle = this.getAngle(e.touches);
      }
    });

    paper.addEventListener("touchmove", (e) => {
      e.preventDefault();

      if (this.rotating && e.touches.length === 2) {
        // Handle rotation
        const angle = this.getAngle(e.touches);
        this.rotation += angle - this.initialAngle;
        this.initialAngle = angle;
      } else if (this.holdingPaper && e.touches.length === 1) {
        // Handle dragging
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        this.velX = touchX - this.prevTouchX;
        this.velY = touchY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevTouchX = touchX;
        this.prevTouchY = touchY;
      }

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("touchend", (e) => {
      if (e.touches.length === 0) {
        this.holdingPaper = false;
        this.rotating = false;
      }
    });
  }

  getAngle(touches) {
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }
}
