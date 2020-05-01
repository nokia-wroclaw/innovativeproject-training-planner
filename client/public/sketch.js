let sketch = function(p) {
  let x = 100;
  let y = 100;
  let cR = 0;
  let cG = 0;
  let cB = 0;

  p.setup = function() {
    p.createCanvas(700, 410);
  };

  p.draw = function() {
    // p.background(0);
    cB = p.millis()%255;
    p.fill(cR, cG, cB);
    p.rect(p.mouseX, p.mouseY, 50, 50);
  };
  p.mouseReleased = function() {
  }
};

let myp5 = new p5(sketch);
