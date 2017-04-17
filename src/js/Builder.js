import Common                                             from './Common.js'
import Controller                                         from './Controller.js'
import AHelper                                            from './AHelper.js'
import {setText}                                          from './Shapes.js'
import * as controllers                                   from './controllers'

/**
  * @classdesc
  */
class Builder extends AHelper {

  constructor(theBase) {
    super(theBase);
    this.rootRef = undefined;
  }

  /**
    * @static
    * @desc returns the svg namespace used in this project
    * @returns {String} svg name space
    */
  static svgns() { return 'http://www.w3.org/2000/svg'; }

  /**
    * @desc
    * @param {Object} theParams
    * @returns {Object} newly created Controller
    */
  create(theId, theParams) {
    const {type} = theParams;
    if(templates.hasOwnProperty(type)) return templates[type](theId, theParams);
  }



  /**
    * @desc initializes the Builder and creates the root element
    * @param {Object} theParams the initial parameters passed on from the ControlPanel
    * @returns {Object} root element
    */
  init(theParams) {
    // const {top=0, left=0, name='?', position='absolute', background='rgba(0,0,0,0.25)'} = theParams;
    const {name='?', background='rgba(0,0,0,0.2)'} = theParams;

    const defaultAttributes = {
      id: 'cp5-'+name,
      class: 'cp5',
      style: {background}};

    this.rootRef = setAttributesFor(createElement('svg'), Common.merge(defaultAttributes, theParams));

    Object.entries(controllers).forEach( (v) => {
      /* v = [name of the Controller class, Controller class function] */
      assignUpdateFor(v[0], (theController, theParams) => {v[1].update(theController, theParams)});
      assignTemplateFor(v[0], (theId, theParams) => {return v[1].create(this, theId, theParams)});
    });

    return this.rootRef;
  }

  /**
    * @desc creates a new controller based on type and parameters
    * @param {String} theType the type of controller to be created
    * @returns {Object} root element
    */
  createControllerFor(theId, theType) {
    const controller = new Controller(theId, theType, this.events());
    return controller;
  }


  /**
    * @desc
    * @returns {Object}
    */
  root() {return this.rootRef;}

}



const templates = {};

/**
  * @desc
  * @param {Object} theName
  * @param {Object} theFunction
  * @returns {Object} self
  */
export const assignTemplateFor = (theName, theFunction) => {
  templates[theName] = theFunction;
}



const updates = {};

/**
 * [buildController description]
 * @param  {[type]} theControllerType [description]
 * @param  {[type]} theUpdateFunction [description]
 * @return [type]                     [description]
 */
export const assignUpdateFor = (theControllerType, theUpdateFunction) => {
  updates[theControllerType] = theUpdateFunction;
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
  const element = updates[type](theController, attributes);
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
    /* if the element doesn't exist yet, create it by applying theFn and the given parameters */
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

export default Builder;
