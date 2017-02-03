import Common from './Common.js'

class Builder {

  constructor(theTarget) {
    this.svgns = 'http://www.w3.org/2000/svg';
    this.target = theTarget;
  }

  static svgns() { return 'http://www.w3.org/2000/svg'; }

  init() {
    /* TODO build root here for now but move it out later */
    var root = document.createElementNS(this.svgns,'svg');
    root.setAttribute('id','controlpanel');
    root.setAttribute('style', 'top:20px; left:20px; position:absolute; background:rgba(0,0,0,0.25)');
    root.setAttribute('width',300);
    root.setAttribute('height',250);
    root.setAttribute('font-size', 12);
    root.setAttribute('font-family', "Open Sans" );
    return root;
  }

  create(type) { return new Controller(this.target, type); }

}

class Controller {

    constructor(theTarget, theType) {
      this.controller = document.createElementNS(Builder.svgns(),'g');
      this.target = theTarget;
      this.type = theType;
    }

    attr(theAttr) {
      for (var key of Object.keys(theAttr)) {
        this.controller.setAttribute(key, theAttr[key]);
      }
      return this;
    }

    event(theEvents) {
      for(var key of Object.keys(theEvents)) {
        this.target.addEventListener(this.controller, key, theEvents[key]);
        console.log(key, theEvents[key]);
      }
      return this;
    }

    parent(theParent) {
      theParent.appendChild(this.controller);
      return this;
    }

    build() {
      /* TODO instead of switch-case, use an Object; key=type and value=build-function */
      switch(this.type) {
        case('button'):
          this.controller.appendChild(this.controller.bg = this.rect({width:80, height:30}));
          this.controller.appendChild(this.controller.label = this.label({x:40,y:15,text:'Button'}));
          break;
        case('slider'):
          this.controller.appendChild(this.controller.bg = this.rect({width:200, height:20}));
          this.controller.appendChild(this.controller.fg = this.rect({width:100, height:20}));
          this.controller.appendChild(this.controller.label = this.label({x:210,y:10,text:'Slider'}));
          break;
        case('toggle'):
          break;
        case('knob'):
          break;
        default:
          break;
      }
      return this.controller;
    }

    rect(theParams) {
      const r = document.createElementNS(Builder.svgns(), 'rect');
      r.setAttribute('style', 'fill: rgba(0,116,216,1.0)');
      r.setAttribute('width', Common.i(theParams.width, 100));
      r.setAttribute('height', Common.i(theParams.height, 100));
      r.setAttribute('rx', 0);
      r.setAttribute('ry', 0);
      return r;
    }

    label(theParams) {
      const label = document.createElementNS(Builder.svgns(), 'text');
      label.setAttribute('style', `fill: rgba(255,255,255,1.0)`);
      label.setAttribute('x', Common.i(theParams.x, 0));
      label.setAttribute('y', Common.i(theParams.y,0));
      label.setAttribute('alignment-baseline', 'central');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', 'inherit');
      label.innerHTML = Common.s(theParams.text, "?");
      return label;
    }

    circle(theParams) {}

    chart(theParams) {
      const chart = document.createElementNS(Builder.svgns(),'svg');
      const line = document.createElementNS(Builder.svgns(), 'polyline');
      return chart;
    }

}

export default Builder;
