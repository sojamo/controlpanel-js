import Common                                               from './Common.js'
import {addEventListener, callEventFor}                     from './Events.js'
import {createElement, setAttributesFor, buildElementsFor}  from './Builder.js'

/**
  * @class
  * @classdesc
  */
class Controller {

  /**
    * @constructor
    * @desc creates a Controller object used to build a controller
    * @param {Object} theId a unique Id
    * @param {String} theType which type of controller will be created
    * @param {Object} theBase the reference to the controlpanel the controller belongs to
    */
    constructor(theId, theType, theEventHandler) {
      const [id, type, events] = [theId, theType, theEventHandler];
      this.id = id;
      this.type = type;
      this.state = {};
      this.events = events;

      /* a svg element that contains all svg elements belonging to this controller  */
      this.element = setAttributesFor(createElement('g'), {type, id});
      this.element.request = () => {return this};

      /* area is a svg element used as overlay to handle mouse and touch input */
      this.element.area = setAttributesFor(createElement('rect'), {fill: 'rgba(0,0,0,0)'});
      this.element.appendChild(this.element.area);
    }

    /**
      * @desc
      * @param {String} theIndex
      * @returns {Object} an svg element
      */
    getElement(theIndex) {return theIndex === undefined ? this.element: this.element[theIndex];}

    /**
     *
     * @return Events
     */
    getEventHandler() {return this.events;}

    /**
     * [getValue description]
     * @return {Object} [description]
     */
    getValue() {return this.state.value;}

    /**
      * @desc
      * @param {Object} theIndex
      * @returns {Object} a specific controller attribute
      */
    getStateFor(theIndex) {
      return this.state[theIndex];
    }

    getState() {
      return this.state;
    }

    /**
      * @desc
      * @param {Object} theParams
      * @returns {Object} self
      */
    setState(theParams) {
      this.state = Common.merge(this.state, theParams);
      return this;
    }

    removeStateFor(theKey) {
      delete this.state[theKey];
      console.log(this.state);
      return this;
    }

    /**
      * @desc
      * @param {Object} theEvent
      * @param {Object} theParams
      * @returns {Object} self
      */
    addEventFor(theEvent, theParams) {
      Object.keys(theParams).forEach( key => {
        addEventListener(this.getElement('area'), theEvent, input => {
          const params = Common.merge({}, theParams[key]);
          const element = params['element'];
          const event = params['event'];
          const get = params['get'];
          params['element'] = element === undefined ? this.getElement() : this.getElement(element);
          params['event'] =  event  === undefined ? input : getEvent(event);
          params['inputValue'] = get === undefined ? 0:input[get];
          callEventFor(key)(this.getEventHandler(), this, params); /* FIXME: call Events.apply() here instead. */
        });
      });
      return this;
    }

    /**
      * @desc
      * @param {Object} theParent
      * @returns {Object} self
      */
    /* FIXME: make sure we don't allow this to be called more than once to avoid multiple parents */
    setParent(theParent) {
      theParent.appendChild(this.getElement());
      return this;
    }

    /**
      * @desc
      * @returns {Object}
      */
    build() {
      const {width, height, x, y, r} = this.state;
      setAttributesFor(this.getElement(), {transform: `translate(${x},${y})`, width: width, height: height});
      buildElementsFor(this, this.state);
    }

    print() {
      console.log(this.getElement(), this.state);
    }
}

export default Controller;
