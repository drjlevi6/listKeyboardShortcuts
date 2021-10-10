#! /usr/bin/env osascript -l JavaScript

/* Opens the System Preferences window, Keyboard Preferences
 */

/*-------|---------|---------|---------|---------|---------|---------|---------|

/*--Setup---------------------------------------------------------------------*/
var curApp = Application.currentApplication();
var sysEvents = Application('System Events');
curApp.includeStandardAdditions = true;
var sysPrefsProc = 
	sysEvents.applicationProcesses.byName("System Preferences");


/*--Main----------------------------------------------------------------------*/
manageSysPrefs();

function manageSysPrefs() {
    let sysPrefs = Application('System Preferences');
 //   sysPrefs.activate();
    console.log(sysPrefs.Actions());
}