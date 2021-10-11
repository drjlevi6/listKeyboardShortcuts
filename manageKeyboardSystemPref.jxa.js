#! /usr/bin/env osascript -l JavaScript

/* Opens System Preferences window; selects Keyboard pane. 
 * Does _not_ select the individual views (Launchpad & Dock, Mission 
 * Control,...) each of which contributes its own shortcuts; this is done in 
 * the program that runs this one.
 */

/*--Setup---------------------------------------------------------------------*/ 
var curApp = Application.currentApplication();
var sysEvents = Application('System Events');
curApp.includeStandardAdditions = true;
var sysPrefsProc = 
	sysEvents.applicationProcesses.byName("System Preferences");
var sysPrefs = Application('System Preferences');

/*--Main----------------------------------------------------------------------*/ 
sysPrefs.quit();
openAndManageSysPrefs();

/*--Functions-----------------------------------------------------------------*/
function openAndManageSysPrefs() {
	var sysPrefsWin = getAndActivateSysPrefsWindow();
	var keyboardPane = getKeyboardPane(sysPrefsWin); // can't be 'let'
	revealKeyboardPane(keyboardPane);
	delay(0.7);	// At least 0.6 sec may be required
	sysPrefsWin = getAndActivateSysPrefsWindow();
	selectShortcutsTab(sysPrefsWin);	
}

function selectShortcutsTab(sysPrefsWin) {
	var sysPrefsWin;	// need this declaration
	let shortCutsRadioButton = 
		sysPrefsWin.tabGroups()[0].radioButtons.byName('Shortcuts');
	let [shortCutsX, shortCutsY] = 
		shortCutsRadioButton.position(); // no coercion needed; reason?
	curApp.doShellScript(
		'/usr/local/bin/cliclick c:' + 
		(shortCutsX+30) + ',' + (shortCutsY+10) 
	);	// reveals the pane
}

function revealKeyboardPane(keyboardPane) {
	let panePosition = keyboardPane.position();	
	let paneCoordsString = 
		String(panePosition).split(',');    // coercion is necessary
	let [panePosX, panePosY] = [
		parseInt(paneCoordsString[0]),
		parseInt(paneCoordsString[1]) 
	];	
	curApp.doShellScript( 
		'/usr/local/bin/cliclick c:' +  
		(panePosX+30) + ',' + (panePosY+20)
	);	// loads shortcuts view
}

function getAndActivateSysPrefsWindow() {
    sysPrefs.activate();
    return sysPrefsProc.windows()[0];
}

function getKeyboardPane(sysPrefsWin) {
	let keyboardPanes =
		sysPrefsWin.scrollAreas[0].uiElements.whose(
			{name: "Keyboard"}
		);	
	return keyboardPanes[0];
}