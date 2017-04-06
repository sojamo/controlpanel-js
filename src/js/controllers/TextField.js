import Event                                  from '../Events.js'
import Common                                 from '../Common.js'
import {createRect, createLabel, createInput} from '../Builder.js'
import {updateElementFor}                     from '../Builder.js'

class TextField {

  /**
   * [create description]
   * @param  {[type]} theTemplate [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theTemplate, theId, theParams) {
    /* set default parameters*/
    const {value=1, x=0, y=0, r=0, width=100, height=20} = theParams;
    /* create a Controller object */
    const controller = theTemplate.createControllerFor(theId, 'textField');
    /* assign input specific events */
    const input = () => {
      const div = controller.getElement('input').childNodes[0].childNodes[0]; /* FIXME: optimize */
      div.setAttribute('contenteditable', true);
      div.onkeypress = event => { if(event.charCode === 13) div.blur(); console.log(div.innerHTML); };
      return div;
    }
    /* build the controller */
    controller
      .setState(Common.merge({value, width, height, x, y, r}, theParams))
      .addEventFor(Event.focus, {call: {fn: () => {input().focus();}}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theTemplate.root())
      .build();
    /* after building is completed, return the controller */
    return controller;
  }

  /**
   * A controller is updated when changes are made
   * @param  {Controller} theController [description]
   * @param  {Object} theParams         [description]
   * @return Controller                 [description]
   */
  static update(theController, theParams) {
    const {width, height, label:text, hover, rx=0, ry=0} = theParams;
    const c0 = hover ? 'textField active': 'textField fg';
    updateElementFor(theController, 'bg', createRect, {width, height, class: 'textField bg', rx, ry});
    updateElementFor(theController, 'baseline', createRect, {width, height: 2, y: height - 2, class: c0, rx, ry});
    updateElementFor(theController, 'input', createInput, {width, height});
    updateElementFor(theController, 'label', createLabel, {x: width + 4, y: height/2, textAnchor: 'start', alignmentBaseline: 'central', class: 'label', text});
    updateElementFor(theController, 'area', createRect, {width, height, class: 'area'});
    return theController;
  }

}

export default TextField;
