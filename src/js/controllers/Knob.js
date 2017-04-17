/* TODO */
import Event                                        from '../Events.js'
import Common                                       from '../Common.js'
import Controller                                   from '../Controller.js'
import {createRect, createLabel, createCircle}      from '../Shapes.js'
import {updateElementFor, setAttributesFor}         from '../Builder.js'


class Knob {

  static create(theBuilder, theId, theParams) {
    /* 1. configure default parameters first */
    const {value=[], x=0, y=0, radius=20} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theBuilder.createControllerFor(theId, this.name);

    /* 3. now set the state for the slider */
    controller
      .setState(Common.merge({value, radius, x, y, r}, theParams))
      .setParent(theBuilder.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  static update(theController, theParams) {
    const {radius, label, value} = theParams;
    updateElementFor(theController, 'bg', createCircle, {radius, class: Knob.normal, rx, ry});
    updateElementFor(theController, 'fg', createArc, {radius, value, class: Knob.hover});
    updateElementFor(theController, 'area', createRect, {width: radius*2, height: radius*2, class: Controller.area});
    return theController;
  }
}

Knob.normal  = 'knob bg';
Knob.hover   = 'knob fg';
Knob.active  = 'knob active';
Knob.label   = 'knob label';

export default Knob;
