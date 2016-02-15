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

## Options
There are a few options you can set up
```
canvasFitText.options.wordWrap = true; // false to not word wrap
canvasFitText.options.initialFontSizeInPt = 60; // the initial size in Pt for the font
canvasFitText.options.minimumFontSizeInPt = 1; // the minimum size in Pt the module will use
canvasFitText.options.fontPrefix = 'bold'; // the prefix to the 'font' CSS property (i.e.: 'bold 20pt Arial')
canvasFitText.options.fontSuffix = 'Arial'; // the suffix for the 'font' css property
canvasFitText.options.fillStyle = '#4a63ae'; // the fill style to use for the text
canvasFitText.options.debug = false; // true will show the targeted rectangle on the canvas 
canvasFitText.options.dynamicLineHeight = true; // if true, the lineHeight option is multiplied with the initialFontSizeInPt, if false its used as a fixed value
canvasFitText.options.lineHeight = 1.5; // the line spacing (see above)
```

## Sample Plunkr
https://plnkr.co/edit/5lZKhDQ2VvDAldnGzrLL?p=preview
