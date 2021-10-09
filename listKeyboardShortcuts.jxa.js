#! /usr/bin/env osascript -l JavaScript

/* Lists keyboard shortcuts in System Preferences > Keyboard Preferences 
 * and FastScripts > Preferences.
 */

/*-------|---------|---------|---------|---------|---------|---------|---------|

/*--Setup---------------------------------------------------------------------*/
var curApp = Application.currentApplication();

/*--Main----------------------------------------------------------------------*/
var sysEvents = Application('System Events');
curApp.includeStandardAdditions = true;
var sysPrefs = 
	sysEvents.applicationProcesses.byName("System Preferences");

var kbWindow = 
	sysPrefs.windows.byName("Keyboard");
let kbwOutline = 
	kbWindow.uiElements[1].uiElements[9].uiElements[2].uiElements[0];
		
/* each table row contains 2 cells; second cell contains either 
   a disclosure triangle or a command with its shortcut. */

for (let i = 0; i<kbwOutline.rows.length; i++){
	let cell2 =  kbwOutline.rows[i].uiElements.whose(
		{description: "cell"}
	)[1];
	let numTextFields = cell2.uiElements.whose(
		{description: 'text field'}
	).length;

	if (numTextFields > 0) {
		printCellCommandAndShortcut(i, cell2, numTextFields);
	}
}
exit0(); /* we don't need this, but it may be useful if we wish to
		end the program early (while debugging, say) */
/*--Functions-----------------------------------------------------------------*/

// Print formatted row containing
function printCellCommandAndShortcut(i, cell2, numTextFields) {
	let cellNumStr = 'Row ' + String(i) + 
		' '.repeat(3-String(i).length) + ' command:';
	let cellNumStrPadded = 
		cellNumStr + ' '.repeat(18-cellNumStr.length);
	let commandStr = cell2.uiElements.whose(
		{description: 'text field'} 
	)[0].value();
	let commandStrPadded = commandStr + 
		' '.repeat(35-commandStr.length);
	let shortcut = cell2.uiElements.whose(
		{description: 'text field'} 
	)[numTextFields-1].value();

	console.log(cellNumStrPadded +  commandStrPadded + shortcut);
}

function exit0() {
	return(
		curApp.doShellScript('echo 0; exit 0')
	);
}
