import Event                         from '../Events.js'
import Common                        from '../Common.js'
import Controller                    from '../Controller.js'
import {createRect, createLabel}     from '../Builder.js'
import {updateElementFor}            from '../Builder.js'

class Range {

  /**
   * [create description]
   * @param  {[type]} theTemplate [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theTemplate, theId, theParams) {
    /* 1. configure default parameters first */
    const {value={min:0.25, max:0.75}, min=0, max=1, x=0, y=0, r=0, width=100, height=20, handleWidth=10} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theTemplate.createControllerFor(theId, 'range');

    /* 3. now set the state for the range, order matters! see mouseDown.
     * startDrag needs to be called before RangeDown so that dragTarget gets initialized. */
    controller
      .setState(Common.merge({value, min, max, width, height, handleWidth, x, y, r}, theParams))
      .addEventFor(Event.wheel, {rangeDrag: {get: 'deltaY'}})
      .addEventFor(Event.mouseDown, {startDrag: {then: 'rangeDrag', get: 'movementX'}, rangeDown: {}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theTemplate.root())
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
    const {width, height, label, value, min, max, hover, handleWidth} = theParams;
    const v0 = Common.mapValue(value.min, min, max, handleWidth, width-handleWidth);
    const v1 = Common.mapValue(value.max, min, max, handleWidth, width-handleWidth);
    const w0 = v1 - v0;
    const valueMin = value.min.toFixed(2);
    const valueMax = value.max.toFixed(2);
    const c0 = hover ? Range.active: Range.hover;
    const spacing = 4;
    updateElementFor(theController, 'bg', createRect, {width, height, class: Range.normal});
    updateElementFor(theController, 'fg', createRect, {x: v0, width: w0, height, class: c0});
    updateElementFor(theController, 'min', createRect, {x: v0-handleWidth, width: handleWidth, height, class: Range.hover});
    updateElementFor(theController, 'max', createRect, {x: v1, width: handleWidth, height, class: Range.hover});
    updateElementFor(theController, 'label', createLabel, {x: width + spacing, y: height/2, 'text-anchor': 'start', class: Range.label, text: label});
    updateElementFor(theController, 'labelMin', createLabel, {x: spacing, y: height/2, 'text-anchor': 'start', class: Range.label, text: valueMin});
    updateElementFor(theController, 'labelMax', createLabel, {x: width-spacing, y: height/2, 'text-anchor': 'end', class: Range.label, text: valueMax});
    updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
    return theController;
  }

}

Range.normal  = 'range bg';
Range.hover   = 'range fg';
Range.active  = 'range active';
Range.label   = 'range label';

export default Range;
