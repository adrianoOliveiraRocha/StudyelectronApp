const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('node:path');
const CustomMenu = require('./config/custom-menu.js');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './config/preload.js')
    },
    // titleBarStyle: 'hidden'
  });

  win.loadFile('./app/views/index.html');

}

app.whenReady().then(() => {

  const menu = Menu.buildFromTemplate(CustomMenu.getTemplate());
  Menu.setApplicationMenu(menu);
  
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