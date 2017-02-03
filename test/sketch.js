
var a = 10;
var cp;

function setup() {
    var context = createCanvas(400,400);
    context.parent('context');
    cp = new ControlPanel(this);
}

function draw() {
  background(255,frameCount%255,128);
  noStroke();
  fill(255);
  rect(a,100,100,100);

  cp.set(sin(frameCount*0.01)*100);
}
