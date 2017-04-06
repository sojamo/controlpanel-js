/* TODO */


class Chart {

  static create(theTemplate, theId, theParams) {
    /* 1. configure default parameters first */
    const {value=[], x=0, y=0, width=100, height=50} = theParams;

    /* 2. create a new controller of type slider */
    const controller = theTemplate.createControllerFor(theId, 'chart');

    /* 3. now set the state for the slider */
    controller
      .setState(Common.merge({value, width, height, x, y, r}, theParams))
      .setParent(theTemplate.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  static update(theController, theParams) {
    const {width, height, label, option, value} = theParams;
    updateElementFor(theController, 'bg', createRect, {width, height, class: 'chart bg', rx, ry});
    updateElementFor(theController, 'chart', createChart, {width, height, value});
    updateElementFor(theController, 'area', createRect, {width, height, class: 'area'});
    return theController;
  }
}

export default Chart;
