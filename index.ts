import {app, BrowserWindow} from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 450,
        height: 250,
        webPreferences: {
            nodeIntegration: true,
            devTools: false
        }
    });
    win.loadFile('index.html');
    win.removeMenu();
    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
