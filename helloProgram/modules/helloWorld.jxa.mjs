#! /usr/bin/env osascript -l JavaScript

/* A very simple Javascript, for use as a module */

export { displayHelloAlert };

var curApp = Application.currentApplication();
curApp.includeStandardAdditions = true;

displayHelloAlert();

function displayHelloAlert() {
	curApp.displayAlert('Hello, world!');
}