const {app,BrowserWindow} = require('electron');

const remote = require('@electron/remote/main')
remote.initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // nodejs 모듈(fs,path 등)을 사용하기 위해 추가
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    win.loadURL('http://localhost:3000')

    remote.enable(win.webContents);
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})