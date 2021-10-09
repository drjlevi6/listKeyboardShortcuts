#! /usr/bin/env osascript -l JavaScript

/* Lists keyboard shortcuts in System Preferences > Keyboard Preferences 
 * and FastScripts > Preferences.
 */

/*-------|---------|---------|---------|---------|---------|---------|---------|

/*--Setup---------------------------------------------------------------------*/
var curApp = Application.currentApplication();
curApp.includeStandardAdditions = true;

/*--Main----------------------------------------------------------------------*/
var sysEvents = Application('System Events');
	console.log("\nsysEvents:", sysEvents, '\n');
	exit0();
var sysPrefsApp = Application('System Preferences');
var sysnPrefsP = sysEvents.applicationProcesses.byName("System Preferences");
var kbWindow = sysPrefsP.windows.byName("Keyboard");
	console.log(kbWindow);
var tblOutline = 
	kbWindow.tabGroups[0].splitterGroups[0].scrollAreas[1].outlines[0];
	console.log(tblOutline.role());
//	tblOutline.rows[2].uiElements[1].uiElements.class();	
		// ["staticText", "staticText", "uiElement"]
//	tblOutline.rows[2].uiElements[1].staticTexts[0].value();	
		//"LibreOffice.app"
//	tblOutline.rows[2].uiElements[1].staticTexts[1].value();	
		//""
/*	var libreOfficeDisclosureTriangle = 
	tblOutline.rows[2].uiElements[1].uiElements[2];*/
//	libreOfficeDisclosureTriangle.value();						
		// 0: closed; 1: open
		
var codeSymbols = tblOutline.rows[3].uiElements[1].uiElements[1].value();
		//(Unicode string)
/*--Functions-----------------------------------------------------------------*/
function exit0() {
	curApp.doShellScript('exit 0');
}
