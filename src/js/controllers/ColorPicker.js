import Event                                      from '../Events.js'
import Common                                     from '../Common.js'
import Controller                                 from '../Controller.js'
import {createRect, createLabel, createElement}   from '../Builder.js'
import {updateElementFor, setAttributesFor}       from '../Builder.js'
import {addEventListener}                         from '../Events.js'


class ColorPicker {

  /**
   * [create description]
   * @param  {[type]} theTemplate [description]
   * @param  {[type]} theId       [description]
   * @param  {[type]} theParams   [description]
   * @return [type]               [description]
   */
  static create(theTemplate, theId, theParams) {

    /* 1. configure default parameters first */
    const {value=1, x=0, y=0, r=0, width=100, height=20} = theParams;

    /* 2. create a new controller of type button */
    const controller = theTemplate.createControllerFor(theId, 'colorPicker');
    const togglePicker = () => {
      const k0 = 'picker';
      const v0 = controller.getStateFor(k0);
      const element = theTemplate.root();
      let v1 = undefined;
      if(v0 === undefined) { /* append */

        const w = 100;
        const h = 100;
        const x0 = 10;
        const y0 = 0;
        const w0 = w-x0;
        const h0 = h-y0;

        const f0 = setAttributesFor(createElement('foreignObject'), {width: w, height: h, x, y: y+height});
        v1 = setAttributesFor(document.createElementNS('http://www.w3.org/1999/xhtml','canvas'), {width: w, height: h});
        f0.appendChild(v1);

        const ctx = v1.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();

        ctx.beginPath();
        ctx.rect(0, 0, 10, h0);
        const grd1 = ctx.createLinearGradient(0, 0, 0, h0);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        ctx.fillStyle = grd1;
        ctx.fill();

        const rgbaColor = 'rgba(255,0,0,1)';
        ctx.fillStyle = rgbaColor;
        ctx.fillRect(x0, y0, w0, h0);

        const grdWhite = ctx.createLinearGradient(x0, y0, w0, y0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grdWhite;
        ctx.fillRect(x0, y0, w0, h0);

        var grdBlack = ctx.createLinearGradient(x0, y0, x0, h0);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = grdBlack;
        ctx.fillRect(x0, y0, w0, h0);
        ctx.getImageData(0,0,1,1).data;

        addEventListener(v1, Event.click, event => {
          const col = ctx.getImageData(event.layerX,event.layerY,1,1).data;
          const rgba = `fill: rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`;
          console.log(event, 'Hello Color', col, setAttributesFor(controller.getElement().childNodes[2], {style: rgba}));
        });

        element.appendChild(f0);
        controller.setState({[k0]: f0});
      } else { /* remove */
        element.removeChild(v0);
        controller.removeStateFor(k0);
      }
    };
    /* 3. now set the state, events, parent for the button */
    controller
      .setState(Common.merge({value, width, height, x, y, r},theParams))
      .addEventFor(Event.click, {call: {fn: togglePicker}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theTemplate.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  static update(theController, theParams) {
    const {width, height, label, hover} = theParams;
    const c0 = hover ? 'colorPicker active': 'colorPicker bg';
    updateElementFor(theController, 'bg', createRect, {width, height, class: c0});
    updateElementFor(theController, 'label', createLabel, {x: width/2, y: height/2, textAnchor: 'middle', class: 'colorPicker label', text: label});
    updateElementFor(theController, 'fg', createRect, {width, height: 5, y:height - 5});
    updateElementFor(theController, 'area', createRect, {width, height, class: 'area'});
    return theController;
  }
}

export default ColorPicker;
