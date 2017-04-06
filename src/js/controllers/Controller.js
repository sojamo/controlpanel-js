/**
 * To create a controller , the following 4 steps are necessary:
 * 1. configure default parameters first
 * 2. create a new controller of a given type
 * 3. set the states and events for the controller
 * 4. return the newly created controller
 */


 /* create a controller */
 // c = createControllerFor(theId, theType)

 /* set state */
 // c.setState(theParams)

 /* assign events */
 // c.addEventFor(theEventName, theParams)

  /* set parent */
 // c.setParent(theParent)

 /* build the controller */
 // c.build()

 /* define view */
// updateElementFor(theController, theName, theFunctionToCreateSVG, theParams )

Controller.area = 'area';

export default Controller;
