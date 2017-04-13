/* ControlPanel */

import Builder                                            from './Builder.js'
import Common                                             from './Common.js'
import Event                                              from './Events.js'
import Observer                                           from './Observer.js'
import Templates                                          from './Templates.js'
import Styles                                             from './Styles.js'
import {addEventListener}                                 from './Events.js'
import {setAttributesFor,createElement, createTriangle}   from './Builder.js'

/**
  * @classdesc
  */
class ControlPanel {

  /**
    * @constructor
    */
  constructor(theApp, theParams) {
    const params     = Common.merge({name: '', width: 400, height: 300, parent: document.body}, theParams);

    this.app         = theApp;
    this.name        = params.name;
    this.styles      = new Styles(this);
    this.builder     = new Builder(this);
    this.observer    = new Observer(this);
    this.events      = new Event(this);
    this.templates   = new Templates(this);
    this.controllers = {};

    /* define the root element */
    const root = this.builder.init(params);

    /* initialize the control-panel and TODO: assign panel to DOM element */
    document.getElementById('p5-overlay').appendChild(root);

    /* setup controller-events */
    this.events.configure(root, this.name);

    /* setup controller-templates */
    this.templates.configure(root);


    /* The minimize/maximize Icon TODO: where should this go? */
    // const minimize = createTriangle({points: '-5,-4, 5,-4, 0,4'});
    const minimize = createTriangle({points: [-5,-4, 5,-4, 0,4]});
    setAttributesFor(minimize, {transform: `translate(12,12) rotate(0)`, class: 'menubar'})
    minimize.value = false;

    addEventListener(minimize, Event.click, ev => {
      minimize.value = !minimize.value;
      const r = minimize.value ? -90: 0;
      const height = minimize.value ? 24 : params.height;
      const width = minimize.value ? 64 : params.width;
      setAttributesFor(root, { height, width});
      setAttributesFor(minimize, { transform: `translate(12,12) rotate(${r})`});
    });

    root.appendChild(minimize);

  }

  /**
   * @desc
   * @param {String} theId
   * @param {Object} theParams
   * @returns {ControlPanel} self
   */
  create(theId, theParams) {
    /* 1. create a new controller */
    this.controllers[theId] = this.templates.create(theId, theParams);
    /* 2. add observer */
    console.log('created controller:', this.controllers[theId], this.controllers);
    return this;
  }

  /**
   * @desc
   * @param {String} theId
   * @param {Object} theParams
   * @returns {ControlPanel} self
   */
  change(theId, theParams) {
    const controller = this.controllers[theId]; // FIXME: could be undefined
    controller.setState(theParams);
    controller.build();

    const {value=undefined} = theParams;

    if(value !== undefined) {
      this.app[controller.id] = controller.getValue();
      this.app.controlEvent(Common.merge(theParams, {id: controller.id}));
    }
    return this;
  }

  /**
   * @desc
   * @param {String} theId
   * @returns {ControlPanel} self
   */
  remove(theId) {
    /*TODO: implement */
    console.log("remove", theTarget, "removes theTarget and all children and observers accordingly.");
    return this;
  }

  /**
   * @desc
   * @param {String} theId
   */
  print(theId) {
    this.controllers[theId].print();
  }

}

export default ControlPanel;
