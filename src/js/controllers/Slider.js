import Event                       from '../Events.js'
import Common                      from '../Common.js'
import Controller                  from '../Controller.js'
import Builder                     from '../Builder.js'
import {createRect, createLabel}   from '../Shapes.js'
import {updateElementFor}          from '../Builder.js'

class Slider {

  /**
   * [create description]
   * @param  {[type]} theBuilder  [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theBuilder, theId, theParams) {

    /* 1. configure default parameters first */
    const {value=0.5, min=0, max=1, x=0, y=0, r=0, width=100, height=20} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theBuilder.createControllerFor(theId, this.name);

    /* 3. now set the state for the slider */
    controller
      .setState(Common.merge({value, min, max, width, height, x, y, r}, theParams))
      .addEventFor(Event.wheel, {sliderDrag: {get: 'deltaY'}})
      .addEventFor(Event.mouseDown, {startDrag: {then: 'sliderDrag', get:'movementX'}, sliderDown: {}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theBuilder.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  /**
   * [build description]
   * @param  {[type]} theController [description]
   * @param  {[type]} theParams     [description]
   * @return [type]                 [description]
   */
  static update(theController, theParams) {
      const {width, height, label, min, max, value, hover} = theParams;
      const v0 = Common.constrainValue(value, min, max);
      const v1 = Common.mapValue(v0, min, max, 0, width);
      const v2 = v0.toFixed(2);
      const c0 = hover ? Slider.active: Slider.hover;
      const spacing = 4;
      updateElementFor(theController, 'bg', createRect, {width, height, class: Slider.normal});
      updateElementFor(theController, 'fg', createRect, {width: v1, height, class: c0});
      updateElementFor(theController, 'label', createLabel, {x: width + spacing, y: height/2, 'text-anchor': 'start', class: Slider.label, text: label});
      updateElementFor(theController, 'value', createLabel, {x: spacing, y: height/2, 'text-anchor': 'start', class: Slider.label, text: v2});
      updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
      return theController;
  }

}

Slider.normal  = 'slider bg';
Slider.hover   = 'slider fg';
Slider.active  = 'slider active';
Slider.label   = 'slider label';
Slider.icon    = 'slider icon';

export default Slider;
