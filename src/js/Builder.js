import Common from './Common.js'

class Builder {

  constructor(theTarget) {
    this.svgns = 'http://www.w3.org/2000/svg';
    this.target = theTarget;
  }

  static svgns() { return 'http://www.w3.org/2000/svg'; }

  init() {
    const attr = {
      id: 'controlpanel',
      style: 'top:20px; left:20px; position:absolute; background:rgba(0,0,0,0.25)',
      width: 300,
      height: 250,
      'font-size': 12,
      'font-family': 'Open Sans',
    }
    return setAttributesFor(createElement('svg'), attr);
  }

  create(type) { return new Controller(this.target, type); }

}

const getTemplateFor = {
  root: (c) => {
    return c;
  },
  slider: (c) => {
    c.appendChild(c.bg = rect({width:200, height:20}));
    c.appendChild(c.fg = rect({width:100, height:20}));
    c.appendChild(c.label = label({x:210,y:10,text:'Slider'}));
    return c;
  },
  button: (c) => {
    c.appendChild(c.bg = rect({width:80, height:30}));
    c.appendChild(c.label = label({x:40,y:15,text:'Button'}));
    return c;
  }

};

const createElement = (t) => { return document.createElementNS(Builder.svgns(), t); }

const setAttributesFor = (e,o) => {
    for(let key of Object.keys(o)) {
      e.setAttribute(key, o[key]);
    }
    return e;
}

const rect = (theParams) => {
  let attr = {
    style: 'fill: rgba(0,116,216,1.0)',
    width: Common.i(theParams.width, 100),
    height: Common.i(theParams.height, 100),
    rx: 0,
    ry: 0
  };
  return setAttributesFor(createElement('rect'), attr);
}

const label = (theParams) => {
  const attr = {
    style: `fill: rgba(255,255,255,1.0)`,
    x: Common.i(theParams.x, 0),
    y: Common.i(theParams.y, 0),
    'alignment-baseline': 'central',
    'text-anchor': 'middle',
    'font-size': 'inherit'
  }
  const label = createElement('text');
  label.innerHTML = Common.s(theParams.text, "?");
  return setAttributesFor(label, attr);
}

const circle = (theParams) => {}

const chart = (theParams) => {
  const chart = createElement('svg');
  const line = createElement('polyline');
  return chart;
}

class Controller {

    constructor(theTarget, theType) {
      this.elem = createElement('g');
      this.target = theTarget;
      this.type = theType;
    }

    attr(theAttr) {
      for (let key of Object.keys(theAttr)) {
        this.elem.setAttribute(key, theAttr[key]);
      }
      return this;
    }

    event(theEvents) {
      for(let key of Object.keys(theEvents)) {
        this.target.addEventListener(this.elem, key, theEvents[key]);
      }
      return this;
    }

    parent(theParent) { theParent.appendChild(this.elem); return this; }

    build() { return getTemplateFor[this.type](this.elem); }

}

export default Builder;
