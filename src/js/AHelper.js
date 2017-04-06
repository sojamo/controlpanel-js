
class AHelper {

  constructor(theBase) {this.baseRef = theBase;}


  /**
    * @desc
    * @returns {ControlPanel}
    */
  base() {return this.baseRef;}

  /**
    * @desc
    * @returns {Builder}
    */
  builder() {return this.baseRef.builder;}

  /**
    * @desc
    * @returns {Events}
    */
  events() {return this.baseRef.events;}

  /**
    * @desc
    * @returns {Object}
    */
  properties() {return this.baseRef.properties;}

}

export default AHelper;
