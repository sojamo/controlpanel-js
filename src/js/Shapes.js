import {setAttributesFor, createElement}    from './Builder.js'
import Common                               from './Common.js'

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
