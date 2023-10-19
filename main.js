const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');

let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    win.loadFile('index.html');
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
ipcMain.on('new-bundle', (event, bundle) => {
    console.log('New Bundle:', bundle);
    lastBundle = bundle;
    event.returnValue = `Received bundle with ${bundle.files.length} files.`; 
})
ipcMain.on('dropped-file', (event, arg) => {
    console.log('Dropped File(s):', arg);
    event.returnValue = `Received ${arg.length} paths.`; 
    // Specify the path to the file you want to read
const filePath = `${arg}`;

// Use fs.readFile() to read the file
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    // The data variable contains the file content as a string
    console.log('File content:', data);
win.loadFile('CodeSnippets/index.html'); // Load your HTML file

win.webContents.on('did-finish-load', () => {
  // Send the data to the renderer process
  win.webContents.send('data', data);
});

});

})
