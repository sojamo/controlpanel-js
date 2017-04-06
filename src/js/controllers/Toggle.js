import Event                                     from '../Events.js'
import Common                                    from '../Common.js'
import Controller                                from '../Controller.js'
import {createRect, createLabel, createCircle}   from '../Builder.js'
import {updateElementFor}                        from '../Builder.js'

class Toggle {

  /**
   * [create description]
   * @param  {[type]} theTemplate [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theTemplate, theId, theParams) {

    /* 1. configure default parameters first */
    const {value=false, x=0, y=0, r=0, width=20, height=20} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theTemplate.createControllerFor(theId, 'toggle');

    /* 3. now set the state for the slider */
    controller
      .setState(Common.merge({value, width, height, x, y, r}, theParams))
      .addEventFor(Event.click, {call: {fn: (c) => {c.change({value: !controller.getValue()})}}})
      .addEventFor(Event.focus, {call: {fn: (c) => {c.change({focus: true})}}})
      .addEventFor(Event.blur, {call: {fn: (c) => {c.change({focus: false})}}})
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
    const {value, width, height, label='', option, rx=4, ry=4, icon} = theParams;
    let isLabel = true;
    const c0 = value ? Toggle.active: Toggle.normal;
    switch(option) {
      case('block'): {
        updateElementFor(theController, 'bg', createRect, {width, height, class: Toggle.normal});
        updateElementFor(theController, 'fg', createRect, {x: value ? width/2 : 0, width: width/2, height, class: c0});
        updateElementFor(theController, 'label', createLabel, {x: width+4, y: height/2, class: Toggle.label, text: label});
      }
      break;
      case('circular'): {
        const n = 2;
        const r = height/2;
        const c0 = value ? Toggle.active:Toggle.hover;
        updateElementFor(theController, 'bg', createRect, {rx:r, ry:r, width, height, class: Toggle.normal});
        updateElementFor(theController, 'fg', createCircle, {r: r-n, cx:value ? width-r:r, cy: r, class: c0});
        updateElementFor(theController, 'label', createLabel, {x: width+4, y: height/2, class: Toggle.label, text: label});
      }
      break;
      case('icon'): {
        isLabel = false;
        updateElementFor(theController, 'bg', createRect, {rx, ry, width, height, class: c0});
        updateElementFor(theController, 'icon', createLabel, {x: width/2, y: height/2, textAnchor: 'middle', class: Toggle.icon, text: icon});
      }
      break;
      default: {
        updateElementFor(theController, 'bg', createRect, {width, height, class: c0});
      }
    }
    if(isLabel) updateElementFor(theController, 'label', createLabel, {x: width+4, y: height/2, class: Toggle.label, text: label});
    updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
    return theController;
  }
}

Toggle.normal  = 'toggle bg';
Toggle.hover   = 'toggle fg';
Toggle.active  = 'toggle active';
Toggle.label   = 'toggle label';
Toggle.icon    = 'toggle icon';

export default Toggle;
