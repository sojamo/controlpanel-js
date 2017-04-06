/* ControlPanel */

import Builder                            from './Builder.js'
import Common                             from './Common.js'
import Event                              from './Events.js'
import Observer                           from './Observer.js'
import Templates                          from './Templates.js'
import Styles                             from './Styles.js'
import {addEventListener}                 from './Events.js'
import {setAttributesFor,createElement}   from './Builder.js'


/**
  * @classdesc
  */
class ControlPanel {

  /**
    * @constructor
    */
  constructor(theApp, theParams) {
    const params     = Common.merge({name: '', width: 400, height: 300}, theParams);

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

    /* initialize the control-panel */
    document.body.appendChild(root);

    /* setup controller-events */
    this.events.configure(root, this.name);

    /* setup controller-templates */
    this.templates.configure(root);


    /* The minimize/maximize Icon TODO: where should this go? */
    const minimize = setAttributesFor(
      document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      {
        style: {
          fill: 'rgba(255,255,255,0.5)'
        },
        cx:12,
        cy:12,
        r:8
      });
    minimize.value = false;

    addEventListener(minimize, Event.click, ev => {
      minimize.value = !minimize.value;
      setAttributesFor(
        root, {
        height: minimize.value ? 24 : params.height}
      );
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
    controller.change(theParams);
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
