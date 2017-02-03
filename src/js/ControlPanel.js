import Common from './Common.js'
import Builder from './Builder.js'

class ControlPanel {

  constructor(theApp) {

    this.app = theApp;
    this.svgns = 'http://www.w3.org/2000/svg';
    this.dragTarget = undefined;
    this.builder = new Builder(this);
    this.params = {
      font: {
        size: 12
      },
      color: {
        bg:      'rgba(0,45,90,1.0)',
        fg:      'rgba(0,116,216,1.0)',
        active:  'rgba(0,170,255,1.0)',
        txt:     'rgba(255,255,255,1.0)'
      }
    };

    this.init();
  }

  set(x) {}

  create(theTarget, theParams) {
    console.log("create", theTarget, theParams);
  }

  change(theTarget, theParams) {
    console.log("change", theTarget, theParams);
  }


  init() {
    const me = this;
    const build = this.builder;
    const wheel = () => {return "onwheel" in document ? "wheel" : "mousewheel"; };


    /* global events */
    this.addEventListener(document, 'mousemove', (ev) => { this.dragTarget !== undefined ? this.drag(ev) : console.log("moving mouse"); });
    this.addEventListener(document, 'mouseup', (ev) => { this.stopDrag(); });
    this.addEventListener(window, 'resize', () => {} );

    /* initialize panel */
    const root = build.init();
    document.body.appendChild(root);
    this.addEventListener(root, wheel(), (ev) => { ev.preventDefault()});


    var fn1 = (ev) => { console.log(ev); this.app['a'] = 300; };

    var button = build.create('button')
              .attr({width:80, height:30, transform:'translate(30,40) rotate(0)'})
              .event({'click': fn1 })
              .event({'mouseenter': () => {button.bg.setAttribute('style',`fill: ${this.params.color.active}`)}})
              .event({'mouseleave': () => {button.bg.setAttribute('style',`fill: ${this.params.color.fg}`)}})
              .parent(root)
              .build();


    var slider = document.createElementNS(this.svgns, 'g');
    slider.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#g1")
    slider.setAttribute('style', 'fill: rgba(0,190,180, 1.0)');
    slider.setAttribute('width', 200);
    slider.setAttribute('height', 20);
    slider.setAttribute('transform', 'translate(30,100) rotate(0)');
    slider.setAttribute('overflow', 'visible');



    var g0 = document.createElementNS(this.svgns, 'rect');
    g0.setAttribute('style', `fill: ${this.params.color.bg}`);
    g0.setAttribute('width', 200);
    g0.setAttribute('height', 20);

    slider.bg = g0;

    var g1 = document.createElementNS(this.svgns, 'rect');
    g1.setAttribute('style', `fill: ${this.params.color.fg}`);
    g1.setAttribute('width', 100);
    g1.setAttribute('height', 20);
    g1.setAttribute('class','slider');

    var g2 = document.createElementNS(this.svgns, 'text');
    g2.setAttribute('style', `fill: ${this.params.color.txt}`);
    g2.setAttribute('x', parseInt(g0.getAttribute('width'))+4);
    g2.setAttribute('y', 10);
    g2.setAttribute('alignment-baseline', 'central');
    g2.setAttribute('text-anchor', 'start');
    g2.setAttribute('font-size', 'inherit');
    g2.innerHTML = "Slider";

    root.appendChild(slider);
    slider.appendChild(g0);
    slider.appendChild(g1);
    slider.appendChild(g2);

    slider.drag = (ev) => {
      var val = Common.constrainValue(g1.width.baseVal.value + ev.movementX,0,200)
      g1.setAttribute('width', val);
      console.log(val);
      me.app.a = val;
    };

    slider.scroll = (ev) => {
      var val = Common.constrainValue(g1.width.baseVal.value + ev.deltaY,0,200)
      g1.setAttribute('width', val);
      me.app.a = val;
    }

    slider.down = (ev) => {
      var w = Common.constrainValue(ev.clientX - slider.getBoundingClientRect().left,0,200);
      g1.setAttribute('width', w);
      me.app.a = w;
    }

    this.addEventListener(slider, 'mousedown',  (ev) => { slider.down(ev); this.startDrag(slider.drag); });
    this.addEventListener(slider, 'mousedown',  (ev) => { });
    this.addEventListener(slider, 'mouseenter', (ev) => { g1.style.fill = `${this.params.color.active}`; });
    this.addEventListener(slider, 'mouseleave', (ev) => { g1.style.fill = `${this.params.color.fg}`; });
    this.addEventListener(slider, wheel(),        (ev) => { ev.preventDefault(); slider.scroll(ev); console.log(ev.wheelDeltaY, ev.deltaY);g1.style.fill = 'rgba(0,100,255, 1.0)'; });



    var minmax = document.createElementNS(this.svgns, 'circle');
    minmax.value = false;
    minmax.setAttribute('style', `fill: rgba(255,255,255,0.5)`);
    minmax.setAttribute('cx', 12);
    minmax.setAttribute('cy', 12);
    minmax.setAttribute('r', 8);

    this.addEventListener(minmax, 'click',  (ev) => { minmax.value = !minmax.value; root.setAttribute('width', minmax.value === true ? 48:300); root.setAttribute('height', minmax.value === true ? 24:450); });
    root.appendChild(minmax);

  }


  stopDrag() {
    this.dragTarget = undefined;
  }

  drag(ev) {
    this.dragTarget(ev);
  }

  startDrag(target) {
    this.dragTarget = target;
  }

  addEventListener(element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, callback);
    }
  }
}

export default ControlPanel;
