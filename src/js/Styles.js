
/**
  * @classdesc
  */
class Styles {

  /**
    * @constructor
    */

   /* FIXME: careful! should only be called once.
    * otherwise each ControlPanel will add the style again.
    * maybe add to main.js? */
    constructor() {
      const fonts = ['libraries/assets/styles.css',
                     'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'];
      fonts.forEach( font => {
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.media = 'screen';
        styles.href = font;
        document.getElementsByTagName('head')[0].appendChild(styles);
      });
    }

}

export default Styles;
