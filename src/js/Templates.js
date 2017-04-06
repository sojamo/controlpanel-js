import AHelper             from './AHelper.js'
import Controller          from './Controller.js'

/* default controllers */
import Button              from './controllers/Button.js'
import ColorPicker         from './controllers/ColorPicker.js'
import Range               from './controllers/Range.js'
import Slider              from './controllers/Slider.js'
import TextField           from './controllers/TextField.js'
import Toggle              from './controllers/Toggle.js'


  /* @classdesc
  */
class Templates extends AHelper {

  /**
    * @constructor
    */
  constructor(theBase) {
    super(theBase);
    this.templates = {}; /*FIXME: consider to use Map() */
    this.rootRef = undefined;
  }

  /**
    * @desc
    * @param {Object} theParams
    * @returns {Object} newly created Controller
    */
  create(theId, theParams) {
    const {type} = theParams;
    if(this.templates.hasOwnProperty(type)) return this.templates[type](theId, theParams);
  }

  /**
    * @desc
    * @param {Object} theRoot
    */
  configure(theRoot) {

    this.rootRef = theRoot;

    this.setTemplateFor('button', (theId, theParams) => {return Button.create(this, theId, theParams)});
    this.setTemplateFor('colorPicker', (theId, theParams) => {return ColorPicker.create(this, theId, theParams)});
    this.setTemplateFor('range', (theId, theParams) => {return Range.create(this, theId, theParams)});
    this.setTemplateFor('slider', (theId, theParams) => {return Slider.create(this, theId, theParams)});
    this.setTemplateFor('textField', (theId, theParams) => {return TextField.create(this, theId, theParams)});
    this.setTemplateFor('toggle', (theId, theParams) => {return Toggle.create(this, theId, theParams)});


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
    * @param {Object} theName
    * @param {Object} theFunction
    * @returns {Object} self
    */
  setTemplateFor(theName, theFunction) {
    this.templates[theName] = theFunction;
    return this;
  }

  /**
    * @desc
    * @returns {Object}
    */
  root() {return this.rootRef;}

}


export default Templates;
