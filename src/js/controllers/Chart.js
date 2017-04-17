/* TODO */
import Event                                        from '../Events.js'
import Common                                       from '../Common.js'
import Controller                                   from '../Controller.js'
import {createRect, createLabel, createChart}       from '../Shapes.js'
import {updateElementFor, setAttributesFor}         from '../Builder.js'
import {buildController}                            from '../Builder.js'

class Chart {

  static create(theBuilder, theId, theParams) {
    /* 1. configure default parameters first */
    const {value=[], x=0, y=0, width=100, height=50} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theBuilder.createControllerFor(theId, this.name);

    /* 3. now set the state for the slider */
    controller
      .setState(Common.merge({value, width, height, x, y}, theParams))
      .setParent(theBuilder.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  static test() {
    console.log("testing static call");
  }

  static update(theController, theParams) {
    const {width, height, label, option, value} = theParams;
    updateElementFor(theController, 'bg', createRect, {width, height, class: 'chart bg'});
    updateElementFor(theController, 'chart', createChart, {width, height, value});
    updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
    return theController;
  }
}

export default Chart;
