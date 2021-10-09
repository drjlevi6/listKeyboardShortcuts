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
var sysPrefs = sysEvents.applicationProcesses.byName("System Preferences");

var kbWindow = sysPrefs.windows.byName("Keyboard");
let kbwOutline = kbWindow.uiElements[1].uiElements[9].uiElements[2].uiElements[0];
		
/* each table row contains 2 cells; second cell contains either a disclosure 
   triangle 
 */
for(let i = 0; i<kbwOutline.rows.length; i++){
	let cell2 = kbwOutline.rows[i].uiElements.whose( {description: "cell"} )[1];
	let numTextFields = 
		cell2.uiElements.whose( {description: 'text field'} ).length;
	if (numTextFields > 0) {
		console.log('cell[' + i + ']: Command:',
			cell2.uiElements.whose(
				{description: 'text field'} 
			)[0].value() + '; short cut:',
			cell2.uiElements.whose(
				{description: 'text field'} 
			)[numTextFields-1].value());
	}
}
//for (let i = 0; i < kbwOutline.rows[0].cells[i].length; i++) {
	//kbwOutline.rows[i].uiElements.description();
//	console.log("i:", i, kbwOutline.rows[0].cells[i].uiElements.description() );
//}
exit0();

/*--Functions-----------------------------------------------------------------*/
function exit0() {
	return(
		curApp.doShellScript('echo 0; exit 0')
	);
}
