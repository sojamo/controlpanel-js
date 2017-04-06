import Common from './Common.js'

/**
  * @classdesc
  */
class Observer {

  /* https://developer.mozilla.org/en/docs/Web/API/MutationObserver */

  /**
    * @constructor
    */
  constructor() {

  /* observer function */
  this.observer = new MutationObserver((mutations) => {
    mutations.map((mutation) => {
      console.log(">",mutation.attributeName);
      switch(mutation.attributeName) {
        case('x'):
        let x = Common.i((Math.random()*100),0);
        mutation.target.setAttribute('transform',`translate(${x}, 0)`);
        break;
      }
      return mutation;
    });
  });

  /* configuration of the observer */
  this.config = { attributes: true, childList: true, characterData: true };

  }
  
  observe(theTarget) {
    this.observer.observe(theTarget, this.config);
  }

}

export default Observer;
