
var a = 10;
var cp, cp2;

function setup() {
    var context = createCanvas(400,400);
    context.parent('context');


    cp = new ControlPanel(this, {name: 'one'});
    cp.create('b1', {type: 'button', x: 30, y: 30, width: 150, height: 30, label: 'My Button'});
    cp.create('c1', {type: 'colorPicker', x: 250, y: 80, width: 100, height: 40, label: 'Colors'});
    cp.create('s1', {type: 'slider', x: 30, y: 120, min: -10, max: 45, label: 'Foo'});
    cp.create('s2', {type: 'slider', x: 30, y: 150, min: 0, max: 1, label: 'Bar'});
    cp.create('r1', {type: 'range', x: 30, y: 200, width: 200, height: 20, min: -2, max: 2, value: {min: -0, max: 2}, label: 'Bar'});
    cp.create('w1', {type: 'toggle', option: 'icon', x: 250, y: 40, rx:15, ry:15, width: 30, height:30, icon: '&#xf079;'});
    cp.create('w2', {type: 'toggle', option: 'circular', x: 300, y: 40, width: 40, height:20});
    cp.create('t1', {type: 'textField', x: 30, y: 70, width: 150, height: 40, label: 'Text Field'});
    cp.create('i1', {type: 'button', option: 'icon', x: 30, y: 250, width: 30, height: 30, icon: '&#xf107;'});
    //cp.change('s1', {y: 120, width: 200, height: 30});
    //cp.change('s2', {y: 220, width: 200, height: 30});

    cp2 = new ControlPanel(this, {top: 340, name: 'two'});
    cp2.create('s1', {type: 'slider', x: 30, y: 100, width: 200, height: 20, min: -10, max: 45, label: 'My Slider'});
    cp2.print('s1');
}

function draw() {
  background(255, frameCount%255,128);
  noStroke();
  fill(255);
  rect(a, 100, 100, 100);

  ///cp.change('s1',{value: abs(sin(frameCount*0.01))*50});

}
