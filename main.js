const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './config/core-preload.js')
    }
  });

  win.loadFile('./app/views/index.html');

}

app.whenReady().then(() => {

  ipcMain.handle('ping', () => {
    return 'pong';
  })

  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })

})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})