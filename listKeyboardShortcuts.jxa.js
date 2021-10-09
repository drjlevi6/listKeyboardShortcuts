#! /usr/bin/env osascript -l JavaScript

/* Lists keyboard shortcuts in System Preferences > Keyboard Preferences 
 * and FastScripts > Preferences,
 */

var curApp = Application.currentApplication();
curApp.includeStandardAdditions = true;

var sysEvs = Application('System Events');
var sysPrefsApp = Application('System Preferences');
var sysPrefsP = sysEvs.applicationProcesses.byName("System Preferences");

var kb1 = sysPrefsP.windows.byName("Keyboard");
var tblOutline = 
	kb1.tabGroups[0].splitterGroups[0].scrollAreas[1].outlines[0];

//	tblOutline.rows[2].uiElements[1].uiElements.class();	
		// ["staticText", "staticText", "uiElement"]
//	tblOutline.rows[2].uiElements[1].staticTexts[0].value();	
		//"LibreOffice.app"
//	tblOutline.rows[2].uiElements[1].staticTexts[1].value();	
		//""

//var libreOfficeDisclosureTriangle = 
	tblOutline.rows[2].uiElements[1].uiElements[2];
//	libreOfficeDisclosureTriangle.value();						
		// 0: closed; 1: open
		
var codeSymbols = tblOutline.rows[3].uiElements[1].uiElements[1].value();
		//(Unicode string)
