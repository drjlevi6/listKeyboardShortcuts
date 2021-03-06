#! /usr/bin/env osascript -l JavaScript

/* Lists keyboard shortcuts by application in System Preferences > 
 * Keyboard Preferences.
 */

/*-------|---------|---------|---------|---------|---------|---------|---------|

/*--Setup---------------------------------------------------------------------*/
var curApp = Application.currentApplication();
var sysEvents = Application('System Events');
curApp.includeStandardAdditions = true;
var sysPrefs = 
	sysEvents.applicationProcesses.byName("System Preferences");

var kbWindow = 
	sysPrefs.windows.byName("Keyboard");
let kbwOutline = 
	kbWindow.uiElements[1].uiElements[9].uiElements[2].uiElements[0];

/*--Main----------------------------------------------------------------------*/		
/* each table row contains 2 cells; second cell contains either a 
   disclosure triangle or text fields with a command and its shortcut. */
for (let i = 0; i<kbwOutline.rows.length; i++){
	let cell2 = kbwOutline.rows[i].uiElements.whose(
		{description: "cell"}
	)[1];
	let numTextFields = cell2.uiElements.whose(
		{description: 'text field'}
	).length;

	if (numTextFields > 0) {
		printCellCommandAndShortcut(i, cell2, numTextFields);
	} else {
		printAppName(i, cell2);
	}
}
/* exit0(); 
	we don't need this currently, but it may be useful if we wish to
	end the program early (i.e., while debugging) */
/*--Functions-----------------------------------------------------------------*/

function printAppName(i, cell2) {
	console.log( 'Application: ' + cell2.uiElements[0].value() );
}

// Print formatted row containing row number, command and shortcut
function printCellCommandAndShortcut(i, cell2, numTextFields) {	
	let commandStr = '\tCommand: ' + cell2.uiElements.whose(
		{description: 'text field'} 
	)[0].value();
	let commandStrPadded = commandStr + 
		' '.repeat(60-commandStr.length);
	let shortcut = cell2.uiElements.whose(
		{description: 'text field'} 
	)[numTextFields-1].value();

	/* Following seems to be easiest way to put spaces between 
	   the chars; split().join() doesn't work */
	console.log(
		commandStrPadded, shortcut[0], (shortcut[1]),
		((shortcut[2]) ? (shortcut[2] + ' ') : '') +
		((shortcut[13]) ? shortcut[3] : '')
	);
}

function exit0() {
	return( curApp.doShellScript('echo 0; exit 0') );
}
