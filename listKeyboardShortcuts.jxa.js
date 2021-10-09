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
curApp.doShellScript('echo 0; exit 0')
var sysPrefs = sysEvents.applicationProcesses.byName("System Preferences");

var kbWindow = sysPrefs.windows.byName("Keyboard");
kbWindow;
exit0();

/*--Functions-----------------------------------------------------------------*/
function exit0() {
	return(
		curApp.doShellScript('echo 0; exit 0')
	);
}
