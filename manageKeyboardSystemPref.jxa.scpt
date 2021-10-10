JsOsaDAS1.001.00bplist00�Vscript_tvar curApp = Application.currentApplication();
var sysEvents = Application('System Events');
curApp.includeStandardAdditions = true;
var sysPrefsProc = 
	sysEvents.applicationProcesses.byName("System Preferences");

/*--Main----------------------------------------------------------------------*/
manageSysPrefs();

function manageSysPrefs() {
	let sysPrefsWin = getAndActivateSysPrefsWindow();
	
	let keyboardPane = getKeyboardPane(sysPrefsWin);
	
	let panePosition = keyboardPane.position();
	let paneCoordsString = 
		String(panePosition).split(',');	// coercion is necessary
	let [panePosX, panePosY] = 
		[ parseInt(paneCoordsString[0]), parseInt(paneCoordsString[1]) ];
	
	curApp.doShellScript( '/usr/local/bin/cliclick c:' + 
		(panePosX+30) + ',' + (panePosY+20) );	// reveal the pane
	
	delay(1);
	curApp.activate();
}

function getAndActivateSysPrefsWindow() {
    let sysPrefs = Application('System Preferences');
    sysPrefs.activate();
    return sysPrefsProc.windows()[0];
}

function getKeyboardPane(sysPrefsWin) {
	let keyboardPane =
		sysPrefsWin.scrollAreas[0].buttons.whose( {name: "Keyboard"} );
	return keyboardPane;
}                              �jscr  ��ޭ