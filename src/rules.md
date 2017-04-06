# Rules and Style-guide to follow


Follow the [airbnb javascript](https://github.com/airbnb/javascript) Style-guide


## Position
  - Use transform instead of setting x and y attributes


## Attributes

  - do not call `setAttribute()` on an element but use Builder's `setAttributesFor(theElement, theAttributes)` instead.


## Base
`this.base` or `theBase` always refers to the instance of the ControlPanel.

---------------------------------------------

## Definition

### Parameters
Parameters are variables in a function definition. `myFunction(theParams) {}`.

### Arguments
When a function is called, arguments are the data you pass into the function's parameters.

```
  // Function declaration with Parameter theParams
  myFunction(theParams) {
    console.log(theParams);
  }

  // Function call with arguments myArguments
  var myArguments = {a:1, b:2};
  myFunction(myArguments);
```

### Properties
Property is used when its value does not change very often.

### Attributes
Attribute is used when its value can change very often.


### Value

### State




---------------------------------------------
