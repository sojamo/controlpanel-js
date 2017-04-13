import Common              from './Common.js'
import AHelper             from './AHelper.js'

import Button              from './controllers/Button.js'
import ColorPicker         from './controllers/ColorPicker.js'
import Range               from './controllers/Range.js'
import Slider              from './controllers/Slider.js'
import TextField           from './controllers/TextField.js'
import Toggle              from './controllers/Toggle.js'

/**
  * @classdesc
  */
class Builder extends AHelper {

  constructor(theBase) {
    super(theBase);
  }

  /**
    * @static
    * @desc returns the svg namespace used in this project
    * @returns {String} svg name space
    */
  static svgns() { return 'http://www.w3.org/2000/svg'; }

  /**
    * @desc initializes the Builder and creates the root element
    * @param {Object} theParams the initial parameters passed on from the ControlPanel
    * @returns {Object} root element
    */
  init(theParams) {
    // const {top=0, left=0, name='?', position='absolute', background='rgba(0,0,0,0.25)'} = theParams;
    const {name='?', background='rgba(0,0,0,0.2)'} = theParams;

    const defaultAttributes = {id: 'cp5-'+name, class: 'cp5', style: {background}};

    const root = setAttributesFor(createElement('svg'), Common.merge(defaultAttributes, theParams));

    buildController('button', (theController, theParams) => {Button.update(theController, theParams)});
    buildController('colorPicker', (theController, theParams) => {ColorPicker.update(theController, theParams)});
    buildController('range', (theController, theParams) => {Range.update(theController, theParams)});
    buildController('slider', (theController, theParams) => {Slider.update(theController, theParams)});
    buildController('textField', (theController, theParams) => {TextField.update(theController, theParams)});
    buildController('toggle', (theController, theParams) => {Toggle.update(theController, theParams)});
    buildController('chart', (theController, theParams) => {Chart.update(theController, theParams)});
    return root;
  }

}

/**
  * @desc this object contains functions to create a visual representation of a controller
  */
const elements = {};

/**
 * [buildController description]
 * @param  {[type]} theControllerType [description]
 * @param  {[type]} theUpdateFunction [description]
 * @return [type]                     [description]
 */
export const buildController = (theControllerType, theUpdateFunction) => {
  elements[theControllerType] = theUpdateFunction;
}

/**
  * @desc
  * @param {Object} theElement  svg element
  * @param {Object} theParams  object with attributes
  * @returns {Object} svg element based on type
  */
export const buildElementsFor = (theController, theParams) => {
  const type = theController.type;
  const attributes = Common.merge(theController.state, theParams);
  const element = elements[type](theController, attributes);
  return element;
};

/**
  * @desc updates or creates a controller's svg element
  * @param {Controller} theController  the controller
  * @param {String} theIndex  the index of the svg element
  * @param {Function} theFn  a function that will be called to create an svg element
  * @param {Object} theParams  the svg element's parameters
  */
export const updateElementFor = (theController, theIndex, theFn, theParams) => {
  const {text} = theParams;
  /* first check if the svg element for the given controller exists */
  if(theController.getElement(theIndex) === undefined) {
    /* if it doesn't exist yet, create it by applying theFn and the given parameters */
    theController.getElement()[theIndex] = theFn(theParams);
    theController.getElement().insertBefore(theController.getElement(theIndex), theController.getElement('area'));
  }
  if(text !== undefined) {
  setText(theController.getElement(theIndex), text);
    /* delete text property from theParams, we do not want to add it as an attribute */
    delete theParams.text;
  }

  /* then make changes to the controller's attributes where necessary */
  setAttributesFor(theController.getElement(theIndex), theParams);
}

/**
  * @desc helper function to set attributes of a svg element
  * @param {Object} theElement  svg element
  * @param {Object} theParams  object with attributes
  * @returns {Object}  svg element with attributes changed
  */
export const setAttributesFor = (theElement, theParams) => {
    // TODO: transform is a special case here, how should we go about it.
    Object.keys(theParams).forEach(key => {
      theElement.setAttribute(key, Common.isObject(theParams[key]) ? Common.objectToString(theParams[key]):theParams[key]);
    });
    return theElement;
  }

/**
  * @desc helper function to creating svg elements
  * @param {String} theType the svg type
  * @returns {Object} svg element
  */
export const createElement = theType => {
  return document.createElementNS(Builder.svgns(), theType);
}

/**
  * @desc helper function to create a svg rectangle
  * @param {Object} theParams  the parameters to be used to style the rectangle
  * @returns {Object} svg rect with attributes added
  */
export const createRect = theParams => {
  const {width=100, height=100, rx=0, ry=0} = theParams;
  const defaultAttributes = {width, height, rx, ry};
  const shape = setAttributesFor(createElement('rect'), Common.merge(defaultAttributes, theParams));
  return shape;
}

/**
  * @desc helper function to create a svg text element
  * @param {Object} theParams  the parameters to be used to style a text label
  * @returns {Object} svg text with attributes added
  */
export const createLabel = theParams => {
  const {textAnchor='start', alignmentBaseline='central', text} = theParams;
  const defaultAttributes = {'alignment-baseline': alignmentBaseline, 'text-anchor': textAnchor}
  delete theParams.text;
  const label = setAttributesFor(setText(createElement('text'), text), Common.merge(defaultAttributes, theParams));
  return label;
}

/**
 * @desc
 * @param  {Object} theParams
 * @returns {Object}
 */
export const createCircle = theParams => {
  const {r=20, cx=20, cy=20} = theParams;
  const defaultAttributes = {r, cx, cy};
  const shape = setAttributesFor(createElement('circle'), Common.merge(defaultAttributes, theParams));
  return shape;
}

/* TODO implement triangle */
export const createInput = theParams => {
  const {x=0, y=0, width=100, height=20} = theParams;
  const defaultAttributes = {x,y,width,height};
  console.log('createInput', defaultAttributes);
  const blur = target => {setAttributesFor(target, {contenteditable:'false'});};
  const shape = setAttributesFor(createElement('foreignObject'), Common.merge(defaultAttributes, theParams));
  const div = setAttributesFor(document.createElement('div'), {
    class: 'single',
    xmlns: 'http://www.w3.org/1999/xhtml'});
  const span = setAttributesFor(document.createElement('span'), {
    onblur: 'this.setAttribute("contenteditable", false)',
    style: `font-size:20px; color:rgba(255,255,255,1); line-height: normal; height: ${height}px`,
    contenteditable: 'false'});
  div.appendChild(span);
  shape.appendChild(div);
  return shape;
}

/* TODO implement triangle */
export const createTriangle = theParams => {
  const {points=[0,0, 100,0, 50,100]} = theParams;
  const defaultAttributes = {points};
  const shape = setAttributesFor(createElement('polygon'), Common.merge(defaultAttributes, theParams));
  return shape;
}

/* TODO implement chart */
export const createChart = theParams => {
  const chart = createElement('svg');
  const line = createElement('polyline');
  return chart;
}

/* TODO implement canvas */
export const createCanvas = theParams => {
}

/**
 * [setText description]
 * @param {[type]} theElem [description]
 * @param {[type]} theText [description]
 */
export const setText = (theElem, theText) => {
  theElem.innerHTML = theText;
  return theElem;
}


export default Builder;
