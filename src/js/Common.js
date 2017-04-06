
/**
  * @classdesc
  */
class Common {

  constructor() {}

  static b(o,d) {
    return (typeof(o) === 'boolean') ? o:d;
  }

  static i(o,d) {
    return Math.round((typeof(o) === 'number') ? o:d);
  }

  static s(o,d) {
    return (typeof(o) === 'string') ? o:d;
  }

  static f(o,d) {
    return (typeof(o) === 'number') ? o:d;
  }

  static constrainValue( theValue , theMin , theMax ) {
  	return theValue < theMin ? theMin : ( theValue > theMax ? theMax : theValue );
  }

  static inside( theValue , theMin , theMax ) {
  	return theValue >= theMin && theValue <= theMax;
  }

  static outside( theValue , theMin , theMax ) {
  	return theValue < theMin || theValue > theMax;
  }

  static mapValue(theValue , theStart0 , theStop0 , theStart1 , theStop1 ) {
    return theStart1 + ( theStop1 - theStart1 ) * ( ( theValue - theStart0 ) / ( theStop0 - theStart0 ) );
  }

  static objectToString(o) {
    let str = '';
    Object.keys(o).forEach(key => {str = `${str} ${key}:${o[key]};`})
    return str;
  }

  static elementToObject(elem){
    const data = {};
    [].forEach.call(elem.attributes, (attr) => {data[attr.name] = attr.value;});
    return data;
  }

  static isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
  }

  /**
   * deep merge from  https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
   * TODO: multiple sources ...sources
   */
  static merge(target, source) {
    let output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = this.merge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  }

export default Common;
