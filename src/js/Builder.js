import Common from './Common.js'

/**
  * @classdesc
  */
class Builder {

  /**
    * @constructor
    */
  constructor(theTarget) {
    this.svgns = 'http://www.w3.org/2000/svg';
    this.target = theTarget;
  }


  /**
    * @static
    * @desc returns the svg namespace used in this project
    * @returns {String} svg name space
    */
  static svgns() { return 'http://www.w3.org/2000/svg'; }


  /**
    * @desc initializes the Builder and creates the root element
    * @returns {Object} root element
    */
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


  /**
    * @desc creates a new controller based on type and parameters
    * @param {String} theType the type of controller to be created
    * @returns {Object} root element
    */
  create(theType) { return new Controller(this.target, theType); }

}


/**
  * @desc this object contains functions to create svg elements
  */
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


/**
  * @desc helper function to standardize creating svg elements
  * @param {String} t  the svg type
  * @returns {Object} svg element
  */
const createElement = (t) => { return document.createElementNS(Builder.svgns(), t); }


/**
  * @desc helper function to set attributes for an svg element
  * @param {Object} e  svg element
  * @param {Object} o  object with attributes
  * @returns {Object} e svg element with attributes added
  */
const setAttributesFor = (e,o) => {
    for(let key of Object.keys(o)) {
      e.setAttribute(key, o[key]);
    }
    return e;
}


/**
  * @desc helper to create a svg rectangle
  * @param {Object} theParams  the parameters to be used to style the rectangle
  * @returns {Object} _ svg rect with attributes added
  */
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

/**
  * @desc helper to create a svg text element
  * @param {Object} theParams  the parameters to be used to style a text label
  * @returns {Object} _ svg text with attributes added
  */
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

/* TODO implement circle */
const circle = (theParams) => {}

/* TODO implement chart */
const chart = (theParams) => {
  const chart = createElement('svg');
  const line = createElement('polyline');
  return chart;
}

/**
  * @class
  * @classdesc
  */
class Controller {

  /**
    * @constructor
    * @desc creates a Controller object used to build a controller
    * @param {Object} theTarget a references to the controlpanel
    * @param {String} theType which type of controller will be created
    */
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
