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
    const {x=0, y=0, r=0, width=100, height=20, spacing=10, pickerHeight=100, value=[255, 0, 0, 255], hue=[255, 255, 255, 255]} = theParams;

    /* 2. create a new controller of type button */
    const controller = theTemplate.createControllerFor(theId, 'colorPicker');

    /* 3. now set the state, events, parent for the button */
    controller
      .setState(Common.merge({value, hue, width, height, x, y, r},theParams))
      .addEventFor(Event.click, {call: {fn: ColorPicker.togglePicker}})
      .addEventFor(Event.mouseEnter, {hover: {is: true}})
      .addEventFor(Event.mouseLeave, {hover: {is: false}})
      .setParent(theTemplate.root())
      .build();

    /* 4. finally return the newly created controller */
    return controller;
  }

  /**
   * [togglePicker description]
   * @param  {[type]} theController [description]
   * @param  {[type]} theParams     [description]
   * @return [type]                 [description]
   */
  static togglePicker(theEventHandler, theController) {

    const k0 = 'picker';

    /* the root element of the ControlPanel
     * the color-picker, when opened, will be rendered on top of all other elements */
    const root = theController.element.nearestViewportElement;

    /* v0 is either undefined or a foreignObject element */
    const v0 = theController.getStateFor(k0);

    /* if v0 is undefined, lets open the picker */
    if(v0 === undefined) {

      /* local parameters we will need */
      const params = {
        x: theController.getStateFor('x') || 0,
        y: theController.getStateFor('y') + theController.getStateFor('height') || 20,
        width: theController.getStateFor('width') || 200,
        height: theController.getStateFor('pickerHeight') || 100,
        spacing: theController.getStateFor('spacing') || 10,
        hue: theController.getStateFor('hue')
      }

      /* create a foreignObject to store a canvas */
      const f0 = setAttributesFor( createElement('foreignObject'), params);

      /* create a canvas that we can use to render colors in HSB */
      const canvas = setAttributesFor( document.createElementNS('http://www.w3.org/1999/xhtml','canvas'), params);

      /* add the canvas to the foreignObject */
      f0.appendChild(canvas);

      /* on click, change color */
      addEventListener(canvas, Event.click, event => {
        ColorPicker.changeColorFor(theController, theEventHandler, canvas, Common.merge(params, {sx: event.layerX, sy: event.layerY}));
      });

      /* when dragging the mouse inside the foreignObject, update color */
      addEventListener(canvas, Event.mouseMove, event => {
        if(event.buttons !== 0) {
          ColorPicker.changeColorFor(theController, theEventHandler, canvas, Common.merge(params, {sx: event.layerX, sy: event.layerY}));
        }
      });

      /* an outside click will close the foreignObject */
      addEventListener(f0, Event.blur, event => { ColorPicker.togglePicker(theEventHandler, theController); });

      /* add the foreignObject to the ColorPicker object and set focus */
      theEventHandler.base().change(theController.id, {[k0]: f0});
      root.appendChild(f0);
      f0.focus();

      /* render the color spectrum*/
      ColorPicker.renderColorInto(canvas, params);

    } else { /* remove */
      root.removeChild(v0);
      theController.removeStateFor(k0);
    }
  };

  /**
   * [changeColorFor description]
   * @param  {[type]} theController [description]
   * @param  {[type]} theElement    [description]
   * @param  {[type]} theParams     [description]
   * @return [type]                 [description]
   */
  static changeColorFor(theController, theEventHandler, theElement, theParams) {

    /* render the color spectrum*/
    const hue = theController.getStateFor('hue');
    const ctx = ColorPicker.renderColorInto(theElement, Common.merge(theParams, {hue}));

    /* check the color under the cursor */
    const selectedColor = [...ctx.getImageData(theParams.sx, theParams.sy, 1, 1).data];

    if(theParams.sx < theParams.spacing) {
       /* select a new hue value */
      ColorPicker.renderColorInto(theElement, Common.merge(theParams, {hue: selectedColor}));
      theEventHandler.base().change(theController.id, {hue: selectedColor});
    } else {
      /* otherwise change the brightness/saturation based on the color selected */
      const style = `fill: rgba(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]}, 1.0)`;
      setAttributesFor(theController.getElement().childNodes[0], {style});
      theEventHandler.base().change(theController.id, {value: selectedColor});
    }
  };

  /**
   * [update description]
   * @param  {[type]} theController [description]
   * @param  {[type]} theParams     [description]
   * @return [type]                 [description]
   */
  static update(theController, theParams) {
    const {width, height, label, hover} = theParams;
    const c0 = hover ? ColorPicker.active: ColorPicker.normal;
    const x = width/2;
    const y = height/2;
    updateElementFor(theController, 'fg', createRect, {width, height, class: c0});
    updateElementFor(theController, 'label', createLabel, {x, y, textAnchor: 'middle', class: ColorPicker.label, text: label});
    updateElementFor(theController, 'area', createRect, {width, height, class: Controller.area});
    return theController;
  }

  /**
   * [renderColorInto description]
   * @param  {[type]} theElement [description]
   * @param  {[type]} theParams  [description]
   * @return [type]              [description]
   */
  static renderColorInto(theElement, theParams) {
    const {hue=[255, 255, 255, 255], width=200, height=100, spacing=10} = theParams;

    const ctx = theElement.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = ColorPicker.toRgba([255,255,255,0.5]);
    ctx.fill();

    ctx.beginPath();
    ctx.rect(0, 0, spacing, height);
    const spectrum = ctx.createLinearGradient(0, 0, 0, height);
    spectrum.addColorStop(0.00, ColorPicker.toRgba([255, 0, 0, 1]));
    spectrum.addColorStop(0.17, ColorPicker.toRgba([255, 255, 0, 1]));
    spectrum.addColorStop(0.34, ColorPicker.toRgba([0, 255, 0, 1]));
    spectrum.addColorStop(0.51, ColorPicker.toRgba([0, 255, 255, 1]));
    spectrum.addColorStop(0.68, ColorPicker.toRgba([0, 0, 255, 1]));
    spectrum.addColorStop(0.85, ColorPicker.toRgba([255, 0, 255, 1]));
    spectrum.addColorStop(1.00, ColorPicker.toRgba([255, 0, 0 ,1]));
    ctx.fillStyle = spectrum;
    ctx.fill();

    ctx.fillStyle = ColorPicker.toRgba(hue);
    ctx.fillRect(spacing, 0, width, height);

    const white = ctx.createLinearGradient(spacing, 0, width, 0);
    white.addColorStop(0, ColorPicker.toRgba([255,255,255,1]));
    white.addColorStop(1, ColorPicker.toRgba([255,255,255,0]));
    ctx.fillStyle = white;
    ctx.fillRect(spacing, 0, width, height);

    var black = ctx.createLinearGradient(spacing, 0, spacing, height);
    black.addColorStop(0, ColorPicker.toRgba([0,0,0,0]));
    black.addColorStop(1, ColorPicker.toRgba([0,0,0,1]));
    ctx.fillStyle = black;
    ctx.fillRect(spacing, 0, width, height);
    return ctx;
  }

  static toRgba(theColor) {
    return `rgba(${theColor[0]}, ${theColor[1]}, ${theColor[2]}, ${theColor[3]})`;
  }

}

ColorPicker.normal  = 'colorPicker bg';
ColorPicker.hover   = 'colorPicker fg';
ColorPicker.active  = 'colorPicker active';
ColorPicker.label   = 'colorPicker label';


export default ColorPicker;
