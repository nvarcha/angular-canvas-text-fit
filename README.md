# angular-canvas-text-fit

--

## About

**Angular Canvas Text Fit** is a module that makes a text fit inside a given rectangle within a canvas.

The module will shrink the text (reduce font size) and word wrap (configurable) until the text fits inside the given rect boundaries.

## Instalation
### Bower
```
bower install --save angular-canvas-text-fit
```

### Load the JS in your HTML (most likely index.html)
```
<script src="bower_components/angular-canvas-text-fit/angular-canvas-text-fit.js"></script>
```

### Add the module 'nmv.angular' to your Angular app
```
angular.module('app', ['nmv.angular']);
```

## Usage
### Create a canvas in your html
```
<canvas width="1024px" height="768px" id="myCanvas"></canvas>
```

### Inject the service in your controller (or directive or wherever you want to use it)
```
angular.module('app', ['nmv.angular']).controller('TestCtrl', ["canvasFitText", function (canvasFitText) {}]);
```

### Call the fit method
```
var canvas = document.getElementById("myCanvas");
var startXPositionOfTextInCanvas = 100;
var startYPositionOfTextInCanvas = 200;
var maxWidth = canvas.width;
var maxHeight = canvas.height - startYPositionOfTextInCanvas;
canvasFitText.fit('Text to fit', 
                  startXPositionOfTextInCanvas,
                  startYPositionOfTextInCanvas, 
                  maxWidth, maxHeight, 
                  canvas);
```
