# Controlpanel-js

From [controlP5](https://github.com/sojamo/controlp5) to javascript. A graphical user interface for [p5js](https://p5js.org/) in the works. The library is intended as an overlay separated from p5js' canvas. Controllers are not rendered into the canvas but as separate SVG elements.


## Status: development

  - Uses [webpack](https://webpack.github.io) and [babel](https://babeljs.io/) for development
  - Early stages don't consider this as anything useable  
  - The first batch of controllers to be implemented:
    - Slider
    - Button
    - Toggle
    - Range
    - Knob
    - Colorpicker
    - List
    - Chart


### Install webpack

If you haven't already, install webpack and the project's dependencies

```

  npm install -g webpack

```
  The library uses es6 javascript and babel to convert code into earlier javascript syntax.

```  
  npm install --save-dev babel-loader babel-core babel-preset-es2015

```

and finally install the webpack development server

```
  npm install webpack-dev-server -g
```

### Use webpack to compile the library

To watch any changes during development, navigate to folder _src_ on the command line and run

```
  webpack -p

```

which will pack and obfuscate the library. It is saved into folder _dist_.

### Use webpack-dev-server to test library changes in the browser

To run a local server to test the library in action inside the browser, navigate to folder _src_ and run the following command

 ```

 webpack-dev-server --hot --content-base ../test --host 0.0.0.0

 ```

 inside your browser navigate to [http://0.0.0.0:8080/webpack-dev-server/index.html](http://0.0.0.0:8080/webpack-dev-server/index.html)

the version of the library built with webpack-dev-server is not saved into folder _dist_, to build the library into _dist_ see previous point.

The live-reload of the js scripts did not work for me though, which seems to be a browser specific caching issue.


### p5js sketch

All the p5js sketch inside folder _test_ does currently is to create an instance of ControlPanel. Controllers are currently hard coded and created inside library when initialized.

-------------------------

That is all for now and please understand that this is work in progress in its early stages, hence many things will change until a releasable state is reached.


→
