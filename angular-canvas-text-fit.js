/**
 * Fits a given text in given rectangle in a canvas by reducing font size (No external dependencies)
 * @version v0.0.1 - 2016-02-15
 * @author Nicolas Varchavsky <nicolasv@interatica.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';

    angular.module('nmv.angular', [])
        .factory('canvasFitText', function () {
            return {
                options: {
                    wordWrap: true,
                    initialFontSizeInPt: 90,
                    minimumFontSizeInPt: 1,
                    dynamicLineHeight: true,
                    lineHeight: 2,
                    fontPrefix: 'bold',
                    fontSuffix: 'Arial',
                    fillStyle: '#4a63ae',
                    debug: false
                },
                __internal: {
                    pxLineHeight: 0,
                    canvasContext: null,
                    maxWidth: 0,
                    pxSingleRowHeight: 0
                },
                fit: function (textToFit, xStartPosition, yStartPosition, maxWidth, maxHeight, canvas) {

                    // Canvas context setup
                    this.__internal.canvasContext  = canvas.getContext("2d");
                    this.__internal.canvasContext.font = this.options.fontPrefix + ' ' + this.options.initialFontSizeInPt + 'pt ' + this.options.fontSuffix;
                    this.__internal.canvasContext.fillStyle = this.options.fillStyle;
                    this.__internal.maxWidth = maxWidth;

                    var htmlWordWrapped = textToFit;
                    var lastLine = textToFit;
                    var longestLineWidth = 0;

                    // Initial values setup
                    var fontSize = this.options.initialFontSizeInPt;

                    do {

                        this.__internal.pxSingleRowHeight = this.getTextHeight(textToFit);

                        var processResult = [];
                        if (this.options.wordWrap) {
                            processResult = this.processText(textToFit, true);
                            htmlWordWrapped = processResult[0];
                            lastLine = processResult[1];
                            longestLineWidth = processResult[2];
                        }

                        this.__internal.pxLineHeight = this.options.dynamicLineHeight ? (fontSize * this.options.lineHeight) : this.options.lineHeight;

                        var totalHeightNeeded = this.getTextHeight(htmlWordWrapped);

                        if (totalHeightNeeded > maxHeight || longestLineWidth > maxWidth) {
                            fontSize--;
                            this.__internal.canvasContext.font = this.options.fontPrefix + ' ' + fontSize + 'pt ' + this.options.fontSuffix;
                        } else {
                            this.processText(textToFit, this.options.wordWrap, true, xStartPosition, yStartPosition + (this.__internal.pxSingleRowHeight/1.5));
                            break;
                        }
                    } while (fontSize > this.options.minimumFontSizeInPt);

                    if (this.options.debug) {
                        // For debugging purposes, draw the target rectangle
                        this.__internal.canvasContext.rect(xStartPosition, yStartPosition, maxWidth, maxHeight);
                        this.__internal.canvasContext.stroke();
                    }

                    return true;
                },
                processText: function (textToProcess, wordWrap, printText, x, y) {

                    var htmlWordWrapped = '';
                    var words = textToProcess.split(' ');
                    var line = '';
                    var longestLineWidth = 0;

                    // Calculate how many lines we need for a simple word-wrap operation
                    for(var n = 0; n < words.length; n++) {
                        var currentLine = line + words[n] + ' ';

                        var widthCheck = this.__internal.canvasContext.measureText(words[n]).width;
                        if (widthCheck > this.__internal.maxWidth) {
                            longestLineWidth = widthCheck;
                        }

                        if (wordWrap && this.__internal.canvasContext.measureText(currentLine).width > this.__internal.maxWidth && n > 0) {
                            if (printText) this.__internal.canvasContext.fillText(line, x, y);
                            line = words[n] + ' ';
                            htmlWordWrapped += '<br />' + words[n];
                            y += this.__internal.pxLineHeight;
                        } else {
                            htmlWordWrapped += words[n] + ' ';
                            line = currentLine;
                        }
                    }
                    if (printText) this.__internal.canvasContext.fillText(line, x, y);

                    return [htmlWordWrapped, line, longestLineWidth];
                },
                getTextHeight: function (textToCalculate) {
                    // Calculate the height we need based on the text
                    // Credits to: http://www.rgraph.net/blog/2013/january/measuring-text-height-with-html5-canvas.html
                    var div = document.createElement("div");
                    div.style.position = 'absolute';
                    div.style.top  = '-9999px';
                    div.style.left = '-9999px';
                    div.style.font = this.__internal.canvasContext.font;
                    div.style['line-height'] = this.options.lineHeight;
                    div.innerHTML = textToCalculate; // + 'gqjy';
                    document.body.appendChild(div);
                    var totalHeightNeeded = div.offsetHeight;
                    document.body.removeChild(div);
                    return totalHeightNeeded;
                }
            }
        });

})( window, window.angular );