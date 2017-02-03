class Common {

  constructor() {}

  static b(o,d) {
    return (typeof(o) === 'boolean') ? o:d;
  }

  static i(o,d) {
    return (typeof(o) === 'number') ? o:d;
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

  static mapValue(theValue , theStart0 , theStop0 , theStart1 , theStop1 ) {
    return theStart1 + ( theStop1 - theStart1 ) * ( ( theValue - theStart0 ) / ( theStop0 - theStart0 ) );
  }

}

export default Common;
