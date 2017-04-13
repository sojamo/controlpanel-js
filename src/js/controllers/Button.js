import Event                                  from '../Events.js'
import Common                                 from '../Common.js'
import Controller                             from '../Controller.js'
import {createRect, createLabel}              from '../Builder.js'
import {updateElementFor, setAttributesFor}   from '../Builder.js'


class Button {

  /**
   * [create description]
   * @param  {[type]} theTemplate [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theTemplate, theId, theParams) {
    /* 1. set default parameters*/
    const { value=1, x=0, y=0, r=0, width=100, height=20} = theParams;

    /* 2. create a Controller object */
    const controller = theTemplate.createControllerFor(theId, 'button');

    /* 3. initialize the controller's state and events, also assign it's parent */
    controller
      .setState(Common.merge({value, width, height, x, y, r}, theParams))
      .addEventFor(Event.click, {call: {fn: (c) => {console.log('hello click', c);}}})
      .addEventFor(Event.mouseDown, {call: {fn: (c) => {setAttributesFor(c.getElement('bg'), {class: Button.active});}}})
      .addEventFor(Event.mouseUp, {call: {fn: (c) => {setAttributesFor(c.getElement('bg'), {class: Button.hover});}}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theTemplate.root())
      .build();

    /* 4. after building is completed, return the controller */
    return controller;
  }

  /**
   * A controller is updated when changes are made
   * @param  {Controller} theController [description]
   * @param  {Object} theParams         [description]
   * @return Controller                 [description]
   */
  static update(theController, theParams) {
    const {width, height, label, hover, option, icon, rx=4, ry=4} = theParams;
    const c0 = hover ? Button.hover: Button.normal;
    const x = width/2;
    const y = height/2;
    updateElementFor(theController, 'bg', createRect, {width, height, class: c0, rx, ry});
    switch(option) {
      case('icon'):
        updateElementFor(theController, 'icon', createLabel, {x, y, textAnchor: 'middle', class: Button.icon, text: icon});
        break;
      default:
      updateElementFor(theController, 'label', createLabel, {x, y, textAnchor: 'middle', class: Button.label, text: label});
    }
    updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
    return theController;
  }

}


Button.normal  = 'button bg';
Button.hover   = 'button fg';
Button.active  = 'button active';
Button.label   = 'button label';
Button.icon    = 'button icon';

export default Button;
