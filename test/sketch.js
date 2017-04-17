
var a = 10;
var c = [255,0,0,255];
var cp, cp2;
var t = true;

function setup() {
    var context = createCanvas(600,400);
    context.parent('context');

    cp = new ControlPanel(this, {name: 'one'});
    cp.create('b1', {type: 'Button', x: 10, y: 30, width: 150, height: 30, label: 'My Button'});
    cp.create('c', {type: 'ColorPicker', x: 50, y: 80, width: 200, height: 30, label: 'Colors'});
    cp.create('a', {type: 'Slider', x: 10, y: 120, min: -10, max: 450, label: 'Foo'});
    // cp.create('chart', {type: 'Chart', x: 20, y: 20, width: 200, height: 100, label: 'Chart'});
    // cp.create('s2', {type: 'Slider', x: 10, y: 150, min: 0, max: 1, label: 'Bar'});
    cp.create('r1', {type: 'Range', x: 10, y: 200, width: 200, height: 20, min: -2, max: 2, value: {min: -0, max: 1}, label: 'Bar'});
    // cp.create('w1', {type: 'Toggle', option: 'icon', x: 250, y: 40, rx:15, ry:15, width: 30, height:30, icon: '&#xf079;'});
    cp.create('t', {type: 'Toggle', option: 'circular', x: 300, y: 40, width: 40, height:20});
    // cp.create('t1', {type: 'TextField', x: 10, y: 70, width: 150, height: 40, label: 'Text Field'});
    // cp.create('i1', {type: 'Button', option: 'icon', x: 10, y: 250, width: 30, height: 30, icon: '&#xf107;'});
    // cp.change('s1', {y: 120, width: 200, height: 30});
    // cp.change('s2', {y: 220, width: 200, height: 30});

    cp2 = new ControlPanel(this, {top: 340, name: 'two'});
    cp2.create('s1', {type: 'Slider', x: 30, y: 100, width: 200, height: 20, min: -10, max: 45, label: 'My Slider'});
    // cp2.print('s1');

}

function draw() {
  background(255, frameCount%255,128);
  noStroke();
  fill(c);
  var s = t ? 200: 100;
  rect(a, 100, s, s);
  ///cp.change('s1',{value: abs(sin(frameCount*0.01))*50});
}

function controlEvent(theEvent) {
  console.log('got an event:',theEvent);
}
