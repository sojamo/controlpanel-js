import Common    from './Common.js'
import AHelper   from './AHelper.js'


/**
  * @classdesc
  */
class Event extends AHelper {

  /**
    * @constructor
    */
  constructor(theBase) {
    super(theBase);
    this.dragTarget = undefined;
    this.viewTarget = undefined;
  }

  /**
    * @desc
    * @param {Object} theRoot
    */
  configure(theRoot, theName) {

    /* prevent Event to be configured multiple times */
    if(this.viewTarget !== undefined) return;

    this.viewTarget = document;

    /* window events */
    addEventListener(window, Event.resize, event => {});


    /* mouse events */

    /* call events when the mouse is moved, in case a drag-target is defined, call drag */
    addEventListener(this.viewTarget, Event.mouseMove, event => {
      if(this.dragTarget === undefined) return;
      this.dragTarget.params['event'] = event;
      this.apply(this.dragTarget.controller, 'drag', this.dragTarget.params);
    });

    /* when the mouse is up, release the drag-target */
    addEventListener(this.viewTarget, Event.mouseUp, event => {
      this.apply(this.dragTarget !== undefined ? this.dragTarget.controller: undefined, 'stopDrag', {event});
    });

    /* wheel events */
    const wheel = () => {return Event.onWheel in this.viewTarget ? Event.wheel : Event.mouseWheel;};
    addEventListener(theRoot, wheel(), event => {event.preventDefault()});


    /* TODO: key events */
    // addEventListener(this.viewTarget, Event.keyUp, event => {this.handleKeyEvent(Event.keyUp, event);});
    // addEventListener(this.viewTarget, Event.keyPress, event => {this.handleKeyEvent(Event.keyPressed, event);});


    /* TODO: touch events, for mobile devices */
    /* NOTE: how to extract touch info, see https://github.com/processing/p5.js/blob/master/src/events/touch.js */

    /* when a touch-event is detected, treat as mouseDown. */
    addEventListener(this.viewTarget, Event.touchStart, event => {
      this.apply(this.dragTarget !== undefined ? this.dragTarget.controller: undefined, 'stopDrag', {event});
    }, true);

    /* when a touch-pointer is moved, treat as mouseMove. Only use 1 touch-pointer, ignore the others. */
    addEventListener(theRoot, Event.touchMove, event => {
      this.base().app.a = event.clientX;
      event.preventDefault();
    });

    /* when a touch-event ends, do ... */
    addEventListener(this.viewTarget, Event.touchEnd, event => {
      this.apply(this.dragTarget !== undefined ? this.dragTarget.controller: undefined, 'stopDrag', {event});
    });

  }

  /**
    * @desc
    * @param {Object} theName
    * @param {Object} theFunction
    * @returns {Object} self
    */
  set(theEvent, theFunction) {
    setEvent(theEvent, theFunction);
    return this;
  }

  /**
    * @desc request an event
    * @param {Object} theEvent
    * @returns {Object} an event function from the pool of events
    */
  get(theEvent) {
    return events[theEvent] || (() => { console.log('Event',theEvent, 'does not exist.')});
  }

  /**
    * @desc
    * @param {Object} theController
    * @param {Object} theEvent
    * @param {Object} theParams
    * @returns {Object} self
    */
  apply(theController, theEvent, theParams) {
    events[theEvent](this, theController, theParams);
    return this;
  }


  /* FIXME: EXPERIMENTAL checks all elements for mouse-over when key is pressed,
   * then finds the most-top one and changes the text of its label.
   * uses Controller.element.request() to access the Controller assigned to the element. */
  handleKeyEvent(theEventType, theEvent) {
    /* gather all elements that are under the mouse pointer when a key gets pressed */
    const arr = [...document.querySelectorAll( ":hover" )];
    /* check if we are dealing with an svg element */
    if(!!arr.filter(el => el.nodeName === 'svg').filter(el => el === theRoot).length) {
      /* check if the element implements request */
      const target = arr.filter(el => el.request !== undefined);
      /* if this is the case and the target is not empty, then reduce the target and request it */
      if(!!target.length) target.reduce(el => el).request().change({label:'hello'});
    }
  }

}

const events = {};

const setEvent = (theEvent, theFunction) => {
  events[theEvent] = theFunction;
}

export const callEventFor = (theEvent) => {
  return events[theEvent];
}

/**
  * @desc
  * @param {Object} theElement
  * @param {String} theType
  * @param {Function} theCallback
  */
export const addEventListener = (theElement, theType, theCallback, theFlag=false) => {
  if (theElement.addEventListener) {
    theElement.addEventListener(theType, theCallback, theFlag);
  } else if (theElement.attachEvent) {
    theElement.attachEvent('on' + theType, theCallback);
  }
}



/* setup default events */

/**
 * [dragTarget description]
 * @type {Object}
 */
setEvent('call', (theEventHandler, theController, theParams) => {
  const {fn} = theParams;
  console.log('call', theParams);
  fn(theController, theParams);
});

/**
 * [dragTarget description]
 * @type {Object}
 */
setEvent('startDrag', (theEventHandler, theController, theParams) => {
  theEventHandler.dragTarget = {controller: theController, params: theParams};
});

/**
 * [dragTarget description]
 * @type {[type]}
 */
setEvent('stopDrag', (theEventHandler, theController, theParams) => {
  theEventHandler.dragTarget = undefined; /* FIXME: should not be undefined but an empty controller */
});

/**
 * [v0 description]
 * @type {[type]}
 */
setEvent('drag', (theEventHandler, theController, theParams) => {
  const {then, get} = theParams;
  theParams['inputValue'] = get !== undefined ? theParams.event[get] : 0;
  callEventFor(then)(theEventHandler, theController, theParams);
});

/**
 * [v0 description]
 * @type {[type]}
 */
setEvent('preventDefault', (theEventHandler, theController, theParams) => {
  const {event} = theParams;
  event.preventDefault();
});

/**
 * [v0 description]
 * @type {[type]}
 */
setEvent('sliderDown', (theEventHandler, theController, theParams) => {
  const {event, element} = theParams;
  const {min, max, width} = theController.state;
  const pointer = event.clientX - element.area.getBoundingClientRect().left;
  const v0 = Common.mapValue(pointer, 0, width, min, max);
  const value = Common.constrainValue(v0, min, max);
  theController.change({value});
});

/**
 * [v0 description]
 * @type {[type]}
 */
setEvent('sliderDrag', (theEventHandler, theController, theParams) => {
  const {event, inputValue} = theParams;
  const {min, max, width, value: val} = theController.state;
  const v0 = val + Common.mapValue(inputValue, 0, width, 0, max - min);
  const value = Common.constrainValue(v0, min, max);
  theController.change({value});
});

/**
 * [v0 description]
 * @type {[type]}
 */
setEvent('rangeDown', (theEventHandler, theController, theParams) => {
  const {event, element} = theParams;
  const {min, max, value, width, handleWidth} = theController.state;
  const left = Common.mapValue(value.min, min, max, handleWidth, width - handleWidth);
  const right = Common.mapValue(value.max, min, max, handleWidth, width - handleWidth);
  const pointer = event.clientX - element.area.getBoundingClientRect().left;
  const which = Common.inside(pointer, left - handleWidth, left) ?
      'left': Common.inside(pointer, right, right + handleWidth) ?
      'right': !Common.outside(pointer, left, right) ?
      'center': undefined;
  theEventHandler.dragTarget['applyTo'] = which;
});

/**
 * [setEvent description]
 * @param {[type]} rangeDrag       [description]
 * @param {[type]} theEventHandler [description]
 * @param {[type]} inputValue      [description]
 * @param {[type]} min             [description]
 * @param {[type]} max             [description]
 * @param {[type]} value           [description]
 */
setEvent('rangeDrag', (theEventHandler, theController, theParams) => {
  const {event, inputValue} = theParams;
  const {width, min: minValue, max: maxValue, value: val} = theController.state;
  const range = val.max - val.min;
  const dist = Common.mapValue(inputValue, 0, width, 0, maxValue - minValue);
  const applyTo = theEventHandler.dragTarget === undefined ? 'scroll' : theEventHandler.dragTarget.applyTo;

  switch(applyTo) {
    case 'center':
    case 'scroll': {
        const min = Common.constrainValue(val.min + dist, minValue, maxValue - range);
        const max = min + range;
        theController.change({value: {min, max}});
      }
    break;
    case 'left': {
      const min = Common.constrainValue(val.min + dist, minValue, val.max);
      theController.change({value: {min}});
    }
    break;
    case 'right': {
      const max = Common.constrainValue(val.max + dist, val.min, maxValue);
      theController.change({value: {max}});
    }
    break;
  }
});


/**
 * [hover description]
 * @type {[type]}
 */
setEvent('hover', (theEventHandler, theController, theParams) => {
  const {is} = theParams;
  theController.change({hover: is});
});


Event.change           = 'change';
Event.blur             = 'blur';
Event.click            = 'click';
Event.focus            = 'focus';
Event.keyDown          = 'keydown';
Event.keyPress         = 'keypress';
Event.keyUp            = 'keyup';
Event.mouseDown        = 'mousedown';
Event.mouseEnter       = 'mouseenter';
Event.mouseLeave       = 'mouseleave';
Event.mouseMove        = 'mousemove';
Event.mouseUp          = 'mouseup';
Event.mouseWheel       = 'mousewheel';
Event.onWheel          = 'onwheel';
Event.resize           = 'resize';
Event.touchEnd         = 'touchend';
Event.touchMove        = 'touchmove';
Event.touchStart       = 'touchstart';
Event.wheel            = 'wheel';

export default Event;
